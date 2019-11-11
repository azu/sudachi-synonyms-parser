import Papa from "papaparse";

export const parse = (text: string) => {
    const synonymsList = text.trim().split(/(?:\r\n){2}/);
    return synonymsList.map(synonyms => parseSynonyms(synonyms));
};

export type SudachiSynonyms = {
    /**
     * 0 : グループ番号
     * 同義語として登録する見出しには、共通のグループ番号を付与します。 この番号は、ソース内で同義語の管理・識別に使用するため、一度発行したグループ番号は変更しません。 グループ番号は6桁の数字で表します。
     */
    groupNo: number;
    /**
     * 1 : 体言/用言フラグ
     * 見出しが体言か用言かを管理・識別する情報です。省略することもできます。
     */
    taigenYogen: "体言" | "用言" | undefined;
    /**
     * 2 : 展開制御フラグ
     * 同義語展開をする・しないを制御する情報です。省略することもできます。
     * 省略した場合は、「0 : 常に展開に使用する」と同じ扱いになります。
     * 0 : 常に展開に使用する
     * 1 : 自分自身が展開のトリガーとはならないが、同グループ内の別の見出しからは展開される
     * 2 : 常に展開に使用しない ※削除履歴として利用 (弊害語などが誤って再登録されるのを防ぐため)
     */
    expandControl: 0 | 1 | 2;
    /**
     * 3 : グループ内の語彙番号
     * グループ内における、同一語彙の管理番号です。省略することもできます。 "1"始まりで連番を付与します。
     * 「異表記や、外来語の表記ゆれ、原語綴り、対訳、略語、略称、別称 (通称・愛称、等) 、旧称、間違い」は、表記や語形が異なるだけで、同じ語彙と見なします。
     */
    noInGroup: number | undefined;
    /**
     * 4 : 同一語彙内での語形種別
     * 同一語彙内 (3の番号が同じもの) における語形の関連性を示す情報です。省略することもできます。
     * 0 : 代表語
     * 1 : (代表語から見て) 対訳
     * 2 : (代表語から見て) 別称 (通称・愛称等)
     * 3 : (代表語から見て) 旧称
     * 4 : (代表語から見て) 間違い
     */
    gokeiSyubetsu: "代表語" | "対訳" | "別称" | "旧称" | "間違い" | undefined;
    /**
     * 5 : 同じ語形の語の中での略語・略称情報
     * 同じ語形の語 (3、4の番号が同じもの) における、略語・略称の関係を示す情報です。省略することもできます。
     * 0 : 代表語形
     * 1 : (代表語形から見て) 略語・略称 (アルファベット表記)
     * 2 : (代表語形から見て) 略語・略称 (1以外)
     */
    ryakushou: "代表語形" | "略語・略称/アルファベット" | "略語・略称" | undefined;
    /**
     * 6 : 同じ語形の語の中での表記揺れ情報
     * 同じ語形の語 (3、4、5の番号が同じもの) における、表記の関連性を示す情報です。省略することもできます。
     */
    hyoukiYure: "代表表記" | "アルファベット表記" | "異表記・表記ゆれ" | "間違い表記" | undefined;
    /**
     * 7 : 分野情報
     * 見出しが、どういう分野の語句であるかを示す情報です。省略することもできます。
     */
    bunya: string[];
    /**
     * 8 : 見出し
     * 同義語辞書に登録される語句です。
     */
    midashi: string;
};
/**
 * csv format
 * 0 : グループ番号
 * 1 : 体言/用言フラグ (省略可)
 * 2 : 展開制御フラグ (省略可)
 * 3 : グループ内の語彙番号 (省略可)
 * 4 : 同一語彙内での語形種別 (省略可)
 * 5 : 同じ語形の語の中での略語情報 (省略可)
 * 6 : 同じ語形の語の中での表記揺れ情報 (省略可)
 * 7 : 分野情報 (省略可)
 * 8 : 見出し
 * 9 : 予約
 * 10 : 予約
 * @param csv
 */
export const parseSynonyms = (csv: string): SudachiSynonyms[] => {
    const result = Papa.parse(csv);
    return result.data.map(item => {
        const groupNo: SudachiSynonyms["groupNo"] = Number(item[0]);
        const taigenYogen: SudachiSynonyms["taigenYogen"] =
            item[1] === "1" ? "体言" : item[1] === "2" ? "用言" : undefined;
        const expandControl: SudachiSynonyms["expandControl"] =
            item[2] === undefined ? 0 : (Number(item[2]) as SudachiSynonyms["expandControl"]);
        const noInGroup: SudachiSynonyms["noInGroup"] = item[3] !== undefined ? Number(item[3]) : undefined;
        const gokeiSyubetsu: SudachiSynonyms["gokeiSyubetsu"] =
            item[4] === "0"
                ? "代表語"
                : item[4] === "1"
                ? "対訳"
                : item[4] === "2"
                ? "別称"
                : item[4] === "3"
                ? "旧称"
                : item[4] === "4"
                ? "間違い"
                : undefined;
        const ryakushou: SudachiSynonyms["ryakushou"] =
            item[5] === "0"
                ? "代表語形"
                : item[5] === "1"
                ? "略語・略称/アルファベット"
                : item[5] === "2"
                ? "略語・略称"
                : undefined;
        const hyoukiYure: SudachiSynonyms["hyoukiYure"] =
            item[6] === "1"
                ? "代表表記"
                : item[6] === "2"
                ? "アルファベット表記"
                : item[6] === "3"
                ? "異表記・表記ゆれ"
                : item[6] === "4"
                ? "間違い表記"
                : undefined;
        const bunya: SudachiSynonyms["bunya"] =
            item[7] !== undefined
                ? item[7]
                      .substring(1, item[7].length - 1)
                      .split("/")
                      .filter((word: string) => word !== "")
                : [];
        const midashi: SudachiSynonyms["midashi"] = item[8];
        return {
            groupNo,
            taigenYogen,
            expandControl,
            noInGroup,
            gokeiSyubetsu,
            ryakushou,
            hyoukiYure,
            bunya,
            midashi
        };
    });
};
