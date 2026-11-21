import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Search, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatPrice, takeawayPrice, type MenuCategory } from "@/lib/menu";

interface MenuPageProps {
  title: string;
  subtitle: string;
  categories: MenuCategory[];
  originals: { name: string; url: string }[];
  dessert?: boolean;
}
export function MenuPage({ title, subtitle, categories, originals, dessert = false }: MenuPageProps) {
  const [category, setCategory] = useState("todos");
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const visible = categories.filter(c => category === "todos" || category === c.id).map(c => ({ ...c, items: c.items.filter(item => normalize(`${item.name} ${item.description ?? ""} ${c.name}`).includes(normalize(query))) })).filter(c => c.items.length > 0);
  return <main>
    <section className={`${dessert ? "bg-muted" : "bg-secondary"} border-b-4 py-10 sm:py-14`}>
      <div className="mx-auto max-w-6xl px-4">
        <Button asChild variant="ghost" className="mb-5"><Link to="/"><ArrowLeft /> Inicio</Link></Button>
        <p className="mb-3 font-display text-sm text-foreground">Veddanna Dinner</p>
        <h1 className="font-script text-5xl text-foreground sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg">{subtitle}</p>
        <p className="mt-2 text-sm text-foreground">Precios en pesos mexicanos</p>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input aria-label="Buscar en el menú" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar un antojo…" className="h-11 w-full rounded-md border-2 bg-background pl-10 pr-3 outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <nav aria-label="Categorías del menú" className="flex flex-wrap gap-2 border-b-2 border-input pb-6">
        {[{ id: "todos", name: "Todo el menú" }, ...categories].map(c => <Button key={c.id} variant={category === c.id ? "secondary" : "outline"} aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className="border-2">{c.name}</Button>)}
      </nav>
      <div className="grid gap-x-12 gap-y-12 py-10 lg:grid-cols-2">
        {visible.map(c => <section key={c.id} aria-labelledby={`heading-${c.id}`} className="min-w-0">
          <h2 id={`heading-${c.id}`} className="border-b-4 border-primary pb-3 font-script text-3xl text-foreground">{c.name}</h2>
          {c.note && <p className="mt-4 text-sm text-muted-foreground">{c.note}</p>}
          <dl className="mt-3 divide-y divide-input">{c.items.map(item => <div key={item.name} className="py-4">
            <div className="flex items-start justify-between gap-4">
              <dt className="min-w-0 text-lg font-semibold leading-snug">{item.name}</dt>
              <dd className="shrink-0 font-semibold tabular-nums text-accent">{formatPrice(item.price)}</dd>
            </div>
            {item.description && <dd className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">{item.description}</dd>}
          </div>)}</dl>
        </section>)}
      </div>
      {visible.length === 0 && <p role="status" className="py-12 text-center text-muted-foreground">No encontramos platillos con ese nombre.</p>}
      {!dessert && <p className="border-y-2 border-input py-4 font-semibold">Desechables para llevar · {formatPrice(takeawayPrice)}</p>}
    </div>
    <section className="border-y-4 bg-muted py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-script text-3xl">La carta original</h2>
        <div className="mt-6 flex flex-wrap gap-6">{originals.map(original => <Dialog key={original.name}>
          <DialogTrigger asChild><Button aria-label={`Ver carta original: ${original.name}`} variant="outline" className="h-auto flex-col gap-3 border-2 p-3">
            <img src={original.url} alt={`Carta de ${original.name}`} className="h-44 w-28 rounded-sm object-cover object-top" loading="lazy" />
            <span className="flex items-center gap-2"><ZoomIn />{original.name}</span>
          </Button></DialogTrigger>
          <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto" aria-describedby={undefined}>
            <DialogTitle>Veddanna · {original.name}</DialogTitle>
            <img src={original.url} alt={`Menú original completo: ${original.name}`} className="h-auto w-full" />
            <Button asChild variant="outline"><a href={original.url} target="_blank" rel="noreferrer">Abrir imagen completa <ZoomIn /></a></Button>
          </DialogContent>
        </Dialog>)}</div>
      </div>
    </section>
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10">
      <span className="font-script text-3xl">{dessert ? "¿Algo salado?" : "¿Un final dulce?"}</span>
      <Button asChild size="lg" className="border-2 font-display shadow-retro"><Link to={dessert ? "/menu" : "/postres"}>{dessert ? "Ver platillos" : "Ver postres"}<ArrowRight /></Link></Button>
    </div>
  </main>;
}