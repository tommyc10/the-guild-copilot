import { AppSidebar } from "@/components/app-sidebar"
import { ChatComposer } from "@/components/chat/chat-composer"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ModeToggle } from "@/components/mode-toggle"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useChat } from "@/hooks/use-chat"

function App() {
  const {
    activeSessionId,
    error,
    handleSubmit,
    input,
    isLoading,
    messages,
    selectSession,
    sessions,
    setInput,
    startNewChat,
  } = useChat()

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar
        activeSessionId={activeSessionId}
        onNewChat={startNewChat}
        onSelectSession={selectSession}
        sessions={sessions}
      />

      <SidebarInset className="h-svh min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4">
          <SidebarTrigger />
          <ModeToggle />
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <section className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-6 py-8">
            <ChatMessages isLoading={isLoading} messages={messages} />

            {error ? (
              <p className="mb-3 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <ChatComposer
              input={input}
              isLoading={isLoading}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
