# sudashi-synonyms-parser

Sudachi's [synonyms dictionary](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md) parser.

## Features

- CSV to JSON
    - https://raw.githubusercontent.com/WorksApplications/SudachiDict/develop/src/main/text/synonyms.txt

## Install

Install with [npm](https://www.npmjs.com/):

    npm install sudashi-synonyms-parser

## Usage

```js
import { parse } from "sudashi-synonyms-parser";
const content = fs.readFileSync(path.join(__dirname, "fixtures/synonyms.txt"), "utf-8");
const groups = parse(content);
assert.deepStrictEqual(groups[45], {
    "id": "000050",
    "items": [{
        "taigenYogen": "体言",
        "expandControl": 0,
        "index": 1,
        "gokeiSyubetsu": "代表語",
        "ryakusyou": "代表語形",
        "hyoukiYure": "未定義",
        "bunya": ["IT"],
        "midashi": "アドミニストレーター"
    }, {
        "taigenYogen": "体言",
        "expandControl": 0,
        "index": 1,
        "gokeiSyubetsu": "代表語",
        "ryakusyou": "代表語形",
        "hyoukiYure": "アルファベット表記",
        "bunya": ["IT"],
        "midashi": "アドミニストレータ"
    }, {
        "taigenYogen": "体言",
        "expandControl": 0,
        "index": 1,
        "gokeiSyubetsu": "代表語",
        "ryakusyou": "代表語形",
        "hyoukiYure": "代表表記",
        "bunya": ["IT"],
        "midashi": "administrator"
    }, {
        "taigenYogen": "体言",
        "expandControl": 0,
        "index": 1,
        "gokeiSyubetsu": "代表語",
        "ryakusyou": "略語・略称",
        "hyoukiYure": "未定義",
        "bunya": ["IT"],
        "midashi": "アドミニ"
    }]
});


```

## Changelog

See [Releases page](https://github.com/azu/sudashi-synonyms-parser/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/sudashi-synonyms-parser/issues).

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
