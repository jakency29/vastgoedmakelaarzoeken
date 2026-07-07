# Importeert We Invest-panden (server-rendered detailpagina's) naar src/data/woningen.json
# en downloadt de foto's naar public/afbeeldingen/woningen/<id>/. Herbruikbaar: vul URLS aan.
# Haalt ook EPC/energie, indeling, eigenschappen en stedenbouw uit de detaildata.

import os, re, io, json, html, urllib.request, gzip
from collections import defaultdict
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMGDIR = os.path.join(ROOT, "public", "afbeeldingen", "woningen")
UA = {"User-Agent": "Mozilla/5.0"}
MAX_PHOTOS = 12
MAX_W = 1200

SOURCES = {
    "we-invest-demervallei": [
        "https://weinvest.be/nl-BE/property/for-sale/beringen/house/166222",
        "https://weinvest.be/nl-BE/property/for-sale/herk-de-stad/house/164431",
        "https://weinvest.be/nl-BE/property/for-sale/lummen/house/165685",
    ],
}

COND = {"to_renovate": "Te renoveren", "to_refresh": "Op te frissen", "good": "Goede staat",
        "excellent": "Uitstekende staat", "as_new": "Zo goed als nieuw", "new": "Nieuw"}
TYPE = {"house": "Huis", "apartment": "Appartement", "flat_studio": "Studio", "land": "Bouwgrond",
        "office": "Kantoor", "commercial": "Handelspand"}
SPACE = {"bed_room": "Slaapkamer", "bath_room": "Badkamer", "shower_room": "Douchekamer", "toilet": "Toilet",
         "kitchen": "Keuken", "living_room": "Woonkamer", "dining_room": "Eetkamer", "laundry_room": "Wasplaats",
         "cellar": "Kelder", "attic": "Zolder", "garden": "Tuin", "terrace": "Terras", "garage": "Garage",
         "parking": "Parkeerplaats", "carport": "Carport", "office": "Bureau", "veranda": "Veranda",
         "dressing": "Dressing", "entrance_hall": "Inkomhal", "night_hall": "Nachthal", "living": "Leefruimte",
         "garden_house": "Tuinhuis"}
LAND = {"RURAL_RESIDENTIAL_AREA": "Woongebied met landelijk karakter", "RESIDENTIAL_AREA": "Woongebied",
        "RECREATION_AREA": "Recreatiegebied", "AGRICULTURAL_AREA": "Agrarisch gebied", "INDUSTRIAL_AREA": "Industriegebied"}
FLOOD = {"NOT_FLOOD_AREA": "Niet in overstromingsgevoelig gebied", "POSSIBLE_FLOOD_AREA": "Mogelijk overstromingsgevoelig",
         "EFFECTIVE_FLOOD_AREA": "Effectief overstromingsgevoelig"}
PARKING_TYPES = {"garage", "parking", "carport"}

def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=45)
    d = r.read()
    if r.headers.get("Content-Encoding") == "gzip":
        d = gzip.decompress(d)
    return d

def nl(d):
    return (d.get("nl") or d.get("nl-BE") or next(iter(d.values()), "")) if isinstance(d, dict) else (d or "")

def clean(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = html.unescape(s).replace("—", " ").replace("–", "-")
    return re.sub(r"\s+", " ", s).strip()

def slugify(s):
    s = s.lower().replace("é", "e").replace("è", "e").replace("ë", "e").replace("ï", "i").replace("ç", "c")
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s)).strip("-")

def main():
    out = []
    for kantoor, urls in SOURCES.items():
        for u in urls:
            try:
                h = get(u).decode("utf-8", "replace")
                pp = json.loads(re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', h, re.S).group(1))["props"]["pageProps"]
                p, loc, cb = pp["property"], pp.get("location", {}), pp.get("property", {}).get("complianceBe", {}) or {}
            except Exception as e:
                print("FOUT", u, e); continue
            pid = str(p["id"])
            prov = re.sub(r"^Provincie\s+", "", nl(loc.get("beProvince", {}).get("name", {}))) or "Limburg"
            gemeente = nl(loc.get("beMunicipality", {}).get("name", {})) or p.get("city", "")
            adres = f"{p.get('street','').strip()} {p.get('number','') or ''}".strip()
            title = adres or TYPE.get(p.get("typeUID"), "Woning")

            # indeling (ruimtes gegroepeerd)
            groups = defaultdict(lambda: {"aantal": 0, "opp": 0})
            for s in p.get("spaces", []):
                g = groups[s.get("type")]
                g["aantal"] += 1
                if s.get("area"):
                    g["opp"] += s["area"]
            indeling = [{"label": SPACE.get(t, t), "aantal": g["aantal"], "opp": g["opp"] or None}
                        for t, g in groups.items() if t]
            bed = p.get("bedroomCount") or groups.get("bed_room", {}).get("aantal", 0)
            parking = sum(g["aantal"] for t, g in groups.items() if t in PARKING_TYPES)

            eigenschappen = [nl(f.get("name", {})) for f in p.get("features", []) if nl(f.get("name", {}))]
            uids = {f.get("uid") for f in p.get("features", [])}

            # troeven (feitelijke troeven, geen verzonnen claims)
            troeven = []
            if p.get("landArea") and p["landArea"] >= 500:
                troeven.append(f"Ruim perceel van {int(p['landArea'])} m2")
            if "garden" in groups:
                troeven.append("Tuin")
            if "terrace" in groups:
                troeven.append("Terras")
            if "fireplace" in uids:
                troeven.append("Open haard")
            if parking:
                troeven.append("Parkeergelegenheid")
            if bed and bed >= 4:
                troeven.append(f"{bed} slaapkamers")
            if "glazing_double" in uids:
                troeven.append("Dubbele beglazing")

            # foto's (skip als al aanwezig)
            pics = sorted(p.get("pictures", []), key=lambda x: x.get("ordinal", 0))[:MAX_PHOTOS]
            outdir = os.path.join(IMGDIR, pid)
            photo_paths = []
            for i, pic in enumerate(pics, 1):
                dest = os.path.join(outdir, f"{i}.jpg")
                if os.path.exists(dest):
                    photo_paths.append(f"/afbeeldingen/woningen/{pid}/{i}.jpg"); continue
                try:
                    im = Image.open(io.BytesIO(get(pic["url"]))).convert("RGB")
                    if im.width > MAX_W:
                        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
                    os.makedirs(outdir, exist_ok=True)
                    im.save(dest, "JPEG", quality=80, optimize=True)
                    photo_paths.append(f"/afbeeldingen/woningen/{pid}/{i}.jpg")
                except Exception:
                    continue

            out.append({
                "id": pid, "kantoorSlug": kantoor,
                "transactie": "te-koop" if p.get("transactionType") == "for-sale" else "te-huur",
                "type": TYPE.get(p.get("typeUID"), "Woning"), "typeUID": p.get("typeUID"),
                "titel": title, "adres": adres, "gemeente": gemeente, "gemeenteSlug": slugify(gemeente),
                "postcode": str(p.get("postalCode") or ""), "provincie": prov, "provincieSlug": slugify(prov),
                "prijs": p.get("priceAsAdvertised"), "bewoonbaar": p.get("livableArea"), "grond": p.get("landArea"),
                "slaapkamers": bed, "gevels": p.get("facadeCount"), "bouwjaar": p.get("constructionYear"),
                "staat": COND.get(p.get("generalCondition"), ""),
                "parkeerplaatsen": parking,
                "epcLabel": (cb.get("energyCertificateScore") or "").upper() or None,
                "epcVerbruik": cb.get("yearlySpecificEnergyConsumptionPerSqm"),
                "epcCode": cb.get("energyCertificateCode"),
                "renovatieplicht": cb.get("hasRenovationObligation"),
                "kadastraalInkomen": cb.get("cadastralIncome"),
                "bestemming": LAND.get(cb.get("landDesignation"), ""),
                "overstroming": FLOOD.get(cb.get("floodingAreaType"), ""),
                "vergunning": bool(cb.get("hasBuildingPermission")),
                "indeling": indeling, "eigenschappen": eigenschappen, "troeven": troeven[:6],
                "geoLat": p.get("geoLat"), "geoLng": p.get("geoLong"),
                "beschrijving": clean(nl(p.get("description", {}))),
                "fotos": photo_paths, "bron": u,
                "slug": f"{slugify(title + ' ' + gemeente)}-{pid}",
            })
            print(f"OK {pid} {gemeente} EPC {out[-1]['epcLabel']} | {len(indeling)} ruimtes | {len(eigenschappen)} kenmerken | {len(photo_paths)} foto's")
    out.sort(key=lambda r: (r["provincie"], r["gemeente"]))
    os.makedirs(os.path.join(ROOT, "src", "data"), exist_ok=True)
    with open(os.path.join(ROOT, "src", "data", "woningen.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"\n{len(out)} woningen -> src/data/woningen.json")

if __name__ == "__main__":
    main()
