import { useState } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import type { AppView } from "@/components/app-sidebar"
import { ActiveBountiesPage } from "@/components/bounties/active-bounties-page"
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
  const [activeView, setActiveView] = useState<AppView>("chat")
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

  function handleNewChat() {
    setActiveView("chat")
    startNewChat()
  }

  function handleSelectSession(sessionId: number) {
    setActiveView("chat")
    selectSession(sessionId)
  }

  function handleAskCopilot(question: string) {
    setActiveView("chat")
    setInput(question)
  }

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar
        activeSessionId={activeSessionId}
        activeView={activeView}
        onNewChat={handleNewChat}
        onSelectBounties={() => setActiveView("bounties")}
        onSelectSession={handleSelectSession}
        sessions={sessions}
      />

      <SidebarInset className="h-svh min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4">
          <SidebarTrigger />
          <ModeToggle />
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {activeView === "bounties" ? (
            <ActiveBountiesPage onAskCopilot={handleAskCopilot} />
          ) : (
            <section className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
              <ChatMessages isLoading={isLoading} messages={messages} />

              {error ? (
                <div className="mx-auto w-full max-w-3xl px-6">
                  <p className="mb-3 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                </div>
              ) : null}

              <div className="mx-auto w-full max-w-3xl px-6 pb-8">
                <ChatComposer
                  input={input}
                  isLoading={isLoading}
                  onInputChange={setInput}
                  onSubmit={handleSubmit}
                />
              </div>
            </section>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
