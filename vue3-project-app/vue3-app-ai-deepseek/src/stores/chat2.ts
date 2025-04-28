// store/chat.ts
import { defineStore } from "pinia";
import { fetchDeepSeekResponse } from "@/api/deepseek.ts";
import {nextTick} from "vue";

// 定义消息类型
export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    edited?: boolean;
}

// 定义对话类型
export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createTime: number;
}

export const useChatStore = defineStore('chat', {
    state: () => ({
        conversations: [] as Conversation[],
        currentConversationId: null as string | null,
        apiKey: localStorage.getItem('deepseek_api_key') || '',
        loading: false,
        error: null as string | null,
        renameDialogVisible: false,
        currentConversationIdToRename: null as string | null,
        newTitle: ''
    }),

    getters: {
        currentConversation: (state) => {
            return state.conversations.find(
                c => c.id === state.currentConversationId
            ) || null
        }
    },

    actions: {
        // 对话重命名
        renameConversation(id: string, newTitle: string) {
            const conversation = this.conversations.find(c => c.id === id)
            if (conversation && newTitle.trim()) {
                conversation.title = newTitle.trim()
            }
        },

        // 编辑消息
        editMessage(params: {
            conversationId: string
            messageTimestamp: number
            newContent: string
        }) {
            const conversation = this.conversations.find(
                c => c.id === params.conversationId
            )
            const message = conversation?.messages.find(
                m => m.timestamp === params.messageTimestamp
            )
            if (message && params.newContent.trim()) {
                message.content = params.newContent.trim()
                message.edited = true
            }
        },

        createNewConversation() {
            const newConversation: Conversation = {
                id: Date.now().toString(),
                title: `对话 ${this.conversations.length + 1}`,
                messages: [],
                createTime: Date.now()
            }
            this.conversations.push(newConversation)
            this.currentConversationId = newConversation.id
        },

        deleteConversation(id: string) {
            this.conversations = this.conversations.filter(c => c.id !== id)
            if (this.currentConversationId === id) {
                this.currentConversationId = null
            }
        },

        async sendMessage(content: string) {
            const conversation = this.currentConversation;
            if (!conversation || !content.trim() || this.loading) return;

            // 清除旧错误
            this.error = null;

            // 添加用户消息
            conversation.messages.push({
                role: 'user',
                content,
                timestamp: Date.now()
            });

            try {
                this.loading = true;
                const response = await fetchDeepSeekResponse({
                    messages: conversation.messages,
                    apiKey: this.apiKey
                });

                // 添加初始助手消息
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: '',
                    timestamp: Date.now()
                };
                conversation.messages.push(assistantMessage);

                // 处理流式响应
                await this.processStream(response, async (chunk) => {
                    assistantMessage.content += chunk;
                    console.log('Assistant message updated:', assistantMessage.content);

                    // 强制触发 Vue 的 DOM 更新
                    await nextTick();
                });
            } catch (error) {
                this.handleError(error);
            } finally {
                this.loading = false;
            }
        },

        async processStream(
            stream: ReadableStream,
            onChunk: (chunk: string) => void
        ) {
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    while (buffer.includes('\n')) {
                        const lineEndIndex = buffer.indexOf('\n');
                        const line = buffer.slice(0, lineEndIndex);
                        buffer = buffer.slice(lineEndIndex + 1);

                        if (line.startsWith('data: ')) {
                            const dataLine = line.slice(6);
                            if (dataLine.trim() === '[DONE]') {
                                continue; // 忽略 [DONE] 标记
                            }

                            try {
                                const data = JSON.parse(dataLine);
                                const content = data.choices[0].delta.content || '';
                                onChunk(content); // 调用回调函数处理数据块
                            } catch (e) {
                                console.warn('解析流数据失败:', e);
                            }
                        }
                    }
                }
            } finally {
                reader.releaseLock();
            }
        },

        handleError(error: unknown) {
            if (error instanceof Error) {
                this.error = error.message
            } else {
                this.error = '发生未知错误'
            }
            console.error('API请求错误:', error)
        },

        handleRenameConversation(conversationId: string) {
            this.currentConversationIdToRename = conversationId
            this.newTitle = this.conversations.find(conv => conv.id === conversationId)?.title || ''
            this.renameDialogVisible = true
        },

        confirmRename() {
            if (this.currentConversationIdToRename && this.newTitle.trim()) {
                this.renameConversation(this.currentConversationIdToRename, this.newTitle.trim())
                this.renameDialogVisible = false
            }
        },

        handleCommand(conversationId: string, command: string) {
            if (command === 'rename') {
                this.handleRenameConversation(conversationId);
            } else if (command === 'delete') {
                this.deleteConversation(conversationId);
            }
        }
    }
})
