import {
  Clock,
  Folder,
  Home,
  UserCheck,
  Video,
  CircleQuestionMark,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { Link } from "react-router";

const items = [
  {
    name: "Home",
    icon: Home,
    link: "/",
  },
  {
    name: "History",
    icon: Clock,
    link: "/history",
  },
  {
    name: "My Content",
    icon: Video,
    link: "/dashboard",
  },
  {
    name: "Collections",
    icon: Folder,
    link: "/collection",
  },
  {
    name: "Subscriptions",
    icon: UserCheck,
    link: "#",
  },
];
export function AppSidebar() {
  return (
    <Sidebar
      className="text-white md:h-[80vh] fixed top-20 bg-black"
      collapsible="icon"
    >
      <SidebarTrigger className="rounded-none mx-2 hover:bg-primary hover:text-white" />
      <SidebarContent className="text-white max-h-[80vh] justify-between bg-black">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link to={item.link} key={item.name}>
                  <SidebarMenuItem
                    key={item.name}
                    className="border border-white mb-2"
                  >
                    <SidebarMenuButton className="flex items-center gap-2 cursor-pointer ">
                      <item.icon style={{ height: "1.6em", width: "1.6em" }} />
                      <span className="md:text-lg">{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="border border-white mb-2">
                <SidebarMenuButton className="flex items-center gap-2 cursor-pointer ">
                  <CircleQuestionMark
                    style={{ height: "1.6em", width: "1.6em" }}
                  />
                  <span className="md:text-lg">Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="border border-white mb-2">
                <SidebarMenuButton className="flex items-center gap-2 cursor-pointer ">
                  <Settings style={{ height: "1.6em", width: "1.6em" }} />
                  <span className="md:text-lg">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
