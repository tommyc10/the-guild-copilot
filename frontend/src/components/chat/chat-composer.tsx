import type { FormEvent } from "react"
import { BorderBeam } from "border-beam"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatComposerProps = {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ChatComposer({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: ChatComposerProps) {
  return (
    <BorderBeam size="pulse-inner" colorVariant="mono" strength={0.7}>
      <form
        className="rounded-xl border bg-card p-3 shadow-sm"
        onSubmit={onSubmit}
      >
        <Textarea
          className="min-h-24 resize-none border-0 p-2 shadow-none focus-visible:ring-0"
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Search the Guild Archive..."
          value={input}
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Answers are grounded in Guild records. Verify citations before
            relying on them.
          </p>
          <Button disabled={isLoading || !input.trim()} size="sm">
            {isLoading ? "Searching..." : "Send"}
          </Button>
        </div>
      </form>
    </BorderBeam>
  )
}
