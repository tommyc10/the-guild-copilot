import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatarImage from "@/assets/mando-helmet.jpg"
import { Crosshair, MessageSquare, Plus } from "lucide-react"
import type { ChatHistory } from "@/types/chat"
import { BorderBeam } from "border-beam"

export type AppView = "chat" | "bounties"

type AppSidebarProps = {
  activeSessionId: number | null
  activeView: AppView
  onNewChat: () => void
  onSelectBounties: () => void
  onSelectSession: (sessionId: number) => void
  sessions: ChatHistory[]
}

export function AppSidebar({
  activeSessionId,
  activeView,
  onNewChat,
  onSelectBounties,
  onSelectSession,
  sessions,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            GC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-none">
              The Guild Copilot
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              Bounty intelligence assistant
            </p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onNewChat}>
              <Plus />
              <span>New chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Guild board</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <BorderBeam size="md" colorVariant="sunset" strength={0.7}>
                <SidebarMenuButton
                  isActive={activeView === "bounties"}
                  onClick={onSelectBounties}
                >
                  <Crosshair />
                  <span>Active Bounties</span>
                </SidebarMenuButton>
                  </BorderBeam>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      isActive={
                        activeView === "chat" && session.id === activeSessionId
                      }
                      onClick={() => onSelectSession(session.id)}
                    >
                      <MessageSquare />
                      <span>{session.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <p className="px-2 py-1 text-xs text-muted-foreground">
                  No saved chats yet
                </p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar>
            <AvatarImage src={avatarImage} alt="Signed-in hunter avatar" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-none">
              tommy@guild.local
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Signed in</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
