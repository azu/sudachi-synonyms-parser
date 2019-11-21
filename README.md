# sudachi-synonyms-parser

Sudachi's [synonyms dictionary](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md) parser.

## Features

- Sudachi's [synonyms dictionary](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md) to JSON
    - Source: https://raw.githubusercontent.com/WorksApplications/SudachiDict/develop/src/main/text/synonyms.txt

## Install

Install with [npm](https://www.npmjs.com/):

    npm install sudachi-synonyms-parser

## Usage

```ts
export declare type SudachiSynonymsGroup = {
    /**
     * 0 : グループ番号
     * 同義語として登録する見出しには、共通のグループ番号を付与します。 この番号は、ソース内で同義語の管理・識別に使用するため、一度発行したグループ番号は変更しません。 グループ番号は6桁の数字で表します。
     */
    id: string;
    items: SudachiSynonyms[];
};
export declare type SudachiSynonyms = {
    /**
     * 1 : 体言/用言フラグ
     * 見出しが体言か用言かを管理・識別する情報です。省略された場合は"未定義"になります。
     */
    taigenYogen: "体言" | "用言" | "未定義";
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
    vocabularyNumber: number | undefined;
    /**
     * 4 : 同一語彙内での語形種別
     * 同一語彙内 (3の番号が同じもの) における語形の関連性を示す情報です。省略することもできます。
     * 0 : 代表語
     * 1 : (代表語から見て) 対訳
     * 2 : (代表語から見て) 別称 (通称・愛称等)
     * 3 : (代表語から見て) 旧称
     * 4 : (代表語から見て) 間違い
     */
    gokeiSyubetsu: "代表語" | "対訳" | "別称" | "旧称" | "間違い" | "未定義";
    /**
     * 5 : 同じ語形の語の中での略語・略称情報
     * 同じ語形の語 (3、4の番号が同じもの) における、略語・略称の関係を示す情報です。省略された場合は"未定義"になります。
     * 0 : 代表語形
     * 1 : (代表語形から見て) 略語・略称 (アルファベット表記)
     * 2 : (代表語形から見て) 略語・略称 (1以外)
     */
    ryakusyou: "代表語形" | "略語・略称/アルファベット" | "略語・略称" | "未定義";
    /**
     * 6 : 同じ語形の語の中での表記揺れ情報
     * 同じ語形の語 (3、4、5の番号が同じもの) における、表記の関連性を示す情報です。省略された場合は"未定義"になります。
     */
    hyoukiYure: "代表表記" | "アルファベット表記" | "異表記・表記ゆれ" | "間違い表記" | "未定義";
    /**
     * 7 : 分野情報
     * 見出しが、どういう分野の語句であるかを示す情報です。省略することもできます。
     * 省略した場合は空の配列になります
     */
    bunya: string[];
    /**
     * 8 : 見出し
     * 同義語辞書に登録される語句です。
     */
    midashi: string;
};
/**
 * synonyms.txtのコンテンツ(空改行区切りのCSV)からSudachiSynonymsGroupの配列を返します
 * @param text
 */
export declare const parse: (text: string) => SudachiSynonymsGroup[];
/**
 * グループのCSVからSudachiSynonymsGroupを返します。。
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
 * @return SudachiSynonyms[]
 */
export declare const parseSynonyms: (csv: string) => SudachiSynonymsGroup;
```

## Example

```js
import { parse } from "sudachi-synonyms-parser";
const content = fs.readFileSync(path.join(__dirname, "fixtures/synonyms.txt"), "utf-8");
const groups = parse(content);
assert.deepStrictEqual(groups[45], {
   "id": "000050",
   "items": [{
       "taigenYogen": "体言",
       "expandControl": 0,
       "vocabularyNumber": 1,
       "gokeiSyubetsu": "代表語",
       "ryakusyou": "代表語形",
       "hyoukiYure": "代表表記",
       "bunya": ["IT"],
       "midashi": "アドミニストレーター"
   }, {
       "taigenYogen": "体言",
       "expandControl": 0,
       "vocabularyNumber": 1,
       "gokeiSyubetsu": "代表語",
       "ryakusyou": "代表語形",
       "hyoukiYure": "異表記・表記ゆれ",
       "bunya": ["IT"],
       "midashi": "アドミニストレータ"
   }, {
       "taigenYogen": "体言",
       "expandControl": 0,
       "vocabularyNumber": 1,
       "gokeiSyubetsu": "代表語",
       "ryakusyou": "代表語形",
       "hyoukiYure": "アルファベット表記",
       "bunya": ["IT"],
       "midashi": "administrator"
   }, {
       "taigenYogen": "体言",
       "expandControl": 0,
       "vocabularyNumber": 1,
       "gokeiSyubetsu": "代表語",
       "ryakusyou": "略語・略称",
       "hyoukiYure": "代表表記",
       "bunya": ["IT"],
       "midashi": "アドミニ"
   }]
});


```

## Changelog

See [Releases page](https://github.com/azu/sudachi-synonyms-parser/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/sudachi-synonyms-parser/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

This repository include synonyms.txt that is Apache License.

> Copyright (c) 2017 Works Applications Co., Ltd.
> https://github.com/WorksApplications/SudachiDict/blob/develop/LICENSE-2.0.txt

- [test/fixtures/synonyms.txt](test/fixtures/synonyms.txt)
