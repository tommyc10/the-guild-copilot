export type Source = {
  document_title: string
  document_type: string
  reliability: string
  section: string
  passage: string
}

export type ChatResponse = {
  answer: string
  sources: Source[]
}

export type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  sources?: Source[]
}

export type ChatHistory = {
  id: number
  title: string
  messages: Message[]
  created_at: string
  updated_at: string
}
