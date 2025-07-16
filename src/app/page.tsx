import { Button } from "../components/ui/button";
import CtaSection from "../components/tailwindcomponents/ctaSection"
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-muted">
      <header className="flex items-center justify-between px-6 py-4 border-b-2 border-primary">
        <Link href="/">
          <p className="text-black uppercase font-bold">Candify</p>
        </Link>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/login">Se connecter</Link>
          </Button>

          <Button asChild>
            <Link href="/register">S'inscrire</Link>
          </Button>
        </div>
      </header>
    <CtaSection />
    </main>
  );
}
