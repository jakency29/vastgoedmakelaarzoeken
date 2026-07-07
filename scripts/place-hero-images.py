# Plaatst de hero-afbeelding op pagina's met precies 1 gemigreerde afbeelding.
# De afbeelding komt na de intro en voor de eerste H2 (playbook: hero bij H1 + intro).
# Pagina's met meerdere afbeeldingen worden overgeslagen (die doet de plaatsings-workflow).
# Eenmalig: python scripts/place-hero-images.py

import os, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")

def file_for(slug):
    nested = os.path.join(CONTENT, *slug.split("/"))
    return nested + ".mdx" if os.path.exists(nested + ".mdx") else os.path.join(nested, "index.mdx")

def main():
    manifest = json.load(open(os.path.join(ROOT, "_workflows", "images-manifest.json"), encoding="utf-8"))
    placed = skipped_multi = already = 0
    for slug, imgs in manifest.items():
        if len(imgs) != 1:
            skipped_multi += 1
            continue
        path = file_for(slug)
        if not os.path.exists(path):
            continue
        raw = open(path, encoding="utf-8").read()
        if "<Afbeelding" in raw:
            already += 1
            continue
        img = imgs[0]
        alt = img["alt"].replace('"', "'")
        snippet = f'<Afbeelding src="{img["src"]}" alt="{alt}" w={{{img["w"]}}} h={{{img["h"]}}} hero />'
        lines = raw.split("\n")
        # sla frontmatter over (twee --- regels)
        dash = [i for i, l in enumerate(lines) if l.strip() == "---"]
        start = dash[1] + 1 if len(dash) >= 2 else 0
        insert_at = None
        for i in range(start, len(lines)):
            if lines[i].startswith("## "):
                insert_at = i
                break
        if insert_at is None:
            insert_at = len(lines)
        new = lines[:insert_at] + [snippet, ""] + lines[insert_at:]
        open(path, "w", encoding="utf-8").write("\n".join(new))
        placed += 1
    print(f"Hero geplaatst: {placed}; al aanwezig: {already}; meerdere-afbeeldingen (workflow): {skipped_multi}")

if __name__ == "__main__":
    main()
