import * as fs from "fs";
import * as path from "path";
import { parse } from "../src/sudashi-synonyms-parser";

describe("sudashi-synonyms-parser", function() {
    it("example", () => {
        const content = fs.readFileSync(path.join(__dirname, "fixtures/synonyms.txt"), "utf-8");
        const items = parse(content);
        console.log(items[99]);
    });
});
