import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Ergenekon Destanı",
  description: "Demir dağlarla çevrili Ergenekon'a sığınan Türklerin dört yüz yıl sonra dağı eritip bozkurt rehberliğinde yeniden dünyaya çıkışının destanı.",
  path: "/sagas/ergenekon",
  image: "/images/ergenekon.webp",
});

export default function Layout({ children }) {
  return children;
}
