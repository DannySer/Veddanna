/* Veddanna Dinner — funciones del sitio sin dependencias (funciona abriendo el archivo directamente). */
(function () {
  // Carrusel del inicio
  var dots = document.querySelectorAll('button[aria-label^="Ver foto"]');
  if (dots.length) {
    var slides = dots[0].closest("section").querySelectorAll("img");
    var current = 0, timer;
    function show(i) {
      current = i;
      slides.forEach(function (img, n) { img.classList.toggle("opacity-100", n === i); img.classList.toggle("opacity-0", n !== i); });
      dots.forEach(function (d, n) { d.classList.toggle("bg-secondary", n === i); d.classList.toggle("bg-background/40", n !== i); });
    }
    function start() { clearInterval(timer); timer = setInterval(function () { show((current + 1) % slides.length); }, 5000); }
    dots.forEach(function (d, n) { d.addEventListener("click", function () { show(n); start(); }); });
    show(0); start();
  }

  // Filtros y búsqueda del menú
  var nav = document.querySelector('nav[aria-label="Categorías del menú"]');
  if (nav) {
    var buttons = nav.querySelectorAll("button");
    var activeClass = buttons[0].className, idleClass = buttons[1] ? buttons[1].className : activeClass;
    var sections = document.querySelectorAll('section[aria-labelledby^="heading-"]');
    var input = document.querySelector('input[aria-label="Buscar en el menú"]');
    var empty = document.createElement("p");
    empty.setAttribute("role", "status"); empty.className = "py-12 text-center text-muted-foreground";
    empty.textContent = "No encontramos platillos con ese nombre."; empty.hidden = true;
    sections[0].parentNode.after(empty);
    var ids = ["todos"]; sections.forEach(function (s) { ids.push(s.getAttribute("aria-labelledby").replace("heading-", "")); });
    var category = "todos";
    function norm(v) { return v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
    function apply() {
      var q = norm(input.value.trim()), any = false;
      sections.forEach(function (s, n) {
        var catOk = category === "todos" || category === ids[n + 1];
        var catName = s.querySelector("h2").textContent, shown = 0;
        s.querySelectorAll("dl > div").forEach(function (row) {
          var ok = catOk && norm(row.textContent + " " + catName).indexOf(q) !== -1;
          row.style.display = ok ? "" : "none"; if (ok) shown++;
        });
        s.style.display = shown ? "" : "none"; if (shown) any = true;
      });
      empty.hidden = any;
    }
    buttons.forEach(function (b, n) {
      b.addEventListener("click", function () {
        category = ids[n];
        buttons.forEach(function (o, m) { o.className = m === n ? activeClass : idleClass; o.setAttribute("aria-pressed", m === n ? "true" : "false"); });
        apply();
      });
    });
    input.addEventListener("input", apply);
  }

  // Ampliar la carta original
  document.querySelectorAll('button[aria-label^="Ver carta original"]').forEach(function (b) {
    b.addEventListener("click", function () {
      var src = b.querySelector("img").getAttribute("src");
      var box = document.createElement("div");
      box.setAttribute("role", "dialog"); box.setAttribute("aria-label", b.getAttribute("aria-label"));
      box.style.cssText = "position:fixed;inset:0;z-index:100;background:rgba(20,20,30,.85);display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:1rem;cursor:zoom-out";
      box.innerHTML = '<div style="position:relative;max-width:48rem;width:100%"><button type="button" aria-label="Cerrar" style="position:sticky;top:0;float:right;background:#fff;border:3px solid #222;border-radius:999px;padding:.3rem .9rem;font-weight:700;cursor:pointer">Cerrar ✕</button><img alt="Menú original completo" style="width:100%;height:auto;border-radius:.5rem;margin-top:.5rem"></div>';
      box.querySelector("img").src = src;
      function close() { box.remove(); document.removeEventListener("keydown", esc); }
      function esc(e) { if (e.key === "Escape") close(); }
      box.addEventListener("click", function (e) { if (e.target === box || e.target.getAttribute("aria-label") === "Cerrar") close(); });
      document.addEventListener("keydown", esc);
      document.body.appendChild(box);
    });
  });
})();
