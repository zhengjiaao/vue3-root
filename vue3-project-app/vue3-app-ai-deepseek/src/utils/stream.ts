export async function handleStreamResponse(
    stream: ReadableStream,
    callback: (chunk: string) => void
) {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })

            while (buffer.includes('\n')) {
                const lineEndIndex = buffer.indexOf('\n')
                const line = buffer.slice(0, lineEndIndex)
                buffer = buffer.slice(lineEndIndex + 1)

                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6))
                        const content = data.choices[0].delta.content || ''
                        callback(content)
                    } catch {
                        // 忽略解析错误
                    }
                }
            }
        }
    } finally {
        reader.releaseLock()
    }
}