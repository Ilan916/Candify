import { Button } from "../components/ui/button";
import CtaSection from "../components/tailwindcomponents/ctaSection"
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen  bg-neutral-900">
      <header className="flex items-center justify-between px-6 py-4 border-b-2 border-white/60">
        <Link href="/">
          <p className="text-white uppercase font-bold">Candify</p>
        </Link>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/authentification/connexion">Se connecter</Link>
          </Button>

          <Button asChild>
            <Link href="/authentification/inscription">S'inscrire</Link>
          </Button>
        </div>
      </header>
    <CtaSection />
    </main>
  );
}
