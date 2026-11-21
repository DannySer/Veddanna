import { describe, expect, it } from "vitest";
import { dessertMenu } from "@/lib/menu";

describe("Real dessert menu shown on the landing", () => {
  const find = (categoryId: string, name: string) =>
    dessertMenu.find(category => category.id === categoryId)?.items.find(item => item.name === name);
  it("has no cakes category: cakes are not on the real menu", () =>
    expect(dessertMenu.some(category => category.id === "pasteles")).toBe(false));
  it("includes the three dessert categories", () =>
    expect(dessertMenu.map(category => category.id)).toEqual(["crepas", "helados", "extras"]));
  it("prices Crepas Sugar Sugar at 90 pesos", () => expect(find("crepas", "Crepas Sugar Sugar")?.price).toBe(90));
  it("prices Crepas A Go Go at 100 pesos", () => expect(find("crepas", "Crepas A Go Go")?.price).toBe(100));
  it("prices Banana Split at 90 pesos", () => expect(find("helados", "Banana Split")?.price).toBe(90));
  it("prices Dono Helado at 80 pesos", () => expect(find("helados", "Dono Helado")?.price).toBe(80));
  it("prices Copa de Helado at 70 pesos", () => expect(find("helados", "Copa de Helado")?.price).toBe(70));
  it("prices the extra ice cream scoop at 20 pesos", () => expect(find("extras", "Bola de Helado")?.price).toBe(20));
});
