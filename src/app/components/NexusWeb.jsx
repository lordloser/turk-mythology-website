"use client";

import { useState, useCallback } from "react";

const NODES = [
  { id: "kayra", label: "Kayra Han", x: 400, y: 60, color: "#F5D16B" },
  { id: "ulgen", label: "Ülgen", x: 250, y: 160, color: "#2E5FA1" },
  { id: "erlik", label: "Erlik Han", x: 550, y: 160, color: "#DC143C" },
  { id: "kyzagan", label: "Kyzagan", x: 130, y: 270, color: "#FF6347" },
  { id: "karshyt", label: "Karşıt", x: 260, y: 290, color: "#4A9E61" },
  { id: "bai-ulgen", label: "Bai Ülgen", x: 380, y: 280, color: "#DAA520" },
  { id: "umay", label: "Umay Ana", x: 500, y: 290, color: "#DDA0DD" },
  { id: "alkarisi", label: "Alkarısı", x: 620, y: 270, color: "#8B0000" },
  { id: "tengri", label: "Tengri", x: 400, y: 370, color: "#87CEEB" },
];

const LINKS = [
  { source: "kayra", target: "ulgen" },
  { source: "kayra", target: "erlik" },
  { source: "ulgen", target: "kyzagan" },
  { source: "ulgen", target: "karshyt" },
  { source: "ulgen", target: "bai-ulgen" },
  { source: "ulgen", target: "umay" },
  { source: "erlik", target: "alkarisi" },
  { source: "kayra", target: "tengri" },
  { source: "tengri", target: "umay" },
];

export default function NexusWeb() {
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
    <svg className="nexus-svg" viewBox="0 0 800 400">
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
                {node.label[0]}
              </text>
              <text
                x={node.x}
                y={node.y + 42}
                textAnchor="middle"
                fill="#A09882"
                fontFamily="Cinzel, serif"
                fontSize="10"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
