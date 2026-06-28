"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Göksel bağlantı ağı — yalnızca tanrı düzeyindeki varlıklar
// Hiyerarşi: Tengri → Kayra Han → Ülgen / Erlik / Mergen Han → Umay ve Ülgen oğulları (Mergen, Umay sütununda üstte)

const NODES = [
  // ZİRVE - Üst Dunya
  { id: "tengri", label: "Tengri", x: 400, y: 30, color: "#87CEEB", realm: "sky", type: "supreme" },

  // GÖK KATI 1
  { id: "kayra", label: "Kayra Han", x: 400, y: 100, color: "#F5D16B", realm: "sky", type: "creator" },

  // Kayra oğlu — Umay ile aynı x ekseninde, üstte (merkez / sol kuşakla çakışmasın)
  { id: "mergen", label: "Mergen Han", x: 600, y: 138, color: "#5DADE2", realm: "sky", type: "wisdom" },

  // GÖK KATI 2
  { id: "ulgen", label: "Ülgen", x: 200, y: 212, color: "#2E5FA1", realm: "sky", type: "good" },
  { id: "umay", label: "Umay Ana", x: 600, y: 212, color: "#DDA0DD", realm: "earth", type: "protector" },

  // GÖK KATI 3 - Ülgen'in Oğulları
  { id: "kyzagan", label: "Kyzagan", x: 100, y: 292, color: "#FF6347", realm: "earth", type: "war" },
  { id: "bai-ulgen", label: "Bai Ülgen", x: 500, y: 292, color: "#DAA520", realm: "earth", type: "nature" },

  // YERALTI — Yeraltı hükümdarı (tanrı düzeyi)
  { id: "erlik", label: "Erlik Han", x: 400, y: 372, color: "#DC143C", realm: "underworld", type: "ruler" },
];

const LINKS = [
  // Tengri'den kayra'ya
  { source: "tengri", target: "kayra", type: "primary" },

  // Kayra Han oğulları
  { source: "kayra", target: "ulgen", type: "good" },
  { source: "kayra", target: "erlik", type: "exile" },
  { source: "kayra", target: "mergen", type: "offspring" },

  // Ülgen'in dallanması
  { source: "ulgen", target: "umay", type: "support" },
  { source: "ulgen", target: "kyzagan", type: "offspring" },
  { source: "ulgen", target: "bai-ulgen", type: "offspring" },
];

export default function NexusWeb() {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState(null);

  const isConnected = useCallback(
    (nodeId) => {
      if (!hoveredId) return true;
      if (nodeId === hoveredId) return true;
      return LINKS.some(
        (l) =>
          (l.source === hoveredId && l.target === nodeId) ||
          (l.target === hoveredId && l.source === nodeId)
      );
    },
    [hoveredId]
  );

  const isLinkActive = useCallback(
    (link) => {
      if (!hoveredId) return false;
      return link.source === hoveredId || link.target === hoveredId;
    },
    [hoveredId]
  );

  const getNodeById = (id) => NODES.find((n) => n.id === id);

  return (
    <svg className="nexus-svg" viewBox="0 0 800 440">
      <g>
        {LINKS.map((link) => {
          const src = getNodeById(link.source);
          const tgt = getNodeById(link.target);
          if (!src || !tgt) return null;
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
          const connected = isConnected(node.id);
          return (
            <g
              key={node.id}
              className="nexus-node"
              style={hoveredId ? { opacity: connected ? 1 : 0.2 } : {}}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={28}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                opacity="0.3"
              />
              <circle cx={node.x} cy={node.y} r={24} fill={node.color} opacity="0.8" />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="#080808"
                fontFamily="Cinzel, serif"
                fontSize="14"
                fontWeight="700"
              >
                {t(`nexusLabels.${node.id}`)?.[0] || node.label[0]}
              </text>
              <text
                x={node.x}
                y={node.y + 42}
                textAnchor="middle"
                fill="#A09882"
                fontFamily="Cinzel, serif"
                fontSize="10"
              >
                {t(`nexusLabels.${node.id}`) || node.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}