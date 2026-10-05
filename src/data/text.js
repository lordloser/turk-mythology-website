import tr from "@/locales/tr.json";

/* Sunucu tarafında (metadata üretimi) Türkçe metni anahtardan okur, HTML'i temizler */
export function trText(key) {
    const value = key.split(".").reduce((obj, part) => obj?.[part], tr);
    return typeof value === "string" ? value.replace(/<[^>]+>/g, "") : "";
}

export function truncate(text, max = 160) {
    if (text.length <= max) return text;
    return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}
