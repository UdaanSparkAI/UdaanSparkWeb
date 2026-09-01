import type { Metadata } from "next";
import { BRAND, STORE_LIST } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  const pageDescription =
    description ??
    `YUKTA AI compares grocery prices across ${STORE_LIST} so you always get the best deal. Shop smarter and save money on every order.`;
  const url = `${BRAND.siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(BRAND.siteUrl),
    alternates: {
      canonical: url,
    },
    // Points at the generated OG image from app/opengraph-image.tsx rather than a static
    // file. Defining `openGraph` here replaces the inherited object wholesale, so the
    // image has to be named explicitly — omitting it leaves the page with no og:image,
    // and the previous /og-image.png it pointed at never existed.
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: BRAND.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${BRAND.name} — ${BRAND.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/opengraph-image"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
