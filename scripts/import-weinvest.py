# Importeert We Invest-panden (server-rendered detailpagina's) naar src/data/woningen.json
# en downloadt de foto's naar public/afbeeldingen/woningen/<id>/. Herbruikbaar: vul URLS aan.
# Dit is een tussenoplossing tot er een feed is; enkel eigen panden van de partnerkantoren.

import os, re, io, json, html, urllib.request, gzip
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMGDIR = os.path.join(ROOT, "public", "afbeeldingen", "woningen")
UA = {"User-Agent": "Mozilla/5.0"}
MAX_PHOTOS = 12
MAX_W = 1200

# Panden per kantoor (kantoorSlug -> lijst detail-URL's op de eigen site).
SOURCES = {
    "we-invest-demervallei": [
        "https://weinvest.be/nl-BE/property/for-sale/beringen/house/166222",
        "https://weinvest.be/nl-BE/property/for-sale/herk-de-stad/house/164431",
        "https://weinvest.be/nl-BE/property/for-sale/lummen/house/165685",
    ],
}

COND = {
    "to_renovate": "Te renoveren", "to_refresh": "Op te frissen", "good": "Goede staat",
    "excellent": "Uitstekende staat", "as_new": "Zo goed als nieuw", "new": "Nieuw",
}
TYPE = {"house": "Huis", "apartment": "Appartement", "land": "Bouwgrond", "office": "Kantoor", "commercial": "Handelspand"}

def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=45)
    d = r.read()
    if r.headers.get("Content-Encoding") == "gzip":
        d = gzip.decompress(d)
    return d

def nl(d):
    if isinstance(d, dict):
        return d.get("nl") or d.get("nl-BE") or next(iter(d.values()), "")
    return d or ""

def strip_html(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

def slugify(s):
    s = s.lower().replace("é", "e").replace("è", "e").replace("ë", "e").replace("ï", "i").replace("ç", "c")
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s)).strip("-")

def main():
    out = []
    for kantoor, urls in SOURCES.items():
        for u in urls:
            try:
                h = get(u).decode("utf-8", "replace")
                data = json.loads(re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', h, re.S).group(1))
                p = data["props"]["pageProps"]["property"]
                loc = data["props"]["pageProps"].get("location", {})
            except Exception as e:
                print("FOUT", u, e); continue
            pid = str(p["id"])
            prov = re.sub(r"^Provincie\s+", "", nl(loc.get("beProvince", {}).get("name", {}))) or "Limburg"
            gemeente = nl(loc.get("beMunicipality", {}).get("name", {})) or p.get("city", "")
            bed = p.get("bedroomCount")
            if bed is None:
                bed = sum(1 for s in p.get("spaces", []) if "bed" in str(s.get("type", "")).lower())
            adres = f"{p.get('street','').strip()} {p.get('number','') or ''}".strip()
            title = adres or nl(p.get("type", {}).get("name", {}))
            # foto's downloaden
            pics = sorted(p.get("pictures", []), key=lambda x: x.get("ordinal", 0))[:MAX_PHOTOS]
            photo_paths = []
            outdir = os.path.join(IMGDIR, pid)
            for i, pic in enumerate(pics, 1):
                try:
                    im = Image.open(io.BytesIO(get(pic["url"]))).convert("RGB")
                    if im.width > MAX_W:
                        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
                    os.makedirs(outdir, exist_ok=True)
                    im.save(os.path.join(outdir, f"{i}.jpg"), "JPEG", quality=80, optimize=True)
                    photo_paths.append(f"/afbeeldingen/woningen/{pid}/{i}.jpg")
                except Exception:
                    continue
            rec = {
                "id": pid,
                "kantoorSlug": kantoor,
                "transactie": "te-koop" if p.get("transactionType") == "for-sale" else "te-huur",
                "type": TYPE.get(p.get("typeUID"), nl(p.get("type", {}).get("name", {})) or "Woning"),
                "typeUID": p.get("typeUID"),
                "titel": title,
                "adres": adres,
                "gemeente": gemeente,
                "gemeenteSlug": slugify(gemeente),
                "postcode": str(p.get("postalCode") or ""),
                "provincie": prov,
                "provincieSlug": slugify(prov),
                "prijs": p.get("priceAsAdvertised"),
                "bewoonbaar": p.get("livableArea"),
                "grond": p.get("landArea"),
                "slaapkamers": bed,
                "gevels": p.get("facadeCount"),
                "bouwjaar": p.get("constructionYear"),
                "staat": COND.get(p.get("generalCondition"), ""),
                "beschrijving": strip_html(nl(p.get("description", {}))),
                "fotos": photo_paths,
                "bron": u,
                "slug": f"{slugify(title + ' ' + gemeente)}-{pid}",
            }
            out.append(rec)
            print(f"OK {pid} {rec['gemeente']} {rec['prijs']} euro, {len(photo_paths)} foto's")
    out.sort(key=lambda r: (r["provincie"], r["gemeente"]))
    os.makedirs(os.path.join(ROOT, "src", "data"), exist_ok=True)
    with open(os.path.join(ROOT, "src", "data", "woningen.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"\n{len(out)} woningen -> src/data/woningen.json")

if __name__ == "__main__":
    main()
