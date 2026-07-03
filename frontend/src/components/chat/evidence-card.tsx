import type { Source } from "@/types/chat"

type EvidenceCardProps = {
  sources: Source[]
}

function getReliabilityLabel(sources: Source[]) {
  const reliabilityLevels = sources.map((source) => source.reliability)

  if (reliabilityLevels.some((level) => level.includes("Mixed"))) {
    return "Mixed reliability"
  }

  if (reliabilityLevels.some((level) => level.includes("Unverified"))) {
    return "Unverified"
  }

  if (reliabilityLevels.some((level) => level.includes("Verified"))) {
    return "Verified archive basis"
  }

  return "Archive-backed"
}

export function EvidenceCard({ sources }: EvidenceCardProps) {
  const reliability = getReliabilityLabel(sources)

  return (
    <div className="mt-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium">Evidence summary</p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {reliability}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        This answer is based on Guild archive records available to the Copilot.
        Full source documents are restricted to analyst review.
      </p>

      <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2">
        <p className="text-xs leading-5 text-muted-foreground">
          Treat confirmed facts, unverified reports, and conflicting records
          separately. Do not treat a Guild summary as proof beyond the archive.
        </p>
      </div>
    </div>
  )
}