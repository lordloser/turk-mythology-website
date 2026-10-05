import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Manas Destanı",
  description: "Kırgızların büyük kahramanı Manas'ın doğumu, savaşları ve halkını birleştirmesinin dünyanın en uzun destanlarından birindeki anlatımı.",
  path: "/sagas/manas",
  image: "/images/manas.webp",
});

export default function Layout({ children }) {
  return children;
}
