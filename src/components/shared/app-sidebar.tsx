import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Folder,
  HeartPlus,
  Home,
  MessageSquare,
  ThumbsUp,
  UserCheck,
  Video,
  type LucideIcon,
} from "lucide-react";

type NavLink = {
  id: number;
  icon: LucideIcon;
  name: string;
  url: string;
};

const MAIN_LINKS: NavLink[] = [
  { id: 1, icon: Home, name: "Home", url: "/" },
  { id: 2, icon: ThumbsUp, name: "Liked Videos", url: "/liked-videos" },
  { id: 3, icon: Clock, name: "History", url: "/history" },
  { id: 4, icon: Video, name: "My Content", url: "/dashboard" },
  { id: 5, icon: Folder, name: "Collections", url: "/collections" },
  { id: 6, icon: UserCheck, name: "Subscribers", url: "/subscribers" },
];

const FOOTER_LINKS: NavLink[] = [
  { id: 1, icon: HeartPlus, name: "Support", url: "/support" },
  { id: 2, icon: MessageSquare, name: "Feedback", url: "/feedback" },
];

export function AppSidebar() {
  return (
    <Sidebar className="top-16 h-[calc(100svh-4rem)]" collapsible="icon">
      <SidebarContent className="py-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_LINKS.map((link) => (
                <SidebarMenuItem key={link.id} className="mb-2">
                  <SidebarMenuButton asChild className="h-11 gap-3 rounded-xl">
                    <Link to={link.url} activeProps={{ "data-active": "true" }}>
                      <link.icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <SidebarSeparator className="mb-2" />
        <SidebarMenu>
          {FOOTER_LINKS.map((link) => (
            <SidebarMenuItem key={link.id} className="mb-2">
              <SidebarMenuButton asChild className="h-11 gap-3 rounded-xl">
                <Link to={link.url} activeProps={{ "data-active": "true" }}>
                  <link.icon size={20} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
