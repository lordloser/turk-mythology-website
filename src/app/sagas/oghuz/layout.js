import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Oğuz Kağan Destanı",
  description: "Gökten inen ışıkla doğan, gök kurdun yol gösterdiği ve dünyayı fethe çıkan Oğuz Kağan'ın destanı.",
  path: "/sagas/oghuz",
  image: "/images/oghuz-khagan.webp",
});

export default function Layout({ children }) {
  return children;
}
