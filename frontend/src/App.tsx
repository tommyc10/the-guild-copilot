import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
            <div className="flex flex-1 items-center justify-center text-center">
              <div className="max-w-md">
                <h1 className="text-2xl font-semibold tracking-tight">
                  The Guild Copilot
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Ask about targets, contracts, source reliability, and Guild
                  intelligence records.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-3 shadow-sm">
              <Textarea
                className="min-h-24 resize-none border-0 p-2 shadow-none focus-visible:ring-0"
                placeholder="Ask about Renn Dakar's last confirmed location..."
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Answers are grounded in Guild records. Verify citations before
                  relying on them.
                </p>
                <Button size="sm">Send</Button>
              </div>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
