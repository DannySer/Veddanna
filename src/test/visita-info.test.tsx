import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

async function renderHome() {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

describe("Horarios y dirección reales", () => {
  it("muestra desayunos de lunes a viernes de 11:00 a 13:00", async () => {
    await renderHome();
    expect(await screen.findByText(/Lunes a viernes · 11:00 – 13:00/)).toBeTruthy();
  });
  it("muestra horario abierto lunes a viernes 11:00 a 22:00 y sábados 14:00 a 22:00", async () => {
    await renderHome();
    expect(await screen.findByText(/Lunes a viernes · 11:00 – 22:00/)).toBeTruthy();
    expect(screen.getByText(/Sábados · 14:00 – 22:00/)).toBeTruthy();
  });
  it("muestra la dirección Av. De los Barrios 34, Col. Reyes Ixtacala, Tlalnepantla", async () => {
    await renderHome();
    expect(await screen.findByText(/Av\. De los Barrios 34, Col\. Reyes Ixtacala, Tlalnepantla/)).toBeTruthy();
  });
  it("enlaza a la ubicación real en Google Maps", async () => {
    await renderHome();
    const link = await screen.findByRole("link", { name: "Cómo llegar" });
    expect(link.getAttribute("href")).toBe("https://maps.app.goo.gl/cCRzDSchjnaCyiY88");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
