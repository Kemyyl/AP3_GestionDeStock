import SignUp from "@/components/auth/signUp"
import Login from "@/components/auth/login"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"

export default function Home() {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 ">
      {/* Date du jour affichée en haut */}
      <div className="mb-8 text-xl font-medium text-gray-600">
        Nous sommes le {currentDate}
      </div>


      <div className="flex h-screen w-full items-center justify-center px-4">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>


    </div>
  )
}

