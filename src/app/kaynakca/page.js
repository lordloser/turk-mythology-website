import { pageMetadata } from "@/site";
import SourcesView from "./SourcesView";

export const metadata = pageMetadata({
  title: "Kaynakça ve Okumalar",
  description:
    "Türk mitolojisi için başlıca kaynaklar: Orhun Yazıtları, Dîvânu Lugâti't-Türk, Oğuz Kağan Destanı, Dede Korkut ve Bahaeddin Ögel, Abdülkadir İnan, Jean-Paul Roux gibi araştırmacıların eserleri.",
  path: "/kaynakca",
});

export default function KaynakcaPage() {
  return <SourcesView />;
}
