import Link from "next/link";

export const metadata = {
  title: "Sayfa Bulunamadı — The Infinite Cycle",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 20px",
        gap: "20px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-rune)",
          fontSize: "clamp(4rem, 12vw, 8rem)",
          color: "var(--celestial-gold)",
          lineHeight: 1,
        }}
      >
        𐱅
      </span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "var(--text-primary)",
        }}
      >
        Bu döngünün bir parçası değil
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: 480 }}>
        Aradığınız sayfa kaybolmuş ya da hiç var olmamış. Sonsuz Döngü&apos;ye geri dönelim.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "10px",
          padding: "12px 28px",
          border: "1px solid var(--celestial-gold)",
          color: "var(--celestial-gold-bright)",
          textDecoration: "none",
          borderRadius: "4px",
          fontSize: "0.9rem",
          letterSpacing: "0.05em",
          transition: "all 0.3s",
        }}
      >
        ← Ana Sayfaya Dön
      </Link>
    </div>
  );
}
