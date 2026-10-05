# The Infinite Cycle: Türk Mitolojisi

Türk mitolojisini (Gök Tengri kozmolojisi, Bayterek, tanrılar, yaratıklar ve destanlar) sinematik scroll animasyonlarıyla anlatan iki dilli (TR / EN) bir web sitesi.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router, statik export)
- React 19 + React Compiler
- [GSAP](https://gsap.com) + ScrollTrigger
- i18next / react-i18next

## Başlangıç

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statik site -> out/
```

`out/` klasörü herhangi bir statik barındırma servisine (Vercel, Netlify, GitHub Pages, Cloudflare Pages) yüklenebilir.

## Yapı

```
src/
  app/
    page.js                 # Ana sayfa (bölümleri sıralar)
    components/sections/    # Origin, Migration, WorldTree, Pantheon, Bestiary, ShadowRealm, Sagas...
    sagas/                  # Ergenekon, Oğuz Kağan, Asena, Manas, Göç destan sayfaları
    sozluk/                 # Sözlük
    soy-agaci/              # Tanrılar soy ağacı
    yeralti-varliklari/     # Karanlık Külliyat
  locales/                  # tr.json, en.json
public/images/              # WebP görseller
```

Katkı ve geliştirme notları için [CLAUDE.md](./CLAUDE.md) dosyasına bakın.
