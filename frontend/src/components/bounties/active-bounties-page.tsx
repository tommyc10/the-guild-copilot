import { activeBounties } from "@/data/bounties"
import { BountyCard } from "@/components/bounties/bounty-card"

type ActiveBountiesPageProps = {
  onAskCopilot: (question: string) => void
}

export function ActiveBountiesPage({
  onAskCopilot,
}: ActiveBountiesPageProps) {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Guild operations board
          </p>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Active Bounties
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Current Guild-facing contract signals, disputed claims, and
                rumor-contaminated targets from the 3 ABY archive.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              {activeBounties.length} open signals
            </p>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeBounties.map((bounty) => (
            <BountyCard
              key={bounty.id}
              bounty={bounty}
              onAskCopilot={onAskCopilot}
            />
          ))}
        </section>
      </div>
    </main>
  )
}
