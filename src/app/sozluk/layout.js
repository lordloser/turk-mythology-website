import { pageMetadata } from "@/site";

export const metadata = pageMetadata({
  title: "Türk Mitolojisi Sözlüğü",
  description: "Kut, Tengri, Kam, Yer-Sub, Tamag ve daha fazlası: Türk mitolojisinin temel kavramlarının kısa açıklamaları.",
  path: "/sozluk",
});

export default function Layout({ children }) {
  return children;
}
