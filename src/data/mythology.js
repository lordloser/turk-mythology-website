/* Ana sayfa bölümlerinde (Panteon, Bestiary) gösterilen varlıklar.
   `slug`, /varlik/[slug] detay sayfasının adresidir (src/data/entities.js). */

export const DEITIES = [
  { id: "akAna", slug: "ak-ana", img: "ak-ana", realm: "sky", category: "creators" },
  { id: "kayra", slug: "kayra-han", img: "kayra-han", realm: "sky", category: "creators" },
  { id: "ulgen", slug: "ulgen", img: "ulgen", realm: "sky", category: "gods" },
  { id: "mergen", slug: "mergen", img: "mergen", realm: "sky", category: "wisdom" },
  { id: "umay", slug: "umay-ana", img: "umay-ana", realm: "earth", category: "guardians" },
  { id: "kyzagan", slug: "kyzagan", img: "kyzagan", realm: "earth", category: "war" },
  { id: "erlik", slug: "erlik-han", img: "erlik-han", realm: "underworld", category: "gods" },
];

export const CREATURES = [
  { id: "bukre", slug: "bukre", img: "bukre-dragon", realm: "sky", type: "guardian" },
  { id: "itbarak", slug: "itbarak", img: "itbarak", realm: "earth", type: "warrior" },
  { id: "tulpar", slug: "tulpar", img: "tulpar", realm: "sky", type: "mount" },
  { id: "tepegoz", slug: "tepegoz", img: "tepegoz", realm: "earth", type: "monstrosity" },
  { id: "arcura", slug: "arcura", img: "arcura", realm: "earth", type: "spirit" },
  { id: "asena", slug: "asena", img: "asena", realm: "earth", type: "divine" },
  { id: "alkarisi", slug: "alkarisi", img: "alkarisi", realm: "underworld", type: "malevolent" },
  { id: "kayberen", slug: "kayberen", img: "kayberen", realm: "earth", type: "spirit" },
  { id: "azmic", slug: "azmic", img: "azmic", realm: "earth", type: "malevolent" },
  { id: "jeztirnak", slug: "jeztirnak", img: "jeztirnak", realm: "earth", type: "malevolent" },
  { id: "abasi", slug: "abasi", img: "abasi", realm: "underworld", type: "malevolent" },
  { id: "yegi", slug: "yegi", img: "yegi", realm: "underworld", type: "malevolent" },
  { id: "kamos", slug: "kamos", img: "kamos", realm: "underworld", type: "malevolent" },
];
