"""Exporte les icônes doc (vue de dos) depuis les spritesheets idle du jeu."""
from __future__ import annotations

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT.parent / "Power_Quest"
OUT = ROOT / "assets" / "units"

UNITS = [
    ("infantry", GAME / "scenes/personnages/infantry/infantry-1.tscn"),
    ("archer", GAME / "scenes/personnages/range/range-1.tscn"),
    ("heavy", GAME / "scenes/personnages/heavy/heavy-1.tscn"),
    ("support", GAME / "scenes/personnages/support/support-1.tscn"),
    ("healer", GAME / "scenes/personnages/healer/healer-1.tscn"),
    ("anti_armor", GAME / "scenes/personnages/anti_armor/anti_armor-1.tscn"),
    ("mortar", GAME / "scenes/personnages/mortar/mortar-1.tscn"),
    ("water_transport", GAME / "scenes/personnages/water-transporter/water-transporter-1.tscn"),
    ("water_tank", GAME / "scenes/personnages/water-tank/water-tank-1.tscn"),
    ("water_range", GAME / "scenes/personnages/water-range/water-range-1.tscn"),
    ("guardian", GAME / "scenes/personnages/guardian/gardien-1.tscn"),
]


def idle_back_crop(text: str) -> tuple[Path, tuple[int, int, int, int]]:
    atlas_paths: dict[str, str] = {}
    idle_atlas_id: str | None = None
    fallback_atlas_id: str | None = None
    for m in re.finditer(
        r'\[ext_resource type="Texture2D"[^]]*path="([^"]+)" id="([^"]+)"',
        text,
    ):
        path, eid = m.group(1), m.group(2)
        atlas_paths[eid] = path
        low = path.lower()
        if "/idle" in low or low.endswith("idle.png"):
            idle_atlas_id = eid
        elif "/run" in low or low.endswith("run.png"):
            fallback_atlas_id = eid

    if not idle_atlas_id:
        idle_atlas_id = fallback_atlas_id
    if not idle_atlas_id:
        raise ValueError("texture idle/run introuvable")

    rows: list[tuple[int, int, int, int]] = []
    for m in re.finditer(
        r'atlas = ExtResource\("' + re.escape(idle_atlas_id) + r'"\)\s*\n'
        r"region = Rect2\((\d+), (\d+), (\d+), (\d+)\)",
        text,
    ):
        x, y, w, h = map(int, m.groups())
        rows.append((x, y, w, h))

    if not rows:
        raise ValueError("aucune région idle")

    # Dernière rangée du spritesheet = vue de dos (convention Godot du projet).
    max_y = max(r[1] for r in rows)
    back = [r for r in rows if r[1] == max_y and r[0] == 0]
    if not back:
        back = [r for r in rows if r[1] == max_y]
    back.sort(key=lambda r: r[0])
    x, y, w, h = back[0]
    rel = atlas_paths[idle_atlas_id]
    return GAME / rel.replace("res://", ""), (x, y, w, h)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, tscn in UNITS:
        if not tscn.exists():
            raise FileNotFoundError(tscn)
        atlas, (x, y, w, h) = idle_back_crop(tscn.read_text(encoding="utf-8"))
        img = Image.open(atlas).convert("RGBA")
        crop = img.crop((x, y, x + w, y + h))
        out = OUT / f"{name}.png"
        crop.save(out)
        print(f"{name} <- {atlas.name} dos Rect2({x}, {y}, {w}, {h})")


if __name__ == "__main__":
    main()
