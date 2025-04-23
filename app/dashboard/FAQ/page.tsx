"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FAQ() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Foire aux questions (FAQ)</CardTitle>
          </CardHeader>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <CardContent>
            <Accordion>
              <AccordionItem title="1. Comment formuler une commande ?">
                Pour passer une commande, commencez par cliquer sur le bouton "Espace des commandes" 
                situé sur la gauche de votre écran. Une fois dans le bon espace, 
                cliquez sur le bouton bleu "Ajouter une commande" en haut à droite. 
                Un formulaire apparaîtra alors : il vous suffit de le remplir soigneusement avec les informations demandées, 
                puis de le valider pour finaliser votre commande.
                <br/>
                Un administrateur prendra rapidement en charge votre demande et s'assurera de son bon traitement ! 
              </AccordionItem>

              <AccordionItem title="2. Si ma commande est refusé car le stock est manquant, comment savoir quand le restockage a lieu ? ?">
                Si votre commande a été refusée en raison d'un stock insuffisant du matériel ou médicament que vous souhaitiez,
                ne vous inquiétez pas. Nous vous conseillons de consulter régulièrement l'espace des mouvements 
                afin de vérifier si le produit recherché a été réapprovisionné. 
                Pour y accéder, il vous suffit de cliquer sur le bouton "Mouvements", situé sur la gauche de votre écran.
                <br/>
                Nos Administrateurs font leur possible pour réapprovisionner notre stock le plus rapidement possible  !
              </AccordionItem>

              <AccordionItem title="3. Comment obtenir les droits d'administrateur ?">
                Vous ne pourrez pas obtenir de droits d'administrateur via l'interface de votre application, 
                car il s'agit d'une opération exceptionnelle qui ne peut être réalisée que sous la supervision 
                d'une autorité supérieure ou égale à celle d'un autre administrateur. 
                De plus, un administrateur ne pourra pas promouvoir un utilisateur classique au statut d'administrateur. 
                Pour des raisons de sécurité, cette opération doit impérativement être effectuée par une autorité 
                disposant des accès nécessaires à la base de données.
                <br/>
                Nous vous remercions pour votre compréhension.
              </AccordionItem>

              <AccordionItem title="4. En tant qu'administrateur, J'aimerai ajouter du stock a un médicament mais il n'existe pas dans la liste proposé, comment faire ?">
                Pour ajouter un nouveau type de stock, commencez par cliquer sur le bouton situé à gauche de votre écran, 
                intitulé "Espace du stocks". Une fois dans cet espace, cliquez sur le bouton bleu en haut à droite, 
                intitulé "Ajouter un nouveau type de stock". Il vous suffira ensuite de remplir le formulaire qui s'affiche 
                et de le valider pour créer votre nouveau type de stock !
                <br/>
                Notez que ce bouton n'est accessible que pour les administrateur, pas de panique si vous ne le voyez pas alors que vous êtes connecté avec un compte utilisateur standard.
              </AccordionItem>
            </Accordion>
          </CardContent>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}



