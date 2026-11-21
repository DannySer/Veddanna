import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/menu-page";
import { savoryMenu } from "@/lib/menu";
import snacks from "@/assets/carta-snacks.jpeg.asset.json";
import platillos from "@/assets/carta-platillos.jpeg.asset.json";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [
    { title: "Menú de platillos y snacks | Veddanna Dinner" },
    { name: "description", content: "La carta real de Veddanna Dinner: hamburguesas, hot dogs, chilaquiles, molletes, burritos, sándwiches y paquetes con precios en pesos mexicanos." },
    { property: "og:title", content: "Menú de platillos | Veddanna Dinner" },
    { property: "og:description", content: "Consulta los platillos, ingredientes y precios del menú real de Veddanna." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Menu,
});
function Menu() {
  return <MenuPage title="Nuestro menú" subtitle="Hamburguesas, snacks y antojitos mexicanos" categories={savoryMenu} originals={[{ name: "Snacks", url: snacks.url }, { name: "Platillos y antojitos", url: platillos.url }]} />;
}