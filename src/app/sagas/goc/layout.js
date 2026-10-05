import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Türeyiş ve Göç Destanları",
  description: "Türeyiş ve göç destanları: Gökbörü'nün rehberliğinde demir dağların ve sonsuz bozkırların ötesine, esaretten kurtuluşa uzanan yolculuk.",
  path: "/sagas/goc",
  image: "/images/migration-1.webp",
});

export default function Layout({ children }) {
  return children;
}
