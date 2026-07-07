import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
import { actieveCategorieen } from "@/lib/woningen";
import { globalGraph } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.domain,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Listing-links (Huis/Appartement te koop) enkel tonen als er panden zijn.
  const nav = [
    ...actieveCategorieen().map((c) => ({ label: c.label, href: `/${c.prefix}` })),
    ...site.nav,
  ];
  return (
    <html lang={site.lang} className={`h-full ${jakarta.variable}`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-brand-900 antialiased">
        <JsonLd data={globalGraph()} />
        <Header nav={nav} />
        <div className="flex-1">{children}</div>
        <Footer />
        {/* Elfsight-platform voor het leadformulier (site-breed) */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
