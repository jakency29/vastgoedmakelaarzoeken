type MdxParts = {
  intro: string | null;
  rest: string;
};

const BLOCK_START = /^(?:#{1,6}\s|<[A-Z][A-Za-z0-9]*\b|\|)/;

// Haal alleen de vrije openingsalinea's uit MDX. De eerste heading, custom component
// of tabel blijft in de gewone body staan.
export function splitMdxIntro(body: string): MdxParts {
  const source = body.trimStart();
  const lines = source.split(/\r?\n/);
  const blockIndex = lines.findIndex((line) => BLOCK_START.test(line.trimStart()));

  if (blockIndex <= 0) {
    return { intro: null, rest: body };
  }

  const intro = lines.slice(0, blockIndex).join("\n").trim();
  const rest = lines.slice(blockIndex).join("\n").trimStart();

  if (!intro || !rest) {
    return { intro: null, rest: body };
  }

  return { intro, rest };
}
