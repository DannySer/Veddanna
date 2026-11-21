import { describe, expect, it } from "vitest";
import { savoryMenu, dessertMenu, hotDogExtraPrice, takeawayPrice } from "@/lib/menu";

// Literal prices transcribed from the three restaurant menu photographs.
const expectedSavory = [
  [85, 90, 100, 95, 110, 115, 140, 100, 100],
  [30, 35, 40, 100], [75, 80, 85, 85, 95],
  [80, 90, 100, 110, 100, 110], [60, 80],
  [60, 70, 80, 90, 80, 85, 70], [65, 75, 80, 85],
  [60, 80, 35, 65, 35, 60, 90], [130, 160],
];
const expectedDesserts = [[80, 90, 100, 110, 110], [20, 70, 90, 28, 25, 18, 80], [20, 5, 20, 20]];
describe("Official Veddanna menu prices", () => {
  savoryMenu.forEach((category, index) => category.items.forEach((item, itemIndex) => {
    it(`${category.name}: ${item.name} uses its official price`, () => expect(item.price).toBe(expectedSavory[index]?.[itemIndex]));
  }));
  dessertMenu.forEach((category, index) => category.items.forEach((item, itemIndex) => {
    it(`${category.name}: ${item.name} uses its confirmed price`, () => expect(item.price).toBe(expectedDesserts[index]?.[itemIndex]));
  }));
  it("charges 10 pesos for takeaway disposables", () => expect(takeawayPrice).toBe(10));
  it("charges 6 pesos per extra classic hot dog ingredient", () => expect(hotDogExtraPrice).toBe(6));
});