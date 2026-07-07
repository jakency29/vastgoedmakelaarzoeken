# Downloadt de bestaande content-afbeeldingen van de live WordPress-site naar public/,
# optimaliseert ze en schrijft een manifest voor de plaatsings-workflow.
# Eenmalig te draaien: python scripts/download-images.py

import os, re, io, html, json, urllib.parse
from concurrent.futures import ThreadPoolExecutor
import requests
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
PUBLIC_IMG = os.path.join(ROOT, "public", "afbeeldingen")
DOMAIN = "https://www.vastgoedmakelaarzoeken.be"
MAX_W = 900
UA = {"User-Agent": "Mozilla/5.0 (contentmigratie eigen site)"}

# Schone slug -> oude live URL (afwijkend van slug bij WP -2 duplicaten en typo).
OVERRIDES = {
    "miserietaks": "/miserietaks-2/",
    "verschil-erfpacht-en-opstal": "/verschil-erfpacht-en-opstal-2/",
    "verwarmen-met-airco": "/verwarmen-met-airco-2/",
    "notariskosten-verkoop-huis/wie-betaalt": "/notariskosten-verkoop-huis/wie-betaald/",
}

def slugs():
    out = []
    for dirpath, _, files in os.walk(CONTENT):
        for f in files:
            if f.endswith(".mdx"):
                rel = os.path.relpath(os.path.join(dirpath, f), CONTENT).replace("\\", "/")
                slug = rel[:-4].removesuffix("/index")
                out.append(slug)
    return sorted(out)

IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
def extract(page_html):
    imgs = []
    seen = set()
    for tag in IMG_RE.findall(page_html):
        m = re.search(r'data-(?:lazy-)?src=["\']([^"\']+)["\']', tag) or re.search(r'\ssrc=["\']([^"\']+)["\']', tag)
        if not m:
            continue
        url = html.unescape(m.group(1))
        if "/wp-content/uploads/" not in url:
            continue
        low = url.lower()
        if any(k in low for k in ("logo", "icon", "favicon", "avatar", "-150x", "-300x300")):
            continue
        alt_m = re.search(r'\balt=["\']([^"\']*)["\']', tag)
        alt = html.unescape(alt_m.group(1)).strip() if alt_m else ""
        if not alt or url in seen:
            continue
        seen.add(url)
        imgs.append((url, alt))
    return imgs[:12]

def basename(url):
    name = urllib.parse.unquote(os.path.basename(urllib.parse.urlparse(url).path)).lower()
    name = re.sub(r"[^a-z0-9._-]", "-", name)
    if not name.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        name += ".jpg"
    return re.sub(r"\.(jpeg|png|webp)$", ".jpg", name)

def process(slug):
    url = DOMAIN + OVERRIDES.get(slug, f"/{slug}/")
    try:
        r = requests.get(url, headers=UA, timeout=40)
        if r.status_code != 200:
            return slug, [], f"HTTP {r.status_code}"
        imgs = extract(r.text)
    except Exception as e:
        return slug, [], f"fetch-fout: {e}"
    outdir = os.path.join(PUBLIC_IMG, *slug.split("/"))
    entries = []
    for iurl, alt in imgs:
        try:
            resp = requests.get(iurl, headers=UA, timeout=40)
            if resp.status_code != 200:
                continue
            im = Image.open(io.BytesIO(resp.content)).convert("RGB")
            if im.width > MAX_W:
                im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
            os.makedirs(outdir, exist_ok=True)
            fname = basename(iurl)
            im.save(os.path.join(outdir, fname), "JPEG", quality=82, optimize=True)
            entries.append({"src": f"/afbeeldingen/{slug}/{fname}", "alt": alt, "w": im.width, "h": im.height})
        except Exception:
            continue
    return slug, entries, None

def main():
    sl = slugs()
    manifest, errors, total = {}, [], 0
    with ThreadPoolExecutor(max_workers=12) as ex:
        for slug, entries, err in ex.map(process, sl):
            if err:
                errors.append(f"{slug}: {err}")
            if entries:
                manifest[slug] = entries
                total += len(entries)
    with open(os.path.join(ROOT, "_workflows", "images-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    print(f"Pagina's met afbeeldingen: {len(manifest)}/{len(sl)}")
    print(f"Totaal afbeeldingen gedownload: {total}")
    if errors:
        print(f"Fouten ({len(errors)}):")
        for e in errors[:20]:
            print("  -", e)

if __name__ == "__main__":
    main()
