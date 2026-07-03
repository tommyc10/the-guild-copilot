import { ChatEmptyState } from "@/components/chat/chat-empty-state"
import { ChatMessage } from "@/components/chat/chat-message"
import type { Message } from "@/types/chat"

type ChatMessagesProps = {
  isLoading: boolean
  messages: Message[]
}

export function ChatMessages({ isLoading, messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-6">
        <ChatEmptyState />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-6 pb-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading ? (
          <p className="shimmer text-sm font-medium tracking-wide text-muted-foreground">
            Searching for answers...
          </p>
        ) : null}
      </div>
    </div>
  )
}
