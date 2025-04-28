// src/api/deepseek.ts
export async function fetchDeepSeekResponse(params: {
    messages: Array<{ role: string; content: string }>;
    apiKey: string;
}): Promise<ReadableStream> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: params.messages,
            stream: true,
            temperature: 0.5
        })
    });

    if (!response.ok) {
        let errorMessage = `API Error: ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.error) {
                errorMessage += ` - ${errorData.error.message || errorData.error.code || ''}`;
            } else {
                errorMessage += ` - ${errorData.message || errorData.code || ''}`;
            }
            // 添加错误文档链接
            errorMessage += ` - 查看错误文档: https://api-docs.deepseek.com/zh-cn/quick_start/error_codes`;
        } catch (error) {
            errorMessage += ` - 无法解析错误信息`;
        }
        throw new Error(errorMessage);
    }

    if (!response.body) {
        throw new Error('无法读取响应流');
    }

    return response.body;
}
