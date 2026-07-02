import { useState } from "react"

import { sendChatMessage } from "@/lib/chat-api"
import type { Message } from "@/types/chat"

export function useChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const question = input.trim()

    if (!question || isLoading) {
      return
    }

    setError(null)
    setInput("")
    setIsLoading(true)
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: question,
      },
    ])

    try {
      const data = await sendChatMessage(question)

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    error,
    handleSubmit,
    input,
    isLoading,
    messages,
    setInput,
  }
}
