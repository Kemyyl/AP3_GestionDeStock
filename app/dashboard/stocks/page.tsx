//#region TOUT LES IMPORTS 
"use client"
import { useRef, useState } from "react"
import { StockListRef } from "@/components/stocks/stockList"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useToast } from '@/hooks/use-toast';
import StockList from "@/components/stocks/stockList"
import { StockForm, StockFormSchema } from "@/components/stocks/stockForm"
import { CommandeForm, CommandeFormSchema } from "@/components/commande/commandeForm"
//#endregion

export default function Page() {
  const { loading, utilisateur } = useAuth()
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogCommandeOpen, setIsDialogCommandeOpen] = useState(false)

  const StockListRef = useRef<StockListRef>(null);

  const handleNewReservation = () => {
    setIsDialogOpen(true)
  }

  const handleNewCommande = () => {
    setIsDialogCommandeOpen(true)
  }

  const controllerRestock = async (data: z.infer<typeof CommandeFormSchema>) => {
    try {
      const updateData = {
        ...data,
        id_utilisateur : utilisateur?.id_utilisateur 
      }
      await fetch("/api/commandeAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      setIsDialogCommandeOpen(false);
      toast({
        title: "Success",
        description: "Commande créée",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);
    }
  };


  const handleFormSubmit = async (data: z.infer<typeof StockFormSchema>) => {
    try {
      await fetch('/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setIsDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Réservation créée',
        variant: 'default',
      });
      StockListRef.current?.refresh();

    } catch (error) {
      console.error("Erreur lors de la création de la réservation :", error);
    }
  };


  if (loading) return <p>Chargement...</p>

  const utilisateurType = String(utilisateur?.id_role)

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
                  <BreadcrumbPage>Stockage</BreadcrumbPage>
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
                  <h2>Stock</h2>
                  {utilisateurType === '1' && (
                    <Dialog open={isDialogCommandeOpen} onOpenChange={setIsDialogCommandeOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={handleNewCommande}>
                          <Plus /> Ajouter de la quantité à un Stock
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className={cn(
                          "sm:max-w-[600px] w-full max-h-[90vh]",
                          "overflow-y-auto"
                        )}
                      >
                        <DialogHeader>
                          <DialogTitle>Restocker (Cette opération peut prendre quelques secondes)</DialogTitle>
                        </DialogHeader>
                        <div className="grid py-4 gap-4">
                          <CommandeForm onFormSubmit={controllerRestock} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {utilisateurType === '1' && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={handleNewReservation}>
                          <Plus /> Ajouter un nouveau type de Stock
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className={cn(
                          "sm:max-w-[600px] w-full max-h-[90vh]",
                          "overflow-y-auto"
                        )}
                      >
                        <DialogHeader>
                          <DialogTitle>Nouveau stock</DialogTitle>
                        </DialogHeader>
                        <div className="grid py-4 gap-4">
                          <StockForm onFormSubmit={handleFormSubmit} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StockList ref={StockListRef} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}