# CLAUDE.md

Bu dosya, bu repoda çalışırken Claude Code'a yol gösterir.

## Proje

**The Infinite Cycle**: Türk mitolojisini (Tengri kozmolojisi, tanrılar, yaratıklar, destanlar) sinematik scroll animasyonlarıyla anlatan iki dilli (TR/EN) tek sayfalık site ve alt sayfaları.

## Komutlar

```bash
npm run dev     # geliştirme sunucusu (http://localhost:3000)
npm run build   # statik export -> out/
npm run lint    # eslint (React Compiler kuralları dahil)
```

Test altyapısı yok. Değişiklikten sonra en azından `npm run lint` ve `npm run build` çalıştır; build çıktısında `NO_I18NEXT_INSTANCE` uyarısı çıkmamalı.

## Mimari

- **Next.js 16 App Router**, `output: "export"` (tamamen statik, sunucu kodu yok). `reactCompiler: true` açık.
- Tüm sayfalar `"use client"`; animasyonlar **GSAP + ScrollTrigger** ile `useGSAP` hook'u üzerinden yapılır.
- `src/app/page.js`: ana sayfa orkestratörü; bölümleri sırayla render eder (`components/sections/*Section.jsx`).
  Sıra: Origin → Migration → WorldTree → Ritual → Pantheon → Umay → Bestiary → ShadowRealm → Sagas → Footer.
- Alt sayfalar: `sagas/{ergenekon,oghuz,asena,manas,goc}` (hepsi `components/SagaPageTemplate.jsx` kullanır), `sozluk` (sözlük), `soy-agaci` (soy ağacı, `NexusWeb`), `yeralti-varliklari` (Karanlık Külliyat).
- Ana sayfadaki Panteon ve Bestiary kartları `src/data/mythology.js` listelerinden gelir (`slug` alanı varlık sayfasına bağlanır). Karta tıklayınca `CodexModal` açılır; içindeki "Detaylı incele" linki `/varlik/[slug]` sayfasına gider. Yeni yaratık eklerken hem `mythology.js` hem `entities.js` güncellenmeli.
- `varlik/[slug]`: her tanrı/yaratık/iye için statik detay sayfası (`generateStaticParams`). Veri `src/data/entities.js` içinde; metin alanları çeviri anahtarıdır. Yeni varlık eklemek = `ENTITIES` dizisine bir kayıt + görsel + gerekirse çeviri anahtarları.
- `kozmoloji`: etkileşimli üç dünya haritası (SVG). Seçili katman URL hash'inde (`#sky`, `#middle`, `#under`).
- `kaynakca`: kaynakça; veri `src/data/sources.js`. Varlıkların `sources` alanı bu id'lere bağlanır.
- Tüm alt sayfalar üst bar için `components/SubPageTopBar.jsx` kullanır; geri bağlantıları `className="back-link"` ile yazılır.
- Üst menü (`TopBar.jsx`): Kozmoloji + "Keşfet" açılır menüsü (`EXPLORE_LINKS`). Yeni sayfa eklerken bu listeye ve mobil menüye ekle.
- Footer (`FooterSection.jsx`): kozmoloji çağrısı + Keşfet / Destanlar / Diyarlar sütunları.
- Arka plan parçacıkları: `components/ParticleCanvas.jsx` + `utils/particles.js`.
- Stil: tek dosya `src/app/globals.css`. Renkler `:root` değişkenleri olarak tanımlı (`--celestial-*` gök, `--steppe-*` yer, `--abyss-*` yeraltı). Yeni renk eklemek yerine bunları kullan.

## SEO

- Site Netlify'da yayında (https://turkmitoloji.netlify.app), GitHub'dan otomatik deploy edilir.
- Site adresi `src/site.js` içindeki `SITE_URL` (veya build'de `NEXT_PUBLIC_SITE_URL`). Yayındaki alan adı farklıysa burayı güncelle; sitemap, robots ve canonical adresleri buradan üretilir.
- Sayfalar `"use client"` olduğu için metadata, aynı klasördeki `layout.js` (veya sunucu `page.js`) içinde `pageMetadata()` ile verilir. Yeni sayfa eklerken hem metadata ekle hem de `src/app/sitemap.js` listesine yaz.
- Paylaşım görseli: `public/og.jpg` (1200x630).

## Performans

- Fontlar `next/font/google` ile `layout.js`'te yüklenir (`--font-cinzel`, `--font-inter`, `--font-medievalsharp`, Göktürk harfleri için `--font-old-turkic`); CSS'e `@import` ile font ekleme.
- Ana sayfada ilk ekran dışındaki bölümler `next/dynamic` ile ayrı parçalara bölünür (`page.js`).
- Metin renkleri: `--text-muted` küçük metinlerde de okunur (≈5:1 kontrast). Daha koyu gri kullanma; küçük metinleri 0.9rem altına indirme.
- İlk ekrandaki görsel hariç `<img>` etiketlerine `loading="lazy" decoding="async"` ekle.
- `prefers-reduced-motion` desteği: `MotionPreferences.jsx` (GSAP hızlandırma), `ParticleCanvas` (parçacıkları kapatır) ve `globals.css` sonundaki media query.

## Çeviri (i18n)

- `src/i18n.js` i18next'i başlatır; varsayılan ve fallback dil `tr`.
- **`t()` kullanan her sayfa `import "@/i18n";` yapmalı**; yoksa doğrudan açılışta metinler anahtar olarak görünür.
- Seçilen dil `localStorage("lang")` içinde saklanır; `components/LanguageSync.jsx` (layout'ta) yüklemede geri uygular. Dili değiştirmek için sadece `i18n.changeLanguage()` çağır, ayrı state tutma.
- Metinler `src/locales/tr.json` ve `en.json` içinde, **4 boşluk girinti**. Yeni anahtarı **iki dosyaya birden** ekle. Anahtar eşitliğini kontrol etmek için:
  ```bash
  node -e 'const f=(o,p="")=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==="object"?f(v,p+k+"."):[p+k]);const e=new Set(f(require("./src/locales/en.json"))),t=new Set(f(require("./src/locales/tr.json")));console.log([...t].filter(k=>!e.has(k)),[...e].filter(k=>!t.has(k)))'
  ```

## Görseller

- `public/images/*.webp`. Yeni görseller **WebP** olmalı, küçük harf ve ASCII dosya adı (Linux sunucular büyük/küçük harfe duyarlı, `ı/ş/ğ` URL'de sorun çıkarır).
- Dönüştürme: `convert girdi.png -resize '1024x1024>' -quality 82 cikti.webp` (panoramalar için `-resize 1920x -quality 80`).
- Bazı görseller dinamik yoldan gelir (`/images/${c.img}.webp`): `PantheonSection`, `RitualSection`, `BestiarySection`, `SagasSection`, `yeralti-varliklari`. Dosya adını değiştirirken bu dizilerdeki `img` alanlarını da güncelle.
- `images.unoptimized: true` (statik export), yani Next.js görselleri optimize etmez; boyutu kaynakta küçült.

## Kurallar / Tuzaklar

- React Compiler lint kuralı render sırasında ref okumayı yasaklar: ref'leri nesne içinde (`refs.foo`) prop olarak geçme, her biri ayrı `useRef` olsun. `contextSafe` ile sarılan handler'ları `(...args) => contextSafe(() => {...})()` şeklinde yaz.
- Yatay kaydırmalı bölümler (Migration, Bestiary) GSAP transform kullanır; `#hash` ile geri dönüşte `page.js` 500 ms bekleyip kaydırır.
- Yorumlar ve commit mesajları Türkçe yazılabilir; mevcut koddaki stile uy.
- Kullanılmayan bileşen: `RuneNav.jsx`.
- `globals.css` sonunda "Birleştirme sonrası tasarım düzeltmeleri" bloğu, önceki kuralları ezen tasarım ayarlarını içerir; o bölgedeki bir kuralı değiştirirken buraya bak.
- Kod içinde sabit Türkçe metin yazma; her görünen metin `t()` ile çeviri dosyalarından gelmeli.
- `out/` klasörünü yerelde test etmek için `.html` uzantısız adresleri çözen bir statik sunucu kullan (ör. `npx serve out`).
