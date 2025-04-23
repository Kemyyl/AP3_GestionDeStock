"use client"

import * as React from "react"
import { CircleHelp, GraduationCap, Eye, Package, Boxes, Archive} from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"

const data = {

  navMain: [
    {
      title: "Espace du Stock",
      url: "/dashboard/stocks",
      icon: Eye,
      isActive: true
    },
    {
      title: "Espace des Commandes",
      url: "/dashboard/commande",
      icon: Package,
      isActive: true
    },
    {
      title: "Commandes en Attente",
      url: "/dashboard/commandeAttente",
      icon: Boxes,
      isActive: true
    },
    {
      title: "Mouvements",
      url: "/dashboard/mouvements",
      icon: Archive,
      isActive: true
    },
  ],
  navSecondary: [
    {
      title: "FAQ",
      url: "/dashboard/FAQ",
      icon: CircleHelp,
    },
  ],
  projects: [
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MED Instock</span>
                  <span className="truncate text-xs">AP3</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
