import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownMessageProps = {
  content: string
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children, ...props }) => (
          <a
            className="font-medium underline underline-offset-4"
            rel="noreferrer"
            target="_blank"
            {...props}
          >
            {children}
          </a>
        ),
        li: ({ children, ...props }) => (
          <li className="pl-1" {...props}>
            {children}
          </li>
        ),
        ol: ({ children, ...props }) => (
          <ol className="my-3 list-decimal space-y-1 pl-5" {...props}>
            {children}
          </ol>
        ),
        p: ({ children, ...props }) => (
          <p className="my-3 first:mt-0 last:mb-0" {...props}>
            {children}
          </p>
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-foreground" {...props}>
            {children}
          </strong>
        ),
        ul: ({ children, ...props }) => (
          <ul className="my-3 list-disc space-y-1 pl-5" {...props}>
            {children}
          </ul>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  )
}
