import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/hooks/use-chat"

function App() {
  const { error, handleSubmit, input, isLoading, messages, setInput } =
    useChat()

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
            <div className="flex flex-1 flex-col gap-6">
              {messages.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-center">
                  <div className="max-w-md">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      The Guild Copilot
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Ask about targets, contracts, source reliability, and
                      Guild intelligence records.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 pb-6">
                  {messages.map((message) => (
                    <article
                      className={
                        message.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                      key={message.id}
                    >
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
                            : "w-full max-w-2xl text-sm leading-6"
                        }
                      >
                        <p>{message.content}</p>

                        {message.sources?.length ? (
                          <div className="mt-4 space-y-3">
                            {message.sources.map((source) => (
                              <div
                                className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm"
                                key={`${source.document_title}-${source.section}`}
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-medium">
                                    {source.document_title}
                                  </p>
                                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                    {source.reliability}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {source.document_type} · {source.section}
                                </p>
                                <p className="mt-3 line-clamp-4 text-xs leading-5 text-muted-foreground">
                                  {source.passage}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}

                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Searching Guild records...
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            {error ? (
              <p className="mb-3 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <form
              className="rounded-xl border bg-card p-3 shadow-sm"
              onSubmit={handleSubmit}
            >
              <Textarea
                className="min-h-24 resize-none border-0 p-2 shadow-none focus-visible:ring-0"
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Renn Dakar's last confirmed location..."
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
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
