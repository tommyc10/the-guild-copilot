import { ChatEmptyState } from "@/components/chat/chat-empty-state"
import { ChatMessage } from "@/components/chat/chat-message"
import type { Message } from "@/types/chat"

import {
  MessageScroller,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"

function ChatNavigationTrail({ messages }: { messages: Message[] }) {
  const { scrollToMessage } = useMessageScroller()
  const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()

  const anchors = messages
    .filter((message) => message.role === "user")
    .map((message, index) => ({
      id: `message-${message.id}`,
      label: `Jump to turn ${index + 1}`,
    }))

  const visibleAnchorId =
    currentAnchorId ??
    [...anchors].reverse().find((anchor) => visibleMessageIds.includes(anchor.id))
      ?.id ??
    null

  if (anchors.length <= 1) {
    return null
  }

  return (
    <div
      aria-label="Conversation navigation"
      className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3"
    >
      {anchors.map((anchor) => {
        const isActive = anchor.id === visibleAnchorId
        const isVisible = visibleMessageIds.includes(anchor.id)

        return (
          <button
            key={anchor.id}
            type="button"
            aria-label={anchor.label}
            title={anchor.label}
            onClick={() =>
              scrollToMessage(anchor.id, {
                align: "start",
                behavior: "smooth",
                scrollMargin: 24,
              })
            }
            className={[
              "h-1.5 w-3 rounded-full transition-all",
              isActive
                ? "w-5 bg-foreground"
                : isVisible
                  ? "bg-foreground/60"
                  : "bg-muted-foreground/35 hover:bg-muted-foreground/70",
            ].join(" ")}
          />
        )
      })}
    </div>
  )
}

type ChatMessagesProps = {
  isLoading: boolean
  messages: Message[]
}

export function ChatMessages({ isLoading, messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col px-6 text-center">
        <ChatEmptyState />
      </div>
    )
  }

  return (
    <MessageScroller.Provider autoScroll defaultScrollPosition="end">
      <MessageScroller.Root className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <MessageScroller.Viewport className="scroll-fade-y flex flex-1 flex-col overflow-y-auto scrollbar-gutter-stable">
          <MessageScroller.Content className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pb-6 pt-8">
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
        <ChatNavigationTrail messages={messages} />
        <MessageScroller.Button className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm inert:opacity-0">
          Jump to latest
        </MessageScroller.Button>
      </MessageScroller.Root>
    </MessageScroller.Provider>
  )
}
