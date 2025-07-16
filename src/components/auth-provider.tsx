"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authClient } from "@/lib/auth-client"

interface User {
  id: string
  name?: string
  email: string
  image?: string
  emailVerified: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const session = await authClient.getSession()
      if (session.data?.user) {
        setUser(session.data.user as unknown as User)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      setUser(null)
    }
  }

  const signOut = async () => {
    try {
      await authClient.signOut()
      setUser(null)
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      await refreshUser()
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const value = {
    user,
    isLoading,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
