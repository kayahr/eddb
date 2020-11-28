import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Attractions, readAttractionsJSONL, streamAttractionsJSONL } from "../main/attractions";
import { createValidator, sleep, testJSON, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/attractions.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/attractions.json");
const attractions = JSON.parse(fs.readFileSync(jsonFile).toString()) as Attractions;
const attractionsValidator = createValidator("attractions", "Attractions", sourceFiles);
const attractionValidator = createValidator("attraction", "Attraction", sourceFiles);
const jsonlFile = path.join(baseDir, "src/test/data/attractions.jsonl");

describe("Attractions", () => {
    it("matches actual JSON", () => {
        testJSONFile(attractionsValidator, jsonFile);
    });
});

describe("streamAttractionsJSONL", () => {
    it("reads attractions from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        await expect(streamAttractionsJSONL(input, attraction => {
            testJSON(attractionValidator, attraction);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        const list: Attractions = [];
        await expect(streamAttractionsJSONL(input, async attraction => {
            testJSON(attractionValidator, attraction);
            await sleep();
            list.push(attraction);
        })).toResolve();
        expect(list).toEqual(attractions);
    });
});

describe("readAttractionsJSONL", () => {
    it("reads attractions from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        expect(await readAttractionsJSONL(input)).toEqual(attractions);
    });
});
