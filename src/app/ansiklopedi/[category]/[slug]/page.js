import { CREATURES, DEITIES } from "../../../../data/mythology";
import trData from "../../../../locales/tr.json";
import Link from 'next/link';
import ClientLoreView from "./ClientLoreView";

export async function generateStaticParams() {
  const paths = [];
  
  // Add all creatures under 'yaratiklar' category
  CREATURES.forEach(c => {
    paths.push({ category: 'yaratiklar', slug: c.id });
  });

  // Add all deities under 'tanrilar' category
  DEITIES.forEach(d => {
    paths.push({ category: 'tanrilar', slug: d.id });
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  
  // Map category to the key in tr.json
  const jsonKey = category === 'yaratiklar' ? 'bestiary' : 'pantheon';
  const entityData = trData[jsonKey][slug];

  if (!entityData) {
    return { title: 'Bulunamadı - Türk Mitolojisi' };
  }

  const title = `${entityData.name} - Türk Mitolojisi Ansiklopedisi`;
  const description = entityData.desc;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://turkmitolojisi.com/ansiklopedi/${category}/${slug}`,
      images: [
        {
          url: `/images/${slug}.png`, // Assuming image name matches slug logic. Actually it matches data.img but we don't have the object here unless we find it.
          width: 800,
          height: 600,
          alt: entityData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/${slug}.png`],
    }
  };
}

export default async function EntityPage({ params }) {
  const { category, slug } = await params;
  
  // Find the exact object from arrays to get the image correctly
  let baseData = null;
  if(category === 'yaratiklar') {
    baseData = CREATURES.find(c => c.id === slug);
  } else {
    baseData = DEITIES.find(d => d.id === slug);
  }

  const jsonKey = category === 'yaratiklar' ? 'bestiary' : 'pantheon';
  const textData = trData[jsonKey][slug];

  if (!textData || !baseData) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexDirection: "column" }}>
        <h1>Varlık Bulunamadı</h1>
        <Link href="/" style={{ color: "var(--celestial-gold)", marginTop: "20px" }}>Ana Sayfaya Dön</Link>
      </div>
    );
  }

  // Combine data
  const fullData = {
    ...baseData,
    ...textData,
    typeId: baseData.type || baseData.role // role for deities
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-dark)" }}>
       <ClientLoreView data={fullData} category={category} slug={slug} />
    </main>
  );
}
