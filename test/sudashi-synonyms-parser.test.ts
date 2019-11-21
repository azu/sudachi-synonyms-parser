import * as fs from "fs";
import * as path from "path";
import { parse } from "../src/sudashi-synonyms-parser";
import * as assert from "assert";

describe("sudashi-synonyms-parser", function() {
    it("example", () => {
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
    });
    it("validate synonyms", () => {
        const content = fs.readFileSync(path.join(__dirname, "fixtures/synonyms.txt"), "utf-8");
        const groups = parse(content);
        groups.forEach(group => {
            assert.strictEqual(typeof group.id, "string");
            assert.ok(Array.isArray(group.items));
            group.items.forEach(item => {
                assert.strictEqual(typeof item.vocabularyNumber, "number");
                assert.strictEqual(typeof item.taigenYogen, "string");
                assert.strictEqual(typeof item.expandControl, "number");
                assert.strictEqual(typeof item.gokeiSyubetsu, "string");
                assert.strictEqual(typeof item.hyoukiYure, "string");
                assert.strictEqual(typeof item.ryakusyou, "string");
                assert.ok(Array.isArray(item.bunya));
                assert.strictEqual(typeof item.midashi, "string");
            });
        });
    });
});
