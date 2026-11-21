import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/menu-page";
import { dessertMenu } from "@/lib/menu";
import carta from "@/assets/carta-postres.jpeg.asset.json";

export const Route = createFileRoute("/postres")({
  head: () => ({ meta: [
    { title: "Crepas y postres | Veddanna Dinner" },
    { name: "description", content: "Crepas dulces, banana split, helados y cupcakes de Veddanna Dinner. Consulta la carta dulce y sus precios en pesos mexicanos." },
    { property: "og:title", content: "Carta de postres | Veddanna Dinner" },
    { property: "og:description", content: "Todos los antojos dulces de Veddanna: crepas, helados y extras con precios." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Postres,
});
function Postres() {
  return <MenuPage dessert title="El lado dulce" subtitle="Crepas, helados y antojos dulces" categories={dessertMenu} originals={[{ name: "Crepas y postres", url: carta.url }]} />;
}