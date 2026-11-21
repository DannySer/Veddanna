import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg.asset.json";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return <header className="sticky top-0 z-40 border-b-4 bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
      <Link to="/" aria-label="Veddanna Dinner, inicio"><img src={logo.url} alt="Veddanna Dinner" className="h-12 w-auto rounded-md" /></Link>
      <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-3">
        <Button asChild variant="ghost"><Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-secondary" }}>Inicio</Link></Button>
        <Button asChild variant="ghost"><Link to="/menu" activeProps={{ className: "bg-secondary" }}>Menú</Link></Button>
        <Button asChild variant="ghost"><Link to="/postres" activeProps={{ className: "bg-secondary" }}>Postres</Link></Button>
        <Button asChild variant="ghost" className="hidden md:inline-flex"><Link to="/" hash="tienda">Tienda</Link></Button>
        <Button asChild variant="ghost" className="hidden lg:inline-flex"><Link to="/" hash="lugar">El lugar</Link></Button>
      </nav>
      <Button asChild className="hidden border-2 font-display shadow-retro sm:inline-flex"><Link to="/" hash="visita">¡Ven hoy!</Link></Button>
    </div>
    <div className="checker h-3" />
  </header>;
}