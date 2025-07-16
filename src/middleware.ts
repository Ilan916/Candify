import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Routes qui nécessitent une authentification
  const protectedRoutes = ["/dashboard"]
  
  // Routes d'authentification (on redirige si déjà connecté)
  const authRoutes = ["/authentification/connexion", "/authentification/inscription"]

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Vérifier si c'est une route d'authentification
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute || isAuthRoute) {
    try {
      // Vérifier la session
      const session = await auth.api.getSession({
        headers: request.headers,
      })

      // Si route protégée et pas de session, rediriger vers login
      if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL("/authentification/connexion", request.url))
      }

      // Si route d'auth et utilisateur connecté, rediriger vers dashboard
      if (isAuthRoute && session?.user) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // En cas d'erreur de session sur une route protégée, rediriger vers login
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/authentification/connexion", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
