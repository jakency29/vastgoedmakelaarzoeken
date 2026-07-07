// Rendert een JSON-LD script-tag. Object in, <script type="application/ld+json"> uit.

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
