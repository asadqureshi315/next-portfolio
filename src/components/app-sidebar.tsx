import { Fan, Home, Mail, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Fan,
  },
  {
    title: "About Me",
    url: "/me",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className=" bg-black">
      <SidebarContent className=" bg-black">
        <SidebarGroup className=" bg-black">
          <SidebarGroupContent className=" bg-black">
            <SidebarMenu className=" bg-black">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className=" my-5 text-white">
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1 text-2xl"
                  >
                    <a href={item.url}>
                      <item.icon className=" w-32 h-32" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
