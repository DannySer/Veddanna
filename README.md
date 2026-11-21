# Veddanna Dinner — GitHub Pages

Este paquete contiene el sitio completo: inicio, menú, postres, estilos, imágenes y navegación. No incluye `.env` ni requiere claves o instalar Node.js.

## Publicar y probar

1. Crea un repositorio **público** en GitHub, por ejemplo `veddanna` (un repositorio privado puede requerir un plan de pago).
2. Descomprime el ZIP y sube **su contenido**, no el ZIP ni una carpeta que lo envuelva: `index.html` debe quedar en la raíz del repositorio.
3. Incluye la carpeta oculta **`.github`**. Contiene el archivo `.github/workflows/pages.yml` que publica la página y `.github/scripts/prepare.py` que ajusta las rutas. Si tu explorador la oculta, activa “Mostrar archivos ocultos”. En GitHub comprueba que aparezca `.github/workflows/pages.yml`.
4. En el repositorio abre **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Abre **Actions → Publicar Veddanna en GitHub Pages → Run workflow → Run workflow** (rama `main` o `master`). Si ya hay una ejecución correcta, no hace falta repetirla.
6. Cuando termine en verde, abre **Settings → Pages → Visit site**. La dirección será `https://TU-USUARIO.github.io/veddanna/` si llamaste `veddanna` al repositorio.

La publicación adapta automáticamente los estilos, imágenes y navegación al nombre del repositorio; no tienes que cambiar enlaces. No agregues un dominio personalizado a esta prueba.

GitHub no muestra el sitio como una página al abrir `index.html` dentro del repositorio: debes entrar mediante **Visit site** después de publicarlo con Pages.

Los archivos de este paquete conservan la base `/Veddanna` hasta que GitHub Actions los prepara; no abras el HTML con doble clic para comprobar GitHub Pages. Las tipografías de Google necesitan conexión a internet.