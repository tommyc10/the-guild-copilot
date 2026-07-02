import { AppSidebar } from "@/components/app-sidebar"
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
          <div className="min-w-0">
            <p className="text-sm font-medium leading-none">Guild archive workspace</p>
          </div>
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
              <p className="px-2 pb-3 text-sm text-muted-foreground">
                Ask about Renn Dakar&apos;s last confirmed location...
              </p>
              <div className="flex justify-end">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Send
                </button>
              </div>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
