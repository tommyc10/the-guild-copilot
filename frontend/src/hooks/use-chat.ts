import { useEffect, useState } from "react"

import { sendChatMessage } from "@/lib/chat-api"
import type { ChatHistory, Message } from "@/types/chat"

export const CHAT_HISTORY_KEY = "guild-copilot-chat-history"

function createSessionTitle(question: string) {
  return question.length > 42 ? `${question.slice(0, 39)}...` : question
}

function getTimestamp() {
  return new Date().toISOString()
}

export function useChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [sessions, setSessions] = useState<ChatHistory[]>([])
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null)
  const [hasLoadedSessions, setHasLoadedSessions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedSessions = localStorage.getItem(CHAT_HISTORY_KEY)

    if (!savedSessions) {
      setHasLoadedSessions(true)
      return
    }

    try {
      setSessions(JSON.parse(savedSessions) as ChatHistory[])
    } catch {
      localStorage.removeItem(CHAT_HISTORY_KEY)
    } finally {
      setHasLoadedSessions(true)
    }
  }, [])

  useEffect(() => {
    if (!hasLoadedSessions) {
      return
    }

    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions))
  }, [hasLoadedSessions, sessions])

  function saveSession(sessionId: number, title: string, nextMessages: Message[]) {
    const timestamp = getTimestamp()

    setSessions((currentSessions) => {
      const existingSession = currentSessions.find(
        (session) => session.id === sessionId
      )

      if (existingSession) {
        return currentSessions.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: nextMessages,
                updated_at: timestamp,
              }
            : session
        )
      }

      return [
        {
          id: sessionId,
          title,
          messages: nextMessages,
          created_at: timestamp,
          updated_at: timestamp,
        },
        ...currentSessions,
      ]
    })
  }

  function startNewChat() {
    setActiveSessionId(null)
    setMessages([])
    setInput("")
    setError(null)
  }

  function selectSession(sessionId: number) {
    const selectedSession = sessions.find((session) => session.id === sessionId)

    if (!selectedSession) {
      return
    }

    setActiveSessionId(selectedSession.id)
    setMessages(selectedSession.messages)
    setError(null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const question = input.trim()

    if (!question || isLoading) {
      return
    }

    setError(null)
    setInput("")
    setIsLoading(true)

    const sessionId = activeSessionId ?? Date.now()
    const title = createSessionTitle(question)
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: question,
    }
    const messagesWithUser = [...messages, userMessage]

    if (!activeSessionId) {
      setActiveSessionId(sessionId)
    }

    setMessages(messagesWithUser)
    saveSession(sessionId, title, messagesWithUser)

    try {
      const data = await sendChatMessage(question)
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      }
      const messagesWithAnswer = [...messagesWithUser, assistantMessage]

      setMessages(messagesWithAnswer)
      saveSession(sessionId, title, messagesWithAnswer)
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
    activeSessionId,
    selectSession,
    sessions,
    setInput,
    startNewChat,
  }
}
