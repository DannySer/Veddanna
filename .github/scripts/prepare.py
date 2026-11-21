"""Prepare the static download for the current GitHub Pages repository."""
import os
import shutil
from pathlib import Path


def prepare(root: Path, repository: str, destination: Path) -> None:
    owner, name = repository.split("/", 1)
    base = "" if name.lower() == f"{owner.lower()}.github.io" else f"/{name}"
    destination.mkdir(parents=True, exist_ok=True)
    for entry in ("index.html", "menu", "postres", "assets", "favicon.png", "robots.txt"):
        source = root / entry
        target = destination / entry
        if source.is_dir():
            shutil.copytree(source, target, dirs_exist_ok=True)
        else:
            shutil.copy2(source, target)
    for path in destination.rglob("*"):
        if path.suffix not in {".html", ".js", ".css"}:
            continue
        text = path.read_text()
        text = text.replace("/Veddanna", base)
        text = text.replace('"Veddanna/assets/', f'"{base.lstrip("/") + "/" if base else ""}assets/')
        path.write_text(text)
    (destination / ".nojekyll").touch()


if __name__ == "__main__":
    prepare(Path.cwd(), os.environ["GITHUB_REPOSITORY"], Path("_site"))