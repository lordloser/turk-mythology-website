// TODO: Production domain belirlenince güncelle.
const BASE_URL = "https://example.com";

export const dynamic = "force-static";

const ROUTES = [
  "",
  "/sozluk",
  "/soy-agaci",
  "/yeralti-varliklari",
  "/sagas/asena",
  "/sagas/ergenekon",
  "/sagas/goc",
  "/sagas/manas",
  "/sagas/oghuz",
];

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
