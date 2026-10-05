/* ================================================================
   VARLIKLAR — Her tanrı, yaratık ve iye için tek kaynak.
   Metin alanları çeviri anahtarıdır (src/locales/*.json); böylece
   varlık sayfaları ana sayfadaki metinlerle aynı içeriği kullanır.

   realm:  "sky" (Gök / Yukarı Dünya) · "middle" (Yer / Orta Dünya)
           · "under" (Yeraltı / Tamag)
   kind:   "god" · "creature" · "spirit"
   ================================================================ */

const bestiary = (id) => ({
    name: `bestiary.${id}.name`,
    type: `bestiary.${id}.type`,
    desc: `bestiary.${id}.desc`,
    loreTitle: `bestiary.${id}.loreTitle`,
    lore: [`bestiary.${id}.lore1`, `bestiary.${id}.lore2`],
    connection: `bestiary.${id}.connection`,
});

const deity = (key) => ({
    name: `pantheon.${key}.name`,
    type: `pantheon.${key}.role`,
    desc: `pantheon.${key}.desc`,
    loreTitle: `pantheon.${key}.loreTitle`,
    lore: [`pantheon.${key}.lore1`, `pantheon.${key}.lore2`],
    connection: `pantheon.${key}.connection`,
});

const iye = (key) => ({
    name: `ritual.iyeler.${key}.name`,
    type: `ritual.iyeler.${key}.type`,
    desc: `ritual.iyeler.${key}.desc`,
    loreTitle: `ritual.iyeler.${key}.loreTitle`,
    lore: [`ritual.iyeler.${key}.lore1`, `ritual.iyeler.${key}.lore2`],
    connection: `ritual.iyeler.${key}.connection`,
});

export const REALMS = ["sky", "middle", "under"];

export const ENTITIES = [
    /* ── Gök / Yukarı Dünya ───────────────────────────── */
    {
        slug: "ak-ana",
        realm: "sky",
        kind: "god",
        img: "ak-ana",
        name: "pantheon.akAna.name",
        type: "pantheon.akAna.role",
        desc: "entities.akAna.desc",
        related: ["kayra-han", "ulgen"],
        sources: ["radloff", "ogel", "bayat"],
    },
    {
        slug: "kayra-han",
        realm: "sky",
        kind: "god",
        img: "kayra-han",
        ...deity("kayra"),
        related: ["ak-ana", "ulgen", "erlik-han"],
        sources: ["radloff", "anokhin", "ogel", "inan"],
    },
    {
        slug: "ulgen",
        realm: "sky",
        kind: "god",
        img: "ulgen",
        ...deity("ulgen"),
        related: ["kayra-han", "erlik-han", "mergen", "kyzagan", "suyla"],
        sources: ["radloff", "anokhin", "inan", "roux"],
    },
    {
        slug: "mergen",
        realm: "sky",
        kind: "god",
        img: "mergen",
        ...deity("mergen"),
        related: ["ulgen", "kyzagan"],
        sources: ["anokhin", "karakurt"],
    },
    {
        slug: "kyzagan",
        realm: "sky",
        kind: "god",
        img: "kyzagan",
        ...deity("kyzagan"),
        related: ["ulgen", "mergen"],
        sources: ["anokhin", "karakurt"],
    },
    {
        slug: "umay-ana",
        realm: "sky",
        kind: "god",
        img: "umay-ana",
        ...deity("umay"),
        related: ["alkarisi", "kayra-han", "ulgen"],
        sources: ["orhun", "dlt", "inan", "roux"],
    },
    {
        slug: "suyla",
        realm: "sky",
        kind: "spirit",
        img: "suyla",
        ...iye("suyla"),
        related: ["ulgen", "kayberen"],
        sources: ["anokhin", "karakurt"],
    },

    /* ── Yer / Orta Dünya ─────────────────────────────── */
    {
        slug: "asena",
        realm: "middle",
        kind: "creature",
        img: "asena",
        ...bestiary("asena"),
        related: ["tulpar", "itbarak"],
        sources: ["chinese", "ogel", "roux"],
    },
    {
        slug: "tulpar",
        realm: "middle",
        kind: "creature",
        img: "tulpar",
        ...bestiary("tulpar"),
        related: ["asena", "kayberen"],
        sources: ["ogel", "karakurt"],
    },
    {
        slug: "itbarak",
        realm: "middle",
        kind: "creature",
        img: "itbarak",
        ...bestiary("itbarak"),
        related: ["asena"],
        sources: ["oguzkagan", "ogel"],
    },
    {
        slug: "tepegoz",
        realm: "middle",
        kind: "creature",
        img: "tepegoz",
        ...bestiary("tepegoz"),
        related: ["arcura"],
        sources: ["dedekorkut", "ogel"],
    },
    {
        slug: "arcura",
        realm: "middle",
        kind: "creature",
        img: "arcura",
        ...bestiary("arcura"),
        related: ["orman-iyesi", "tepegoz"],
        sources: ["karakurt"],
    },
    {
        slug: "bukre",
        realm: "middle",
        kind: "creature",
        img: "bukre-dragon",
        ...bestiary("bukre"),
        related: ["ulgen", "erlik-han"],
        sources: ["karakurt"],
    },
    {
        slug: "azmic",
        realm: "middle",
        kind: "creature",
        img: "azmic",
        ...bestiary("azmic"),
        related: ["jeztirnak", "alkarisi"],
        sources: ["karakurt"],
    },
    {
        slug: "jeztirnak",
        realm: "middle",
        kind: "creature",
        img: "jeztirnak",
        ...bestiary("jeztirnak"),
        related: ["azmic", "alkarisi"],
        sources: ["karakurt"],
    },
    {
        slug: "kayberen",
        realm: "middle",
        kind: "spirit",
        img: "kayberen",
        ...bestiary("kayberen"),
        related: ["orman-iyesi", "su-iyesi", "suyla"],
        sources: ["inan", "karakurt"],
    },
    {
        slug: "su-iyesi",
        realm: "middle",
        kind: "spirit",
        img: "su-iyesi",
        ...iye("suIyesi"),
        related: ["orman-iyesi", "kayberen"],
        sources: ["orhun", "inan", "karakurt"],
    },
    {
        slug: "orman-iyesi",
        realm: "middle",
        kind: "spirit",
        img: "orman-iyesi",
        ...iye("ormanIyesi"),
        related: ["su-iyesi", "arcura", "kayberen"],
        sources: ["inan", "karakurt"],
    },

    /* ── Yeraltı / Tamag ──────────────────────────────── */
    {
        slug: "erlik-han",
        realm: "under",
        kind: "god",
        img: "erlik-han",
        ...deity("erlik"),
        related: ["kayra-han", "ulgen", "abasi", "kamos", "alkarisi"],
        sources: ["radloff", "anokhin", "inan", "bayat"],
    },
    {
        slug: "alkarisi",
        realm: "under",
        kind: "creature",
        img: "alkarisi",
        ...bestiary("alkarisi"),
        related: ["umay-ana", "erlik-han", "abasi"],
        sources: ["inan", "bayat", "karakurt"],
    },
    {
        slug: "abasi",
        realm: "under",
        kind: "creature",
        img: "abasi",
        ...bestiary("abasi"),
        related: ["erlik-han", "kamos"],
        sources: ["bayat", "karakurt"],
    },
    {
        slug: "yegi",
        realm: "under",
        kind: "creature",
        img: "yegi",
        ...bestiary("yegi"),
        related: ["erlik-han", "abasi", "kamos"],
        sources: ["karakurt"],
    },
    {
        slug: "kamos",
        realm: "under",
        kind: "creature",
        img: "kamos",
        ...bestiary("kamos"),
        related: ["erlik-han", "abasi"],
        sources: ["karakurt"],
    },
];

export const ENTITIES_BY_SLUG = Object.fromEntries(ENTITIES.map((e) => [e.slug, e]));

export const entitiesInRealm = (realm) => ENTITIES.filter((e) => e.realm === realm);

/* Ana sayfa bölümlerindeki anahtarlardan varlık sayfası adresine */
export const entityHref = (slug) => `/varlik/${slug}`;
