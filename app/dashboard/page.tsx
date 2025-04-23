//#region TOUT LES IMPORTS 
"use client"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, } from "@/components/ui/breadcrumb"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog } from "@/components/ui/dialog"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
//#endregion

export default function Page() {
  const { loading } = useAuth()

  if (loading) return <p>Chargement...</p>

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Acceuil</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <h2>Bienvenu ! </h2>
                </div>
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center items-center py-8">
              <Dialog >
                <p className="text-lg font-medium text-gray-800">
                  Vous pouvez sélectionner un espace dans la barre de navigation à gauche.
                </p>
              </Dialog>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
