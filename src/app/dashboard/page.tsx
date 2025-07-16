import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
        headers: await headers()
    })
 
    if(!session) {
        redirect("/authentification/connexion")
    }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}