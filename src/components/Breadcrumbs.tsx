// Zichtbare broodkruimels. De bijhorende BreadcrumbList JSON-LD komt uit jsonld.ts.

import Link from "next/link";
import type { Breadcrumb } from "@/lib/types";

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((b, i) => {
          const last = i === items.length - 1;
          const href = b.slug ? `/${b.slug}` : "/";
          return (
            <li key={href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-brand-800">
                  {b.name}
                </span>
              ) : (
                <>
                  <Link href={href} className="hover:text-brand-700 hover:underline">
                    {b.name}
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
