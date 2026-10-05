import { notFound } from "next/navigation";
import { ENTITIES, ENTITIES_BY_SLUG } from "@/data/entities";
import { trText, truncate } from "@/data/text";
import { pageMetadata } from "@/site";
import EntityView from "./EntityView";

export const dynamicParams = false;

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entity = ENTITIES_BY_SLUG[slug];
  if (!entity) return {};
  const name = trText(entity.name);
  const type = trText(entity.type);
  return pageMetadata({
    title: `${name} — ${type}`,
    description: truncate(trText(entity.desc)),
    path: `/varlik/${slug}`,
    image: `/images/${entity.img}.webp`,
    type: "article",
  });
}

export default async function EntityPage({ params }) {
  const { slug } = await params;
  if (!ENTITIES_BY_SLUG[slug]) notFound();
  return <EntityView slug={slug} />;
}
