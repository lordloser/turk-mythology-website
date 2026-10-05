/* Sitenin genel ayarları. Yayındaki alan adı değişirse sadece SITE_URL'i güncelle
   (veya build sırasında NEXT_PUBLIC_SITE_URL ortam değişkenini ver). */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://turkmitoloji.netlify.app"
).replace(/\/$/, "");

export const SITE_NAME = "Sonsuz Döngü — Türk Mitolojisi";
export const SITE_NAME_EN = "The Infinite Cycle";
export const DEFAULT_DESCRIPTION =
    "Türk mitolojisine sinematik bir yolculuk: Gök Tengri kozmolojisi, Bayterek, tanrılar, yaratıklar, iyeler ve destanlar. Ülgen, Erlik Han, Umay Ana, Asena, Tulpar ve daha fazlası.";
export const OG_IMAGE = "/og.jpg";

/* Alt sayfalar için ortak metadata üretici (layout.js / page.js içinde kullanılır) */
export function pageMetadata({ title, description = DEFAULT_DESCRIPTION, path, image = OG_IMAGE, type = "website" }) {
    const images = [{ url: image, alt: title }];
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type,
            locale: "tr_TR",
            alternateLocale: ["en_US"],
            siteName: SITE_NAME,
            title,
            description,
            url: path,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}
