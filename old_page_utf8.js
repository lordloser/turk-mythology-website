"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../i18n";

/* ================================================================
   THE INFINITE CYCLE ÔÇö Main Page Component (with i18n)
   ================================================================ */
export default function Home() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  const heroCanvasRef = useRef(null);
  const treeCanvasRef = useRef(null);
  const pantheonCanvasRef = useRef(null);
  const shadowCanvasRef = useRef(null);
  const sagaCanvasRef = useRef(null);
  const loaderRef = useRef(null);
  const runeNavRef = useRef(null);
  const realmRef = useRef(null);
  const initialized = useRef(false);

  /* ÔöÇÔöÇ Language Switch ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function switchLang(lng) {
    i18n.changeLanguage(lng);
    setLang(lng);
    // Update realm indicator to current section's text
    if (realmRef.current) {
      const currentText = realmRef.current.textContent;
      // Realm indicator is updated by ScrollTrigger; force re-render handles text
    }
  }

  /* ÔöÇÔöÇ GSAP + All Animations ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.classList.add("hidden");
        setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }, 800);
      }
      runAllAnimations();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  function runAllAnimations() {
    initHeroAnimations();
    initHeroParticles();
    initTreeParticles();
    initPantheonParticles();
    initShadowParticles();
    initSagaParticles();
    initRuneNav();
    initWorldTreeAnims();
    initPantheonAnims();
    initNexusWeb();
    initBestiaryScroll();
    initShadowRealm();
    initSagaAnims();
  }

  /* ÔöÇÔöÇ Hero Animations ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to("#heroSub", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to("#heroTitle", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
      .to("#heroLore", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .to("#heroBtn", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to("#scrollInd", { opacity: 0.6, duration: 1, ease: "power2.out" }, "-=0.4");

    gsap.to("#heroImage", {
      yPercent: 30, ease: "none",
      scrollTrigger: { trigger: "#origin", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-content", {
      opacity: 0, y: -60, ease: "none",
      scrollTrigger: { trigger: "#origin", start: "60% top", end: "bottom top", scrub: true },
    });
  }

  /* ÔöÇÔöÇ Hero Particles (Kut / Stardust) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initHeroParticles() {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animId;

    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", (e) => { const r = canvas.parentElement.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = -1000; mouse.y = -1000; });

    const colors = ["212,168,67", "245,209,107", "46,95,161", "240,237,228"];
    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.sz = Math.random() * 2.5 + 0.5; this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
        this.op = Math.random() * 0.6 + 0.1; this.ph = Math.random() * Math.PI * 2; this.ps = Math.random() * 0.02 + 0.005;
        this.c = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) { const f = (150 - d) / 150, a = Math.atan2(dy, dx); this.vx += Math.cos(a + Math.PI / 2) * f * 0.03; this.vy += Math.sin(a + Math.PI / 2) * f * 0.03; this.op = Math.min(0.9, this.op + 0.02); }
        this.x += this.vx; this.y += this.vy; this.vx *= 0.99; this.vy *= 0.99; this.ph += this.ps;
        if (this.x < -10) this.x = canvas.width + 10; if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10; if (this.y > canvas.height + 10) this.y = -10;
        return 0.5 + Math.sin(this.ph) * 0.5;
      }
      draw(pf) {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * (0.8 + pf * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.c},${this.op * pf})`; ctx.fill();
        if (this.sz > 1.5) { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.op * 0.08 * pf})`; ctx.fill(); }
      }
    }
    const cnt = Math.min(200, Math.floor((canvas.width * canvas.height) / 6000));
    for (let i = 0; i < cnt; i++) particles.push(new P());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(212,168,67,${0.06 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      particles.forEach((p) => { const pf = p.update(); p.draw(pf); });
      animId = requestAnimationFrame(animate);
    }
    animate();
    ScrollTrigger.create({ trigger: "#origin", start: "top bottom", end: "bottom top", onLeave: () => cancelAnimationFrame(animId), onEnterBack: () => animate() });
  }

  /* ÔöÇÔöÇ Tree Particles ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initTreeParticles() {
    const canvas = treeCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let parts = []; let animId;
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    const greens = ["74,158,97", "45,107,63", "218,165,32", "212,168,67"];
    class S {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.sz = Math.random() * 2 + 0.5; this.vy = -(Math.random() * 0.5 + 0.1); this.vx = (Math.random() - 0.5) * 0.3; this.w = Math.random() * Math.PI * 2; this.op = Math.random() * 0.4 + 0.1; this.c = greens[Math.floor(Math.random() * greens.length)]; }
      update() { this.y += this.vy; this.w += 0.02; this.x += Math.sin(this.w) * 0.3 + this.vx; if (this.y < -10) { this.y = canvas.height + 10; this.x = Math.random() * canvas.width; } }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.op})`; ctx.fill(); }
    }
    const cnt = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < cnt; i++) parts.push(new S());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); parts.forEach((p) => { p.update(); p.draw(); }); animId = requestAnimationFrame(animate); }
    ScrollTrigger.create({ trigger: "#world-tree", start: "top bottom", end: "bottom top", onEnter: () => animate(), onLeave: () => cancelAnimationFrame(animId), onEnterBack: () => animate(), onLeaveBack: () => cancelAnimationFrame(animId) });
  }

  /* ÔöÇÔöÇ Pantheon Particles ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initPantheonParticles() {
    const canvas = pantheonCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let stars = []; let animId;
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    class Star {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.sz = Math.random() * 1.8 + 0.3; this.tw = Math.random() * Math.PI * 2; this.ts = Math.random() * 0.03 + 0.01; this.bo = Math.random() * 0.5 + 0.2; }
      update() { this.tw += this.ts; } draw() { const o = this.bo * (0.5 + Math.sin(this.tw) * 0.5); ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(212,168,67,${o})`; ctx.fill(); }
    }
    const cnt = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < cnt; i++) stars.push(new Star());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); stars.forEach((s) => { s.update(); s.draw(); }); animId = requestAnimationFrame(animate); }
    ScrollTrigger.create({ trigger: "#pantheon", start: "top bottom", end: "bottom top", onEnter: () => animate(), onLeave: () => cancelAnimationFrame(animId), onEnterBack: () => animate(), onLeaveBack: () => cancelAnimationFrame(animId) });
  }

  /* ÔöÇÔöÇ Shadow Particles ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initShadowParticles() {
    const canvas = shadowCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let embers = []; let animId;
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    const reds = ["255,69,0", "220,20,60", "139,0,0", "255,140,0"];
    class E {
      constructor() { this.reset(); } reset() { this.x = Math.random() * canvas.width; this.y = canvas.height + Math.random() * 50; this.sz = Math.random() * 3 + 1; this.vy = -(Math.random() * 1.5 + 0.3); this.vx = (Math.random() - 0.5) * 0.8; this.life = 1; this.decay = Math.random() * 0.008 + 0.002; this.c = reds[Math.floor(Math.random() * reds.length)]; }
      update() { this.y += this.vy; this.x += this.vx + Math.sin(this.y * 0.01) * 0.5; this.life -= this.decay; if (this.life <= 0) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * this.life, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.life * 0.7})`; ctx.fill(); ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * this.life * 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.life * 0.1})`; ctx.fill(); }
    }
    const cnt = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < cnt; i++) embers.push(new E());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); embers.forEach((e) => { e.update(); e.draw(); }); animId = requestAnimationFrame(animate); }
    ScrollTrigger.create({ trigger: "#shadow-realm", start: "top bottom", end: "bottom top", onEnter: () => animate(), onLeave: () => cancelAnimationFrame(animId), onEnterBack: () => animate(), onLeaveBack: () => cancelAnimationFrame(animId) });
  }

  /* ÔöÇÔöÇ Saga Particles ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initSagaParticles() {
    const canvas = sagaCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let flakes = []; let animId;
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    class F {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.sz = Math.random() * 2 + 0.5; this.vy = Math.random() * 0.8 + 0.2; this.vx = Math.random() * 0.5 - 0.25; this.w = Math.random() * Math.PI * 2; this.op = Math.random() * 0.3 + 0.1; }
      update() { this.y += this.vy; this.w += 0.015; this.x += Math.sin(this.w) * 0.4 + this.vx; if (this.y > canvas.height + 10) { this.y = -10; this.x = Math.random() * canvas.width; } }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,195,185,${this.op})`; ctx.fill(); }
    }
    const cnt = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));
    for (let i = 0; i < cnt; i++) flakes.push(new F());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); flakes.forEach((f) => { f.update(); f.draw(); }); animId = requestAnimationFrame(animate); }
    ScrollTrigger.create({ trigger: "#sagas", start: "top bottom", end: "bottom top", onEnter: () => animate(), onLeave: () => cancelAnimationFrame(animId), onEnterBack: () => animate(), onLeaveBack: () => cancelAnimationFrame(animId) });
  }

  /* ÔöÇÔöÇ Rune Navigation ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initRuneNav() {
    const nav = runeNavRef.current; if (!nav) return;
    const items = nav.querySelectorAll(".rune-nav-item");
    ScrollTrigger.create({ trigger: "#origin", start: "bottom 80%", onEnter: () => nav.classList.add("visible"), onLeaveBack: () => nav.classList.remove("visible") });
    items.forEach((item) => { item.addEventListener("click", () => { const t = document.getElementById(item.dataset.target); if (t) t.scrollIntoView({ behavior: "smooth" }); }); });
    const sects = ["origin", "world-tree", "pantheon", "bestiary", "shadow-realm", "sagas"];
    sects.forEach((id, idx) => { ScrollTrigger.create({ trigger: `#${id}`, start: "top center", end: "bottom center", onEnter: () => setActive(idx), onEnterBack: () => setActive(idx) }); });
    function setActive(idx) { items.forEach((item, i) => item.classList.toggle("active", i === idx)); }
  }

  /* ÔöÇÔöÇ World Tree Anims ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initWorldTreeAnims() {
    gsap.to("#treeImage", { opacity: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: "#world-tree", start: "top 70%", toggleActions: "play none none reverse" } });
    gsap.to("#treeInfo", { opacity: 1, x: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "#world-tree", start: "top 60%", toggleActions: "play none none reverse" } });
    gsap.to("#treeImage", { yPercent: -15, ease: "none", scrollTrigger: { trigger: "#world-tree", start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* ÔöÇÔöÇ Pantheon Anims ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initPantheonAnims() {
    gsap.utils.toArray(".deity-card").forEach((card, i) => { gsap.to(card, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });
    gsap.utils.toArray(".reveal").forEach((el) => { gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }); });
  }

  /* ÔöÇÔöÇ Nexus Web ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initNexusWeb() {
    const linksG = document.getElementById("nexusLinks");
    const nodesG = document.getElementById("nexusNodes");
    if (!linksG || !nodesG) return;
    const nodes = [
      { id: "kayra", label: "Kayra Han", x: 400, y: 60, color: "#F5D16B" },
      { id: "ulgen", label: "├£lgen", x: 250, y: 160, color: "#2E5FA1" },
      { id: "erlik", label: "Erlik Han", x: 550, y: 160, color: "#DC143C" },
      { id: "kyzagan", label: "Kyzagan", x: 130, y: 270, color: "#FF6347" },
      { id: "karshyt", label: "Kar┼ş─▒t", x: 260, y: 290, color: "#4A9E61" },
      { id: "bai-ulgen", label: "Bai ├£lgen", x: 380, y: 280, color: "#DAA520" },
      { id: "umay", label: "Umay Ana", x: 500, y: 290, color: "#DDA0DD" },
      { id: "alkarisi", label: "Alkar─▒s─▒", x: 620, y: 270, color: "#8B0000" },
      { id: "tengri", label: "Tengri", x: 400, y: 370, color: "#87CEEB" },
    ];
    const links = [
      { source: "kayra", target: "ulgen" }, { source: "kayra", target: "erlik" },
      { source: "ulgen", target: "kyzagan" }, { source: "ulgen", target: "karshyt" },
      { source: "ulgen", target: "bai-ulgen" }, { source: "ulgen", target: "umay" },
      { source: "erlik", target: "alkarisi" }, { source: "kayra", target: "tengri" },
      { source: "tengri", target: "umay" },
    ];
    links.forEach((lk) => { const src = nodes.find((n) => n.id === lk.source); const tgt = nodes.find((n) => n.id === lk.target); if (!src || !tgt) return; const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", src.x); line.setAttribute("y1", src.y); line.setAttribute("x2", tgt.x); line.setAttribute("y2", tgt.y); line.setAttribute("class", "nexus-link"); line.dataset.source = lk.source; line.dataset.target = lk.target; linksG.appendChild(line); });
    nodes.forEach((node) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g"); g.setAttribute("class", "nexus-node"); g.dataset.id = node.id;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", 24); circle.setAttribute("fill", node.color); circle.setAttribute("opacity", "0.8");
      const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle"); glow.setAttribute("cx", node.x); glow.setAttribute("cy", node.y); glow.setAttribute("r", 28); glow.setAttribute("fill", "none"); glow.setAttribute("stroke", node.color); glow.setAttribute("stroke-width", "1"); glow.setAttribute("opacity", "0.3");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text"); text.setAttribute("x", node.x); text.setAttribute("y", node.y + 42); text.setAttribute("text-anchor", "middle"); text.setAttribute("fill", "#A09882"); text.setAttribute("font-family", "Cinzel, serif"); text.setAttribute("font-size", "10"); text.textContent = node.label;
      const initial = document.createElementNS("http://www.w3.org/2000/svg", "text"); initial.setAttribute("x", node.x); initial.setAttribute("y", node.y + 5); initial.setAttribute("text-anchor", "middle"); initial.setAttribute("fill", "#080808"); initial.setAttribute("font-family", "Cinzel, serif"); initial.setAttribute("font-size", "14"); initial.setAttribute("font-weight", "700"); initial.textContent = node.label[0];
      g.appendChild(glow); g.appendChild(circle); g.appendChild(initial); g.appendChild(text); nodesG.appendChild(g);
      g.addEventListener("mouseenter", () => highlight(node.id, true)); g.addEventListener("mouseleave", () => highlight(node.id, false));
    });
    function highlight(nodeId, active) {
      document.querySelectorAll(".nexus-link").forEach((lk) => { const con = lk.dataset.source === nodeId || lk.dataset.target === nodeId; if (active) { lk.classList.toggle("active", con); if (!con) lk.style.opacity = "0.1"; } else { lk.classList.remove("active"); lk.style.opacity = ""; } });
      document.querySelectorAll(".nexus-node").forEach((n) => { if (!active) { n.style.opacity = ""; return; } const id = n.dataset.id; const con = links.some((l) => (l.source === nodeId && l.target === id) || (l.target === nodeId && l.source === id) || id === nodeId); n.style.opacity = con ? "1" : "0.2"; });
    }
  }

  /* ÔöÇÔöÇ Bestiary Scroll ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initBestiaryScroll() {
    const wrapper = document.getElementById("bestiaryWrapper");
    const track = document.getElementById("bestiaryTrack");
    if (!wrapper || !track) return;
    const totalW = track.scrollWidth - wrapper.offsetWidth;
    gsap.to(track, { x: -totalW, ease: "none", scrollTrigger: { trigger: wrapper, start: "top 30%", end: () => `+=${totalW}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
  }

  /* ÔöÇÔöÇ Shadow Realm ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initShadowRealm() {
    ScrollTrigger.create({ trigger: "#shadow-realm", start: "top 80%", onEnter: () => { document.body.classList.add("decay-active"); setTimeout(() => document.body.classList.remove("decay-active"), 600); } });
    gsap.to("#erlikImage", { opacity: 1, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: "#shadow-realm", start: "top 60%", toggleActions: "play none none reverse" } });
    gsap.to("#shadowInfo", { opacity: 1, x: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "#shadow-realm", start: "top 50%", toggleActions: "play none none reverse" } });
    gsap.utils.toArray(".spirit-thread-item").forEach((item, i) => { gsap.from(item, { opacity: 0, x: -30, duration: 0.6, delay: i * 0.2, scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" } }); });
    ScrollTrigger.create({ trigger: "#shadow-realm", start: "top center", end: "bottom center", onEnter: () => { document.querySelector(".top-bar").style.borderBottom = "1px solid rgba(139,0,0,0.3)"; }, onLeave: () => { document.querySelector(".top-bar").style.borderBottom = ""; }, onEnterBack: () => { document.querySelector(".top-bar").style.borderBottom = "1px solid rgba(139,0,0,0.3)"; }, onLeaveBack: () => { document.querySelector(".top-bar").style.borderBottom = ""; } });
  }

  /* ÔöÇÔöÇ Saga Anims ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */
  function initSagaAnims() {
    gsap.utils.toArray(".saga-visual img").forEach((img) => {
      gsap.to(img, { opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: img, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.to(img, { yPercent: -12, ease: "none", scrollTrigger: { trigger: img.closest(".saga-block"), start: "top bottom", end: "bottom top", scrub: true } });
    });
    ["#sagaText1", "#sagaText2", "#sagaText3"].forEach((sel) => { gsap.to(sel, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: sel, start: "top 80%", toggleActions: "play none none reverse" } }); });
    gsap.utils.toArray(".saga-index").forEach((idx) => { gsap.to(idx, { yPercent: -40, ease: "none", scrollTrigger: { trigger: idx.closest(".saga-block"), start: "top bottom", end: "bottom top", scrub: true } }); });
  }

  /* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
     RENDER
     ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */
  return (
    <>
      {/* ÔöÇÔöÇ Loader ÔöÇÔöÇÔöÇ */}
      <div className="loader" ref={loaderRef}>
        <div className="loader-rune">­É░â</div>
        <div className="loader-text">{t("loader.text")}</div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
      </div>

      {/* ÔöÇÔöÇ Top Bar ÔöÇÔöÇ */}
      <header className="top-bar" id="topBar">
        <div className="top-bar-logo">
          <div className="logo-icon">­É▒à</div>
          <span>{t("topBar.title")}</span>
        </div>
        <div className="top-bar-right">
          <div className="realm-indicator" ref={realmRef}>{t("realms.origin")}</div>
          <div className="lang-toggle">
            <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => switchLang("en")}>EN</button>
            <button className={`lang-btn${lang === "tr" ? " active" : ""}`} onClick={() => switchLang("tr")}>TR</button>
          </div>
        </div>
      </header>

      {/* ÔöÇÔöÇ Rune Nav ÔöÇÔöÇ */}
      <nav className="rune-nav" ref={runeNavRef}>
        {[
          { glyph: "­É░â", target: "origin", tip: t("runeNav.origin") },
          { glyph: "­É░û", target: "world-tree", tip: t("runeNav.worldTree") },
          { glyph: "­É▒à", target: "pantheon", tip: t("runeNav.pantheon") },
          { glyph: "­É░ë", target: "bestiary", tip: t("runeNav.bestiary") },
          { glyph: "­É░╝", target: "shadow-realm", tip: t("runeNav.shadowRealm") },
          { glyph: "­É░İ", target: "sagas", tip: t("runeNav.sagas") },
        ].map((r, i) => (
          <div key={r.target} className={`rune-nav-item${i === 0 ? " active" : ""}`} data-target={r.target}>
            <span className="rune-glyph">{r.glyph}</span>
            <span className="rune-tooltip">{r.tip}</span>
          </div>
        ))}
      </nav>

      {/* ÔòÉÔòÉÔòÉ SECTION 1: THE ORIGIN ÔòÉÔòÉÔòÉ */}
      <section id="origin" className="section texture-noise">
        <canvas className="particle-canvas" ref={heroCanvasRef} />
        <div className="hero-image-wrapper">
          <img src="/images/ak-ana.png" alt="Ak Ana" id="heroImage" />
        </div>
        <div className="hero-content">
          <p className="hero-subtitle" id="heroSub">{t("hero.subtitle")}</p>
          <h1 className="hero-title" id="heroTitle">{t("hero.title")}</h1>
          <p className="hero-lore" id="heroLore" dangerouslySetInnerHTML={{ __html: t("hero.lore") }} />
          <button className="btn-liquid" id="heroBtn" onClick={() => document.getElementById("world-tree")?.scrollIntoView({ behavior: "smooth" })}>
            <span>{t("hero.btn")}</span><span>Ôåô</span>
          </button>
        </div>
        <div className="scroll-indicator" id="scrollInd">
          <span>{t("hero.scroll")}</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ SECTION 2: WORLD TREE ÔòÉÔòÉÔòÉ */}
      <section id="world-tree" className="section texture-stone">
        <canvas className="particle-canvas" ref={treeCanvasRef} />
        <div className="section-inner">
          <div className="tree-container">
            <div className="tree-visual">
              <img src="/images/bayterek.png" alt="Bayterek" id="treeImage" />
            </div>
            <div className="tree-info" id="treeInfo">
              <h2 className="heading-xl">{t("worldTree.heading")}<br /><small style={{ fontSize: "0.5em", color: "var(--text-muted)" }}>{t("worldTree.sub")}</small></h2>
              <p dangerouslySetInnerHTML={{ __html: t("worldTree.p1") }} />
              <p>{t("worldTree.p2")}</p>
              <div className="realm-tags">
                <span className="realm-tag upper">{t("worldTree.upper")}</span>
                <span className="realm-tag middle">{t("worldTree.middle")}</span>
                <span className="realm-tag lower">{t("worldTree.lower")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ SECTION 3: DIVINE PANTHEON ÔòÉÔòÉÔòÉ */}
      <section id="pantheon" className="section texture-noise">
        <canvas className="particle-canvas" ref={pantheonCanvasRef} />
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-tag">{t("pantheon.tag")}</span>
            <h2 className="heading-xl">{t("pantheon.heading")} <span className="gold">{t("pantheon.headingGold")}</span></h2>
            <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>{t("pantheon.desc")}</p>
          </div>
          <div className="deity-grid">
            {["kayra", "ulgen", "kyzagan"].map((key) => {
              const imgs = { kayra: "kayra-han", ulgen: "ulgen", kyzagan: "kyzagan" };
              return (
                <article className="deity-card" key={key}>
                  <img className="deity-card-image" src={`/images/${imgs[key]}.png`} alt={t(`pantheon.${key}.name`)} />
                  <div className="deity-card-overlay">
                    <h3 className="deity-card-title">{t(`pantheon.${key}.name`)}</h3>
                    <span className="deity-card-role">{t(`pantheon.${key}.role`)}</span>
                    <p className="deity-card-desc">{t(`pantheon.${key}.desc`)}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="nexus-container reveal">
            <div className="nexus-title"><h3 className="heading-lg">{t("pantheon.nexusTitle")}</h3></div>
            <p className="nexus-subtitle">{t("pantheon.nexusDesc")}</p>
            <svg className="nexus-svg" id="nexusSvg" viewBox="0 0 800 400"><g id="nexusLinks" /><g id="nexusNodes" /></svg>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ SECTION 4: BESTIARY ÔòÉÔòÉÔòÉ */}
      <section id="bestiary" className="section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-tag">{t("bestiary.tag")}</span>
            <h2 className="heading-xl">{t("bestiary.heading")} <span className="gold">{t("bestiary.headingGold")}</span></h2>
            <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>{t("bestiary.desc")}</p>
          </div>
        </div>
        <div className="bestiary-scroll-wrapper" id="bestiaryWrapper">
          <div className="bestiary-track" id="bestiaryTrack">
            {["tulpar", "tepegoz", "arcura", "asena"].map((key) => (
              <article className="creature-card" key={key}>
                <div className="creature-card-inner">
                  <img className="creature-image" src={`/images/${key}.png`} alt={t(`bestiary.${key}.name`)} />
                  <div className="creature-info">
                    <h3 className="creature-name">{t(`bestiary.${key}.name`)}</h3>
                    <span className="creature-type">{t(`bestiary.${key}.type`)}</span>
                    <p className="creature-desc">{t(`bestiary.${key}.desc`)}</p>
                  </div>
                  <div className="lore-overlay">
                    <h4>{t(`bestiary.${key}.loreTitle`)}</h4>
                    <p>{t(`bestiary.${key}.lore1`)}</p>
                    <p>{t(`bestiary.${key}.lore2`)}</p>
                    <span className="lore-connection">{t(`bestiary.${key}.connection`)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ SECTION 5: SHADOW REALM ÔòÉÔòÉÔòÉ */}
      <section id="shadow-realm" className="section">
        <canvas className="particle-canvas" ref={shadowCanvasRef} />
        <div className="decay-border" />
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-tag" style={{ borderColor: "var(--abyss-crimson)", color: "var(--abyss-crimson-bright)" }}>{t("shadow.tag")}</span>
            <h2 className="heading-xl" style={{ color: "var(--abyss-crimson-bright)" }}>{t("shadow.heading")} <span style={{ color: "var(--abyss-magma)" }}>{t("shadow.headingAccent")}</span></h2>
            <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0", color: "rgba(232,226,214,0.5)" }}>{t("shadow.desc")}</p>
          </div>
          <div className="shadow-realm-layout">
            <div className="erlik-visual">
              <div className="erlik-aura" />
              <img src="/images/erlik-han.png" alt="Erlik Han" id="erlikImage" />
            </div>
            <div className="shadow-info" id="shadowInfo">
              <h2 className="heading-xl">{t("shadow.erlikTitle")}</h2>
              <p dangerouslySetInnerHTML={{ __html: t("shadow.erlikP1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("shadow.erlikP2") }} />
              <div className="spirit-threads">
                {[
                  { icon: "­şæü´©Å", nameKey: "shadow.alkarisi", descKey: "shadow.alkarisiDesc" },
                  { icon: "­şîæ", nameKey: "shadow.karabura", descKey: "shadow.karaburaDesc" },
                  { icon: "ÔÜû´©Å", nameKey: "shadow.judgment", descKey: "shadow.judgmentDesc" },
                ].map((st) => (
                  <div className="spirit-thread-item" key={st.nameKey}>
                    <span className="thread-icon">{st.icon}</span>
                    <div><div className="thread-name">{t(st.nameKey)}</div><div className="thread-desc">{t(st.descKey)}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ SECTION 6: EPIC SAGAS ÔòÉÔòÉÔòÉ */}
      <section id="sagas" className="section">
        <canvas className="particle-canvas" ref={sagaCanvasRef} />
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-tag">{t("sagas.tag")}</span>
            <h2 className="heading-xl">{t("sagas.heading")} <span className="gold">{t("sagas.headingGold")}</span></h2>
            <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>{t("sagas.desc")}</p>
          </div>
          <div className="saga-block" id="sagaErgenekon">
            <div className="saga-visual"><img src="/images/ergenekon.png" alt="Ergenekon" /><div className="saga-visual-overlay" /></div>
            <div className="saga-text" id="sagaText1">
              <div className="saga-index">I</div>
              <h3 className="heading-lg">{t("sagas.ergenekon.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("sagas.ergenekon.p1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("sagas.ergenekon.p2") }} />
              <button className="saga-link"><span>{t("sagas.explore")}</span></button>
            </div>
          </div>
          <div className="saga-block reversed" id="sagaOghuz">
            <div className="saga-visual"><img src="/images/oghuz-khagan.png" alt="Oghuz Khagan" /><div className="saga-visual-overlay" /></div>
            <div className="saga-text" id="sagaText2">
              <div className="saga-index">II</div>
              <h3 className="heading-lg">{t("sagas.oghuz.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("sagas.oghuz.p1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("sagas.oghuz.p2") }} />
              <button className="saga-link"><span>{t("sagas.explore")}</span></button>
            </div>
          </div>
          <div className="saga-block" id="sagaAsena">
            <div className="saga-visual"><img src="/images/asena.png" alt="Asena" /><div className="saga-visual-overlay" /></div>
            <div className="saga-text" id="sagaText3">
              <div className="saga-index">III</div>
              <h3 className="heading-lg">{t("sagas.asena.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("sagas.asena.p1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("sagas.asena.p2") }} />
              <button className="saga-link"><span>{t("sagas.explore")}</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉ Footer ÔòÉÔòÉÔòÉ */}
      <footer className="site-footer">
        <div className="footer-tree">­şî│</div>
        <div className="footer-title">{t("footer.title")}</div>
        <div className="footer-subtitle">{t("footer.subtitle")}</div>
        <nav className="footer-links">
          <a href="#origin">{t("runeNav.origin")}</a>
          <a href="#world-tree">{t("runeNav.worldTree")}</a>
          <a href="#pantheon">{t("runeNav.pantheon")}</a>
          <a href="#bestiary">{t("runeNav.bestiary")}</a>
          <a href="#shadow-realm">{t("runeNav.shadowRealm")}</a>
          <a href="#sagas">{t("runeNav.sagas")}</a>
        </nav>
        <p className="footer-copy">{t("footer.copy")}</p>
      </footer>
    </>
  );
}
