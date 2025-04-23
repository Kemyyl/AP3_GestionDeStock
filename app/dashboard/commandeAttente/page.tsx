"use client";

import React, { useRef } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { CommmandeListAttenteRef, } from "@/components/commande/commandeListAttente";
import CommmandeListAttente from "@/components/commande/commandeListAttente";

export default function Page() {
  const { loading, utilisateur } = useAuth();

  const CommmandeListAttenteRef = useRef<CommmandeListAttenteRef>(null);

  if (loading) return <p>Chargement...</p>;
  
  const userType = String(utilisateur?.id_role)

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
                  <BreadcrumbPage>Commandes en Attente</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {userType !== '1' && (
          <div className="flex justify-center items-center py-8"> Seul les administrateurs peuvent effectuer des actions ici. </div>
        )}
        {userType === '1' && (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="border-none">
            <CardContent>
              <CommmandeListAttente ref={CommmandeListAttenteRef} />
            </CardContent>
          </Card>
        </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
