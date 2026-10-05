"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { entityHref } from "@/data/entities";

// Göksel bağlantı ağı — tanrı düzeyindeki varlıklar.
// Hiyerarşi: Tengri → Kayra Han → Ülgen / Erlik / Mergen → Umay ve Ülgen'in oğulları.
// `slug` olan düğümler varlık görselini gösterir ve tıklanınca varlık sayfasına gider.
const NODES = [
  // ZİRVE
  { id: "tengri", x: 400, y: 56, color: "#87CEEB" },

  // Kayra Han ve oğlu Mergen
  { id: "kayra", slug: "kayra-han", img: "kayra-han", x: 400, y: 170, color: "#F5D16B" },
  { id: "mergen", slug: "mergen", img: "mergen", x: 640, y: 170, color: "#5DADE2" },

  // Ülgen ve Umay
  { id: "ulgen", slug: "ulgen", img: "ulgen", x: 190, y: 290, color: "#2E5FA1" },
  { id: "umay", slug: "umay-ana", img: "umay-ana", x: 640, y: 300, color: "#DDA0DD" },

  // Ülgen'in oğulları
  { id: "kyzagan", slug: "kyzagan", img: "kyzagan", x: 80, y: 430, color: "#FF6347" },
  { id: "bai-ulgen", x: 290, y: 430, color: "#DAA520" },

  // YERALTI — Kayra Han'ın sürgün ettiği Erlik
  { id: "erlik", slug: "erlik-han", img: "erlik-han", x: 460, y: 430, color: "#DC143C" },
];

const NODES_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

const LINKS = [
  { source: "tengri", target: "kayra" },

  // Kayra Han'ın oğulları
  { source: "kayra", target: "ulgen" },
  { source: "kayra", target: "erlik" },
  { source: "kayra", target: "mergen" },

  // Ülgen'in dallanması
  { source: "ulgen", target: "umay" },
  { source: "ulgen", target: "kyzagan" },
  { source: "ulgen", target: "bai-ulgen" },
];

const R = 34;

export default function NexusWeb() {
  const { t } = useTranslation();
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState(null);

  const isLinkActive = (link) => hoveredId && (link.source === hoveredId || link.target === hoveredId);

  const isConnected = (nodeId) =>
    !hoveredId ||
    nodeId === hoveredId ||
    LINKS.some(
      (l) =>
        (l.source === hoveredId && l.target === nodeId) ||
        (l.target === hoveredId && l.source === nodeId)
    );

  const open = (node) => {
    if (node.slug) router.push(entityHref(node.slug));
  };

  return (
    <svg className="nexus-svg" viewBox="0 0 760 520" role="img" aria-label={t("familyTree.title")}>
      <defs>
        {NODES.filter((n) => n.img).map((n) => (
          <clipPath key={n.id} id={`nexus-clip-${n.id}`}>
            <circle cx={n.x} cy={n.y} r={R - 3} />
          </clipPath>
        ))}
      </defs>
      <g>
        {LINKS.map((link) => {
          const src = NODES_BY_ID[link.source];
          const tgt = NODES_BY_ID[link.target];
          const active = isLinkActive(link);
          return (
            <line
              key={`${link.source}-${link.target}`}
              className={`nexus-link${active ? " active" : ""}`}
              x1={src.x}
              y1={src.y}
              x2={tgt.x}
              y2={tgt.y}
              style={hoveredId && !active ? { opacity: 0.1 } : {}}
            />
          );
        })}
      </g>
      <g>
        {NODES.map((node) => {
          const label = t(`nexusLabels.${node.id}`);
          return (
            <g
              key={node.id}
              className={`nexus-node${node.slug ? " has-link" : ""}`}
              style={hoveredId ? { opacity: isConnected(node.id) ? 1 : 0.2 } : {}}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => open(node)}
              onKeyDown={(e) => {
                if (e.key === "Enter") open(node);
              }}
              role={node.slug ? "link" : undefined}
              tabIndex={node.slug ? 0 : undefined}
              aria-label={label}
            >
              <circle cx={node.x} cy={node.y} r={R + 5} fill="none" stroke={node.color} strokeWidth="1.5" opacity="0.45" />
              <circle cx={node.x} cy={node.y} r={R} fill={node.color} opacity="0.85" />
              {node.img ? (
                <image
                  href={`/images/${node.img}.webp`}
                  x={node.x - R}
                  y={node.y - R}
                  width={R * 2}
                  height={R * 2}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#nexus-clip-${node.id})`}
                />
              ) : (
                <text
                  x={node.x}
                  y={node.y + 7}
                  textAnchor="middle"
                  fill="#080808"
                  fontFamily="var(--font-display)"
                  fontSize="20"
                  fontWeight="700"
                >
                  {label[0]}
                </text>
              )}
              <text
                className="nexus-label"
                x={node.x}
                y={node.y + R + 24}
                textAnchor="middle"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
