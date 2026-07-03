import { MessageSquare } from "lucide-react"

import type { Bounty } from "@/data/bounties"
import { Button } from "@/components/ui/button"

type BountyCardProps = {
  bounty: Bounty
  onAskCopilot: (question: string) => void
}

export function BountyCard({ bounty, onAskCopilot }: BountyCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs uppercase tracking-wide text-muted-foreground">
            {bounty.id}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-tight">
            {bounty.target}
          </h3>
        </div>

        <span className="shrink-0 rounded-full border px-2 py-1 text-xs uppercase text-muted-foreground">
          {bounty.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="text-muted-foreground">Client:</span>{" "}
          {bounty.client}
        </p>
        <p>
          <span className="text-muted-foreground">Reliability:</span>{" "}
          {bounty.reliability}
        </p>
        <p>
          <span className="text-muted-foreground">Last known:</span>{" "}
          {bounty.lastKnownLocation}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {bounty.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {bounty.relatedRecords.map((recordId) => (
          <span
            key={recordId}
            className="rounded border px-2 py-1 text-xs text-muted-foreground"
          >
            {recordId}
          </span>
        ))}
      </div>

      <Button
        className="mt-auto w-full"
        type="button"
        onClick={() => onAskCopilot(bounty.suggestedQuestion)}
      >
        <MessageSquare className="size-4" />
        Ask Copilot
      </Button>
    </article>
  )
}
