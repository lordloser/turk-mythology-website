import { SITE_URL } from "@/site";
import { ENTITIES } from "@/data/entities";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/kozmoloji", priority: 0.9 },
  { path: "/sagas/ergenekon", priority: 0.8 },
  { path: "/sagas/oghuz", priority: 0.8 },
  { path: "/sagas/asena", priority: 0.8 },
  { path: "/sagas/manas", priority: 0.8 },
  { path: "/sagas/goc", priority: 0.7 },
  { path: "/yeralti-varliklari", priority: 0.7 },
  { path: "/sozluk", priority: 0.7 },
  { path: "/soy-agaci", priority: 0.7 },
  { path: "/kaynakca", priority: 0.6 },
];

export default function sitemap() {
  const now = new Date();
  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
    })),
    ...ENTITIES.map((e) => ({
      url: `${SITE_URL}/varlik/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${SITE_URL}/images/${e.img}.webp`],
    })),
  ];
}
