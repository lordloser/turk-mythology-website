/* ================================================================
   KAYNAKÇA — Sitedeki anlatıların dayandığı birincil kaynaklar ve
   araştırmalar. `id` değerleri entities.js içindeki `sources`
   alanlarında kullanılır.
   ================================================================ */

export const SOURCE_GROUPS = [
    { id: "primary", labelKey: "sources.primary" },
    { id: "research", labelKey: "sources.research" },
];

export const SOURCES = [
    /* ── Birincil kaynaklar ───────────────────────────── */
    {
        id: "orhun",
        group: "primary",
        author: "—",
        title: "Orhun Yazıtları (Kül Tigin, Bilge Kağan ve Tonyukuk Anıtları)",
        year: "8. yy",
        note: {
            tr: "Göktürk alfabesiyle yazılmış en eski Türkçe metinler. Tengri, Umay ve ıduk Yer-Sub inancının doğrudan tanıklarıdır.",
            en: "The oldest Turkic texts, written in the Old Turkic script. Direct witnesses to belief in Tengri, Umay and the sacred Yer-Sub.",
        },
    },
    {
        id: "dlt",
        group: "primary",
        author: "Kâşgarlı Mahmud",
        title: "Dîvânu Lugâti't-Türk",
        year: "1072–1077",
        note: {
            tr: "Türkçenin ilk büyük sözlüğü; Tengri ve Umay inancı ile dönemin halk kültürü hakkında zengin örnekler içerir.",
            en: "The first great dictionary of Turkic, rich in examples of belief in Tengri, Umay and the folk culture of the period.",
        },
    },
    {
        id: "oguzkagan",
        group: "primary",
        author: "W. Bang & G. R. Rahmeti Arat (yay.)",
        title: "Oğuz Kağan Destanı (Uygur harfli nüsha, Paris Bibliothèque nationale)",
        year: "1936",
        note: {
            tr: "Oğuz Kağan'ın doğumu, gök kurdun rehberliği ve İt-Barak ülkesiyle savaşı bu nüshada anlatılır.",
            en: "Tells of Oghuz Khagan's birth, the guidance of the sky-wolf and the war with the land of İt-Barak.",
        },
    },
    {
        id: "dedekorkut",
        group: "primary",
        author: "—",
        title: "Kitâb-ı Dedem Korkut (Dresden ve Vatikan nüshaları)",
        year: "15.–16. yy",
        note: {
            tr: "Oğuz boylarının destansı hikâyeleri. Basat'ın Tepegöz'ü öldürdüğü boy Tepegöz anlatısının temel kaynağıdır.",
            en: "Epic tales of the Oghuz tribes. The story of Basat slaying Tepegöz is the main source for the Tepegöz legend.",
        },
    },
    {
        id: "chinese",
        group: "primary",
        author: "—",
        title: "Çin yıllıkları: Zhou shu ve Sui shu (Kök Türk bölümleri)",
        year: "7. yy",
        note: {
            tr: "Türklerin dişi kurttan türeyişini (Asena) ve demir dağlarla çevrili vadiden çıkışını anlatan en eski yazılı kayıtlar.",
            en: "The earliest written records of the Turks' descent from a she-wolf (Asena) and their emergence from a valley ringed by iron mountains.",
        },
    },
    {
        id: "camiut",
        group: "primary",
        author: "Reşîdüddîn Fazlullah",
        title: "Câmiu't-Tevârîh",
        year: "14. yy başı",
        note: {
            tr: "Ergenekon anlatısının bilinen en eski ayrıntılı kaydı.",
            en: "The earliest known detailed record of the Ergenekon narrative.",
        },
    },
    {
        id: "secere",
        group: "primary",
        author: "Ebulgazi Bahadır Han",
        title: "Şecere-i Terâkime",
        year: "1659–1661",
        note: {
            tr: "Oğuz Kağan ve Ergenekon geleneğini Türkmen soy kütükleriyle birlikte aktarır.",
            en: "Relays the Oghuz Khagan and Ergenekon tradition together with Turkmen genealogies.",
        },
    },
    {
        id: "manas",
        group: "primary",
        author: "Sagımbay Orozbakov ve Sayakbay Karalayev (anlatıcılar)",
        title: "Manas Destanı",
        year: "19.–20. yy derlemeleri",
        note: {
            tr: "Kırgızların dünyanın en uzun destanlarından biri olan Manas üçlemesi. İlk bilimsel derleme Radloff'a aittir (1885).",
            en: "The Kyrgyz Manas trilogy, one of the longest epics in the world. The first scholarly record was made by Radloff (1885).",
        },
    },

    /* ── Araştırmalar ─────────────────────────────────── */
    {
        id: "ogel",
        group: "research",
        author: "Bahaeddin Ögel",
        title: "Türk Mitolojisi (Kaynakları ve Açıklamaları ile Destanlar), I–II",
        year: "1971, 1995",
        publisher: "Türk Tarih Kurumu",
        note: {
            tr: "Alanın temel başvuru eseri; destanları kaynak metinleriyle birlikte inceler.",
            en: "The standard reference work in the field, examining the epics together with their source texts.",
        },
    },
    {
        id: "inan",
        group: "research",
        author: "Abdülkadir İnan",
        title: "Tarihte ve Bugün Şamanizm: Materyaller ve Araştırmalar",
        year: "1954",
        publisher: "Türk Tarih Kurumu",
        note: {
            tr: "Kamlık, iye inancı, Umay, Erlik ve Albastı/Alkarısı gibi varlıklar üzerine klasik çalışma.",
            en: "A classic study of shamanism, guardian spirits, Umay, Erlik and beings such as Albastı/Alkarısı.",
        },
    },
    {
        id: "radloff",
        group: "research",
        author: "Wilhelm Radloff",
        title: "Aus Sibirien (Sibirya'dan)",
        year: "1884",
        note: {
            tr: "Altay kamlarının Ülgen'e yükselişini ve Erlik'e inişini tanıklığıyla aktaran saha gözlemleri.",
            en: "Field observations describing Altai shamans' ascent to Ülgen and descent to Erlik from first-hand witness.",
        },
    },
    {
        id: "anokhin",
        group: "research",
        author: "A. V. Anohin",
        title: "Materialy po şamanstvu u altaytsev (Altaylarda Şamanlığa Ait Materyaller)",
        year: "1924",
        note: {
            tr: "Altay kozmolojisi, gök katları, Ülgen'in oğulları (Mergen, Kızagan vb.) ve Suyla gibi yardımcı ruhlar için temel kaynak.",
            en: "A key source for Altai cosmology, the layers of heaven, Ülgen's sons (Mergen, Kızagan, etc.) and helper spirits such as Suyla.",
        },
    },
    {
        id: "roux",
        group: "research",
        author: "Jean-Paul Roux",
        title: "Türklerin ve Moğolların Eski Dini (La religion des Turcs et des Mongols)",
        year: "1984",
        note: {
            tr: "Gök Tengri inancı, dünya ağacı ve kurt atası motiflerinin karşılaştırmalı incelemesi.",
            en: "A comparative study of belief in Tengri, the world tree and the wolf-ancestor motif.",
        },
    },
    {
        id: "eliade",
        group: "research",
        author: "Mircea Eliade",
        title: "Şamanizm: İlkel Esrime Teknikleri (Le Chamanisme et les techniques archaïques de l'extase)",
        year: "1951",
        note: {
            tr: "Dünya ağacı, kat kat gökler ve şamanın yolculuğu üzerine dünya çapında karşılaştırmalı bakış.",
            en: "A worldwide comparative view of the world tree, the layered heavens and the shaman's journey.",
        },
    },
    {
        id: "bayat",
        group: "research",
        author: "Fuzuli Bayat",
        title: "Türk Mitolojik Sistemi, I–II",
        year: "2007",
        publisher: "Ötüken",
        note: {
            tr: "Türk mitolojisini kozmogoni, panteon ve kült varlıklar düzeyinde sistematik olarak ele alır.",
            en: "A systematic treatment of Turkic mythology covering cosmogony, the pantheon and cult beings.",
        },
    },
    {
        id: "coruhlu",
        group: "research",
        author: "Yaşar Çoruhlu",
        title: "Türk Mitolojisinin Ana Hatları",
        year: "2002",
        publisher: "Kabalcı",
        note: {
            tr: "Kozmoloji, hayvan sembolizmi ve sanat tarihindeki mitolojik izler üzerine kapsamlı giriş.",
            en: "A broad introduction to cosmology, animal symbolism and mythological traces in art history.",
        },
    },
    {
        id: "karakurt",
        group: "research",
        author: "Deniz Karakurt",
        title: "Türk Söylence Sözlüğü",
        year: "2011",
        publisher: "e-kitap",
        note: {
            tr: "Tanrılar, iyeler ve yaratıklar için alfabetik başvuru sözlüğü (Arçura, Kamos, Abası, Bükre, Suyla vb.).",
            en: "An alphabetical reference dictionary of gods, spirits and creatures (Arçura, Kamos, Abası, Bükre, Suyla, etc.).",
        },
    },
];

export const SOURCES_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s]));
