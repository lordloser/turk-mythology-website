import { pageMetadata } from "@/site";
import CosmosView from "./CosmosView";

export const metadata = pageMetadata({
  title: "Kozmoloji Haritası: Gök, Yer ve Yeraltı",
  description:
    "Eski Türk inancında üç dünya: 17 katlı gök, insanların yurdu Yer-Sub ve Erlik Han'ın yeraltı ülkesi Tamag. Bayterek'in bağladığı katmanları ve varlıklarını etkileşimli haritada keşfet.",
  path: "/kozmoloji",
});

export default function KozmolojiPage() {
  return <CosmosView />;
}
