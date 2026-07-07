export const meta = {
  name: 'extract-kantoren',
  description: 'Haal gestructureerde kantoordata op van de live /kantoor/-detailpagina\'s',
  phases: [{ title: 'Extractie', detail: 'per kantoor de detailpagina ophalen en velden extraheren' }],
}

let items = args
if (typeof items === 'string') { try { items = JSON.parse(items) } catch { items = [] } }
if (!Array.isArray(items) || !items.length) throw new Error('Geen kantoren meegegeven via args.')

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    naam: { type: 'string' },
    gemeente: { type: 'string' },
    provincie: { type: 'string' },
    adres: { type: 'string' },
    postcode: { type: 'string' },
    telefoon: { type: 'string' },
    email: { type: 'string' },
    website: { type: 'string' },
    bivNummer: { type: 'string' },
    intro: { type: 'string' },
    diensten: { type: 'array', items: { type: 'string' } },
    regios: { type: 'array', items: { type: 'string' } },
    fotoUrl: { type: 'string' },
  },
  required: ['slug', 'naam', 'gemeente', 'provincie', 'intro', 'diensten', 'regios'],
}

function prompt(item) {
  return `Haal de vastgoedkantoor-detailpagina op en extraheer de gestructureerde data. URL: ${item.url}
Gebruik WebFetch. Vul het gestructureerde object in:
- slug: "${item.slug}" (letterlijk overnemen)
- naam: de officiele kantoornaam
- gemeente en provincie (Vlaamse provincie: Antwerpen, Limburg, Oost-Vlaanderen, Vlaams-Brabant of West-Vlaanderen; leid af uit adres/werkingsgebied)
- adres (straat + nummer), postcode, telefoon, email, website, bivNummer (BIV-erkenningsnummer) indien vermeld; anders lege string
- diensten: lijst van aangeboden diensten (bijv. "Woning verkopen", "Verhuur", "Schatting")
- regios: lijst van gebieden of gemeenten waar het kantoor actief is
- fotoUrl: de URL van de kantoorfoto onder wp-content/uploads (NIET het logo van Vastgoedmakelaar Zoeken); anders lege string
- intro: HERSCHRIJF een korte, feitelijke omschrijving van 2 zinnen in het Nederlands. GEEN em-dashes of en-dashes, GEEN onverifieerbare superlatieven of verzonnen cijfers. Beschrijf locatie, kernactiviteit en werkingsgebied. Neem geen ongefundeerde claims over.

Retourneer enkel het gestructureerde object.`
}

phase('Extractie')
const results = await parallel(
  items.map((item) => () =>
    agent(prompt(item), { label: `kantoor:${item.slug}`, phase: 'Extractie', agentType: 'general-purpose', schema: SCHEMA }),
  ),
)
const kantoren = results.filter(Boolean)
log(`${kantoren.length}/${items.length} kantoren geextraheerd.`)
return kantoren
