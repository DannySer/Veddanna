import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dessertMenu, savoryMenu, formatPrice } from "@/lib/menu";
import logo from "@/assets/logo.jpg.asset.json";
import interior from "@/assets/interior.jpg.asset.json";
import booths from "@/assets/booths.jpg.asset.json";
import fachada from "@/assets/fachada.jpg.asset.json";
import crepa from "@/assets/crepa.jpg.asset.json";
import donoHelado from "@/assets/dono-helado.jpg.asset.json";
import bananaSplit from "@/assets/banana-split.jpg.asset.json";
import malteadaFresa from "@/assets/malteada-fresa.jpg.asset.json";
import hamburguesa from "@/assets/hamburguesa.jpg.asset.json";
import hotdogChamoy from "@/assets/hotdog-chamoy.jpg.asset.json";
import malteadaChilaquiles from "@/assets/malteada-chilaquiles.jpg.asset.json";
import croissant from "@/assets/croissant.jpg.asset.json";
import chamoyada from "@/assets/chamoyada.jpg.asset.json";
import salonBarra from "@/assets/salon-barra.jpg.asset.json";
import salonMural from "@/assets/salon-mural.jpg.asset.json";
import salonClientes from "@/assets/salon-clientes.jpg.asset.json";
import merchCamiseta from "@/assets/merch-camiseta-2.jpg";
import merchTaza from "@/assets/merch-taza-2.jpg";
import merchGorra from "@/assets/merch-gorra-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veddanna Dinner | Diner retro de los 50s y 60s" },
      { name: "description", content: "Desayunos, hamburguesas, papas, malteadas, crepas y postres, y merchandising oficial en un diner rosa y menta al ritmo del rock and roll." },
      { property: "og:title", content: "Veddanna Dinner | Diner retro" },
      { property: "og:description", content: "Desayunos, hamburguesas, malteadas, crepas y postres, y merchandising estilo 50s y 60s." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const favoritos = [
  { img: hamburguesa.url, name: "Paquete con Malteada", tag: "¡Favorito!" },
  { img: hotdogChamoy.url, name: "Combo Hot Dog", tag: "Clásico" },
].flatMap(feature => {
  const item = savoryMenu.flatMap(c => c.items).find(item => item.name === feature.name);
  return item ? [{ ...feature, desc: item.description, price: formatPrice(item.price) }] : [];
});

const postres = [
  { img: crepa.url, name: "Crepas Sugar Sugar", tag: "Con fruta" },
  { img: bananaSplit.url, name: "Banana Split", tag: "Clásico" },
  { img: donoHelado.url, name: "Dono Helado", tag: "Bien frío" },
].flatMap(feature => {
  const item = dessertMenu.flatMap(c => c.items).find(item => item.name === feature.name);
  return item ? [{ ...feature, desc: item.description, price: formatPrice(item.price) }] : [];
});

const merch = [
  { img: merchCamiseta, name: "Camiseta Veddanna", desc: "Algodón negro con estampa estelar rosa y menta.", tag: "Tallas M – XL" },
  { img: merchTaza, name: "Taza Esmaltada", desc: "Taza retro tipo campamento con el logo.", tag: "Edición limitada" },
  { img: merchGorra, name: "Gorra Trucker", desc: "Panel rosa y malla menta con parche bordado.", tag: "Ajustable" },
];

const mapsLink = "https://maps.app.goo.gl/cCRzDSchjnaCyiY88";
const mapsKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
const mapsEmbedUrl = mapsKey
  ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent("Veddanna Dinner, Av. De los Barrios 34, Col. Reyes Ixtacala, Tlalnepantla")}&zoom=17`
  : null;

const heroSlides = [
  { src: interior.url, alt: "Interior del diner Veddanna" },
  { src: hamburguesa.url, alt: "Hamburguesa con queso de Veddanna" },
  { src: booths.url, alt: "Sillones retro de Veddanna" },
  { src: bananaSplit.url, alt: "Banana split frente al neón de Veddanna" },
  { src: fachada.url, alt: "Fachada de Veddanna de noche" },
];

const cocina = [
  { src: croissant.url, alt: "Croissant de jamón y queso" },
  { src: malteadaFresa.url, alt: "Malteada de fresa con crema batida" },
  { src: chamoyada.url, alt: "Chamoyada con tamarindo y chamoy" },
  { src: malteadaChilaquiles.url, alt: "Malteada de chocolate con chilaquiles" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const [mapsAllowed, setMapsAllowed] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    setMapsAllowed(/\.(lovable\.app|lovableproject\.com)$/.test(window.location.hostname));
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
          {heroSlides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-chrome/85 via-chrome/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-16 text-center">
          <span className="wiggle mb-4 inline-block rounded-full border-4 bg-secondary px-4 py-1 font-display text-sm text-secondary-foreground">
            Desde los 50s con amor
          </span>
          <h1 className="font-script text-6xl text-background neon md:text-8xl">Veddanna</h1>
          <p className="mt-3 font-display text-2xl text-secondary md:text-4xl">Algo para todos</p>
          <p className="mt-4 max-w-xl text-lg text-background/90">
            Hamburguesas, papas, malteadas y desayunos al ritmo del rock and roll.
          </p>
          <Button asChild size="lg" className="mt-8 h-auto rounded-full border-4 border-background px-8 py-3 font-display shadow-retro"><Link to="/menu">Ver el menú</Link></Button>
          <div className="mt-6 flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-3 w-3 rounded-full border-2 border-background transition ${i === slide ? "bg-secondary" : "bg-background/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Favoritos */}
      <section id="menu" className="dots py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-script text-5xl text-primary md:text-6xl">Nuestros favoritos</h2>
          <p className="mt-2 text-center font-display text-mint-deep">Hamburguesas · Papas · Malteadas</p>
          <p className="mt-3 text-center text-sm text-muted-foreground">Fotografías ilustrativas</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {favoritos.map((f, i) => (
              <article key={f.name} className={`relative rounded-3xl border-4 p-5 shadow-retro transition hover:-translate-y-2 ${i % 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                <span className="absolute -top-4 -right-3 z-10 rotate-6 rounded-full border-4 bg-accent px-3 py-1 font-display text-xs text-accent-foreground">{f.tag}</span>
                <img src={f.img} alt={f.name} loading="lazy" className="aspect-square w-full rounded-2xl border-4 object-cover" />
                <h3 className="mt-4 font-display text-xl">{f.name}</h3>
                <p className="mt-1 opacity-90">{f.desc}</p>
                <p className="mt-3 font-semibold">{f.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center"><Button asChild size="lg" className="border-2 font-display shadow-retro"><Link to="/menu">Ver todos los platillos</Link></Button></div>
          <div className="mt-14">
            <p className="text-center font-display text-mint-deep">Directo de la cocina</p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {cocina.map((f, i) => (
                <img key={f.alt} src={f.src} alt={f.alt} loading="lazy" className={`aspect-square w-full rounded-2xl border-4 object-cover shadow-retro ${i % 2 ? "rotate-1" : "-rotate-1"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="checker h-8 border-y-4" />

      {/* Postres y pasteles */}
      <section id="postres" className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-script text-5xl text-primary md:text-6xl">Postres y antojos dulces</h2>
          <p className="mt-2 text-center font-display text-mint-deep">Crepas · Helados · Antojos dulces</p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Crepas, helados, banana split y cupcakes para un final dulce.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {postres.map((p, i) => (
              <article key={p.name} className={`relative rounded-3xl border-4 p-5 shadow-retro transition hover:-translate-y-2 ${i % 2 ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>
                <span className="absolute -top-4 -right-3 z-10 rotate-6 rounded-full border-4 bg-accent px-3 py-1 font-display text-xs text-accent-foreground">{p.tag}</span>
                <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full rounded-2xl border-4 object-cover" />
                <h3 className="mt-4 flex flex-wrap items-baseline justify-between gap-3 font-display text-xl">
                  <span>{p.name}</span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border-4 bg-accent px-3 py-1 text-sm text-accent-foreground">{p.price}</span>
                </h3>
                <p className="mt-1 opacity-90">{p.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center"><Button asChild size="lg" className="border-2 font-display shadow-retro"><Link to="/postres">Ver todos los postres</Link></Button></div>
          <p className="mt-10 text-center font-display text-sm text-mint-deep">
            Para llevar y para toda ocasión
            <br />
            <span className="text-xs opacity-80">Precios en pesos mexicanos</span>
          </p>
        </div>
      </section>

      <div className="checker h-8 border-y-4" />

      {/* Merchandising */}
      <section id="tienda" className="dots py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-script text-5xl text-primary md:text-6xl">Lleva Veddanna a casa</h2>
          <p className="mt-2 text-center font-display text-mint-deep">Merchandising oficial · Disponible en el diner</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {merch.map((m, i) => (
              <article key={m.name} className={`relative rounded-3xl border-4 p-5 shadow-retro transition hover:-translate-y-2 ${i % 2 ? "bg-secondary text-secondary-foreground" : "bg-background text-foreground"}`}>
                <span className="absolute -top-4 -right-3 z-10 -rotate-6 rounded-full border-4 bg-primary px-3 py-1 font-display text-xs text-primary-foreground">{m.tag}</span>
                <img src={m.img} alt={m.name} loading="lazy" className="aspect-square w-full rounded-2xl border-4 object-cover" />
                <h3 className="mt-4 font-display text-xl">{m.name}</h3>
                <p className="mt-1 opacity-90">{m.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#visita" className="inline-block rounded-full border-4 bg-primary px-8 py-3 font-display text-primary-foreground shadow-retro transition hover:-translate-y-1">
              Comprar en el diner
            </a>
          </div>
        </div>
      </section>

      <div className="checker h-8 border-y-4" />

      {/* El lugar */}
      <section id="lugar" className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-script text-5xl text-primary md:text-6xl">Viaja en el tiempo</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Pisos de ajedrez, sillones menta, jukebox y neón rosa. Un rincón para desayunar, comer y compartir como en los viejos tiempos.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [booths.url, "Sillones retro de noche"],
              [fachada.url, "Fachada de Veddanna"],
              [interior.url, "Salón con globos de corazón"],
              [salonBarra.url, "La barra y las mesas rosas"],
              [salonMural.url, "El mural del salón"],
              [salonClientes.url, "Ambiente de los 50s"],
            ].map(([src, alt], i) => (
              <figure key={alt} className={`overflow-hidden rounded-3xl border-4 bg-card shadow-retro ${i === 1 ? "md:-rotate-2" : "md:rotate-1"}`}>
                <img src={src} alt={alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="p-3 text-center font-semibold">{alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Visítanos */}
      <section id="visita" className="py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="font-script text-5xl text-primary">¡Te esperamos!</h2>
            <ul className="mt-6 space-y-4 text-lg">
              <li><span className="font-display text-mint-deep">Desayunos</span><br />Lunes a viernes · 11:00 – 13:00</li>
              <li><span className="font-display text-mint-deep">Horario abierto</span><br />Lunes a viernes · 11:00 – 22:00<br />Sábados · 14:00 – 22:00</li>
              <li><span className="font-display text-mint-deep">Dirección</span><br />Av. De los Barrios 34, Col. Reyes Ixtacala, Tlalnepantla</li>
            </ul>
          </div>
          <div className="rounded-3xl border-4 bg-secondary p-8 text-center shadow-retro">
            <img src={logo.url} alt="Veddanna Dinner" className="mx-auto w-56 rounded-2xl" />
            <p className="mt-4 font-display text-secondary-foreground">Hamburguesas, papas y malteadas</p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-5xl px-4">
          <div className="overflow-hidden rounded-3xl border-4 bg-card shadow-retro">
            {mapsAllowed && mapsEmbedUrl ? (
              <iframe
                title="Mapa con la ubicación de Veddanna Dinner"
                src={mapsEmbedUrl}
                className="h-[360px] w-full"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="dots flex h-[360px] flex-col items-center justify-center gap-4 p-6 text-center">
                <p className="font-display text-xl text-mint-deep">Estamos en Av. De los Barrios 34, Col. Reyes Ixtacala</p>
                <p className="max-w-md text-muted-foreground">Abre el mapa para ver la ubicación exacta y cómo llegar al diner.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center">
            <a href={mapsLink} target="_blank" rel="noreferrer" className="inline-block rounded-full border-4 bg-primary px-8 py-3 font-display text-primary-foreground shadow-retro transition hover:-translate-y-1">
              Cómo llegar
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
