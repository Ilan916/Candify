"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name?: string
  email: string
  image?: string
  emailVerified: boolean
  createdAt: Date
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession()
        if (session.data?.user) {
          setUser(session.data.user as unknown as User)
        } else {
          router.push("/authentification/connexion")
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error)
        router.push("/authentification/connexion")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push("/authentification/connexion")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Candify Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Bonjour, {user.name || user.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil utilisateur</CardTitle>
                <CardDescription>Informations de votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Nom:</strong> {user.name || "Non défini"}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Email vérifié:</strong> {user.emailVerified ? "Oui" : "Non"}</p>
                  <p><strong>Créé le:</strong> {new Date(user.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bienvenue !</CardTitle>
                <CardDescription>Votre tableau de bord est prêt</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Félicitations ! Votre authentification fonctionne parfaitement. 
                  Vous pouvez maintenant commencer à développer les fonctionnalités 
                  de votre application.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaines étapes</CardTitle>
                <CardDescription>Ce que vous pouvez faire maintenant</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Personnaliser votre profil</li>
                  <li>• Ajouter des fonctionnalités</li>
                  <li>• Configurer les paramètres</li>
                  <li>• Inviter des utilisateurs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
