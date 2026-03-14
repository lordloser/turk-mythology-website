"use client";

export default function FooterSection({ t }) {
  return (
    <footer
      className="influence-map"
      style={{
        padding: "80px 20px",
        background: "var(--bg-dark)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 className="heading-lg" style={{ color: "var(--celestial-gold)", marginBottom: "40px" }}>
        {t("footer.influenceMap.title", "Divine Influence Map")}
      </h2>
      <svg
        viewBox="0 0 1000 600"
        style={{ width: "100%", maxWidth: "800px", height: "auto", margin: "0 auto" }}
      >
        {/* Central Node */}
        <g className="inf-node" transform="translate(500, 100)">
          <circle r="30" fill="var(--celestial-gold-bright)" className="pulse-hover" />
          <text
            y="50"
            fill="var(--celestial-gold)"
            fontSize="14"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            {t("pantheon.kayra.name")}
          </text>
        </g>
        {/* Links */}
        <path d="M500,130 L300,300" stroke="var(--border-glow)" strokeWidth="2" className="inf-link" />
        <path d="M500,130 L700,300" stroke="var(--border-glow)" strokeWidth="2" className="inf-link" />
        <path
          d="M300,340 L500,500"
          stroke="rgba(220, 20, 60, 0.4)"
          strokeWidth="2"
          className="inf-link"
          strokeDasharray="5,5"
        />
        <path
          d="M700,340 L500,500"
          stroke="rgba(46, 95, 161, 0.4)"
          strokeWidth="2"
          className="inf-link"
        />
        {/* Sub Nodes */}
        <g className="inf-node" transform="translate(300, 320)">
          <circle r="20" fill="var(--abyss-crimson)" />
          <text
            y="40"
            fill="var(--text-primary)"
            fontSize="12"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            {t("shadow.erlikTitle")}
          </text>
        </g>
        <g className="inf-node" transform="translate(700, 320)">
          <circle r="20" fill="var(--celestial-azure-light)" />
          <text
            y="40"
            fill="var(--text-primary)"
            fontSize="12"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            {t("pantheon.ulgen.name")}
          </text>
        </g>
        <g className="inf-node" transform="translate(500, 520)">
          <circle r="15" fill="var(--steppe-emerald-light)" />
          <text
            y="35"
            fill="var(--text-primary)"
            fontSize="12"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            {t("footer.influenceMap.humanity", "Humanity")}
          </text>
        </g>
      </svg>
      <div
        style={{
          marginTop: 80,
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        {t("footer.copyright", "© 2026 The Infinite Cycle. All realms reserved.")} •{" "}
        <a href="#">{t("footer.source", "Mythological Sources")}</a>
      </div>
    </footer>
  );
}
