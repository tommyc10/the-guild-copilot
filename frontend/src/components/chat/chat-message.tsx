import { EvidenceCard } from "@/components/chat/evidence-card"
import { MarkdownMessage } from "@/components/markdown-message"
import type { Message } from "@/types/chat"

type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.role === "user"

  return (
    <article className={isUserMessage ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUserMessage
            ? "max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
            : "w-full max-w-2xl text-sm leading-6"
        }
      >
        {isUserMessage ? (
          <p>{message.content}</p>
        ) : (
          <MarkdownMessage content={message.content} />
        )}

        {message.sources?.length ? (
          <EvidenceCard sources={message.sources} />
        ) : null}
      </div>
    </article>
  )
}
