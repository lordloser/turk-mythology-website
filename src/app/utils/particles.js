/* ================================================================
   Particle Classes — Extracted from monolithic Home component
   Each class is defined once and reused across canvas components.
   ================================================================ */

/**
 * HeroParticle (originally "P")
 * Golden/blue stardust with mouse interaction and inter-particle lines.
 */
export class HeroParticle {
  constructor(w, h, colors) {
    this.colors = colors;
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.sz = Math.random() * 2.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.op = Math.random() * 0.6 + 0.1;
    this.ph = Math.random() * Math.PI * 2;
    this.ps = Math.random() * 0.02 + 0.005;
    this.c = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  update(mouse) {
    if (mouse) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        const f = (150 - d) / 150;
        const a = Math.atan2(dy, dx);
        this.vx += Math.cos(a + Math.PI / 2) * f * 0.03;
        this.vy += Math.sin(a + Math.PI / 2) * f * 0.03;
        this.op = Math.min(0.9, this.op + 0.02);
      }
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.ph += this.ps;
    return 0.5 + Math.sin(this.ph) * 0.5;
  }

  wrap(w, h) {
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  }

  draw(ctx, pf) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz * (0.8 + pf * 0.4), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.c},${this.op * pf})`;
    ctx.fill();
    if (this.sz > 1.5) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.c},${this.op * 0.08 * pf})`;
      ctx.fill();
    }
  }
}

/**
 * TreeSpirit (originally "S")
 * Green/gold particles that float upward with gentle wave motion.
 */
export class TreeSpirit {
  constructor(w, h, colors) {
    this.colors = colors;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.sz = Math.random() * 2 + 0.5;
    this.vy = -(Math.random() * 0.5 + 0.1);
    this.vx = (Math.random() - 0.5) * 0.3;
    this.w = Math.random() * Math.PI * 2;
    this.op = Math.random() * 0.4 + 0.1;
    this.c = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  update() {
    this.y += this.vy;
    this.w += 0.02;
    this.x += Math.sin(this.w) * 0.3 + this.vx;
  }

  wrap(w, h) {
    if (this.y < -10) {
      this.y = h + 10;
      this.x = Math.random() * w;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.c},${this.op})`;
    ctx.fill();
  }
}

/**
 * PantheonStar (originally "Star")
 * Twinkling golden stars for the divine pantheon.
 */
export class PantheonStar {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.sz = Math.random() * 1.8 + 0.3;
    this.tw = Math.random() * Math.PI * 2;
    this.ts = Math.random() * 0.03 + 0.01;
    this.bo = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.tw += this.ts;
  }

  wrap() { /* stars don't move, no wrapping needed */ }

  draw(ctx) {
    const o = this.bo * (0.5 + Math.sin(this.tw) * 0.5);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212,168,67,${o})`;
    ctx.fill();
  }
}

/**
 * ShadowEmber (originally "E")
 * Rising ember particles with glow and decay lifecycle.
 */
export class ShadowEmber {
  constructor(w, h, colors) {
    this.colors = colors;
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = h + Math.random() * 50;
    this.sz = Math.random() * 3 + 1;
    this.vy = -(Math.random() * 1.5 + 0.3);
    this.vx = (Math.random() - 0.5) * 0.8;
    this.life = 1;
    this.decay = Math.random() * 0.008 + 0.002;
    this.c = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  update() {
    this.y += this.vy;
    this.x += this.vx + Math.sin(this.y * 0.01) * 0.5;
    this.life -= this.decay;
  }

  wrap(w, h) {
    if (this.life <= 0) this.reset(w, h);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz * this.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.c},${this.life * 0.7})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz * this.life * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.c},${this.life * 0.1})`;
    ctx.fill();
  }
}

/**
 * SagaFlake (originally "F")
 * Gently falling snow-like particles for the sagas section.
 */
export class SagaFlake {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.sz = Math.random() * 2 + 0.5;
    this.vy = Math.random() * 0.8 + 0.2;
    this.vx = Math.random() * 0.5 - 0.25;
    this.w = Math.random() * Math.PI * 2;
    this.op = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.y += this.vy;
    this.w += 0.015;
    this.x += Math.sin(this.w) * 0.4 + this.vx;
  }

  wrap(w, h) {
    if (this.y > h + 10) {
      this.y = -10;
      this.x = Math.random() * w;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,195,185,${this.op})`;
    ctx.fill();
  }
}
