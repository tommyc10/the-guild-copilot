import { ChatEmptyState } from "@/components/chat/chat-empty-state"
import { ChatMessage } from "@/components/chat/chat-message"
import type { Message } from "@/types/chat"

import { MessageScroller } from "@shadcn/react/message-scroller"

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
    <MessageScroller.Provider autoScroll defaultScrollPosition="end">
      <MessageScroller.Root className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <MessageScroller.Viewport className="scroll-fade-y flex flex-1 flex-col overflow-y-auto pr-4 [scrollbar-gutter:stable]">
          <MessageScroller.Content className="flex flex-col gap-6 pb-6">
            {messages.map((message) => (
              <MessageScroller.Item
                key={message.id}
                messageId={`message-${message.id}`}
                scrollAnchor={message.role === "user"}
              >
                <ChatMessage message={message} />
              </MessageScroller.Item>
            ))}

            {isLoading ? (
              <MessageScroller.Item messageId="thinking">
                <p className="shimmer text-sm font-medium tracking-wide text-muted-foreground">
                  Searching for answers...
                </p>
              </MessageScroller.Item>
            ) : null}
          </MessageScroller.Content>
        </MessageScroller.Viewport>

        <MessageScroller.Button className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm inert:opacity-0">
          Jump to latest
        </MessageScroller.Button>
      </MessageScroller.Root>
    </MessageScroller.Provider>
  )
}
