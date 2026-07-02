import type { ChatResponse } from "@/types/chat"

const CHAT_API_URL = "http://127.0.0.1:8000/chat"

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error("The Guild archive could not answer that request.")
  }

  return response.json() as Promise<ChatResponse>
}
