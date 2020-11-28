import "jest-extended";

import * as path from "path";

import { createValidator, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/commodities.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/commodities.json");

describe("Commodities", () => {
    it("matches actual JSON", () => {
        testJSONFile(createValidator("commodities", "Commodities", sourceFiles), jsonFile);
    });
});
