export const meta = {
  name: 'place-images',
  description: 'Plaats gemigreerde sectie-afbeeldingen op de juiste plek in multi-image MDX-pagina\'s',
  phases: [{ title: 'Plaatsen', detail: 'per pagina afbeeldingen bij de best passende kop invoegen' }],
}

let items = args
if (typeof items === 'string') { try { items = JSON.parse(items) } catch { items = [] } }
if (!Array.isArray(items)) items = []
if (!items.length) throw new Error('Geen paginas meegegeven via args.')

function snippet(img, hero) {
  const alt = String(img.alt).replace(/"/g, "'")
  return `<Afbeelding src="${img.src}" alt="${alt}" w={${img.w}} h={${img.h}}${hero ? ' hero' : ''} />`
}

function prompt(page) {
  const imgs = page.images
  const lines = imgs.map((im, i) => `  ${i + 1}. ${i === 0 ? '[HERO] ' : ''}alt="${im.alt}" -> ${snippet(im, i === 0)}`).join('\n')
  return `Voeg gemigreerde afbeeldingen in in een bestaand MDX-bestand. Lees eerst het bestand: ${page.file}

Beschikbare afbeeldingen (in originele volgorde), met de exacte component-snippet die je moet invoegen:
${lines}

PLAATSINGSREGELS:
- Afbeelding 1 is de HERO: voeg de snippet in NA de intro-alinea en VOOR de eerste "## "-heading. Gebruik exact de [HERO]-snippet (met het hero-attribuut).
- Elke volgende afbeelding: voeg de snippet in op een eigen regel DIRECT NA de "## "-heading (H2) waarvan het onderwerp het best past bij de alt-tekst van die afbeelding. Match op betekenis (bijv. alt "Welke attesten zijn verplicht" hoort bij de heading over verplichte attesten).
- Maximaal een afbeelding per heading. Zijn er meer afbeeldingen dan passende H2's, verdeel de resterende dan in volgorde over de overige H2's.
- Voeg elke afbeelding exact een keer toe. Gebruik letterlijk de meegegeven snippet-strings (niets aan de src, alt, w of h wijzigen).
- Verander NIETS anders aan de content. Voeg NOOIT een em-dash of en-dash toe. Zet een lege regel voor en na elke ingevoegde snippet.

Bewerk het bestand met de Edit- of Write-tool. Retourneer daarna een korte regel: "OK ${page.slug}" en per afbeelding onder welke heading je ze plaatste.`
}

phase('Plaatsen')
const results = await parallel(
  items.map((page) => () =>
    agent(prompt(page), { label: `beeld:${page.slug}`, phase: 'Plaatsen', agentType: 'general-purpose' }),
  ),
)
log(`Afbeeldingen geplaatst op ${results.filter(Boolean).length}/${items.length} paginas.`)
return { done: results.filter(Boolean).length, total: items.length }
