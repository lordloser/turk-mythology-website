import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Tanrılar Soy Ağacı",
  description: "Kayra Han, Ülgen, Erlik Han ve Ülgen'in oğulları: Türk mitolojisindeki tanrıların ve varlıkların birbirleriyle ilişkilerini gösteren soy ağacı.",
  path: "/soy-agaci",
});

export default function Layout({ children }) {
  return children;
}
