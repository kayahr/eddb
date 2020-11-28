import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Factions, readFactionsCSV, readFactionsJSONL, streamFactionsCSV, streamFactionsJSONL } from "../main/factions";
import { createValidator, sleep, testJSON, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/factions.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/factions.json");
const factions = JSON.parse(fs.readFileSync(jsonFile).toString()) as Factions;
const factionsValidator = createValidator("factions", "Factions", sourceFiles);
const factionValidator = createValidator("faction", "Faction", sourceFiles);
const csvFile = path.join(baseDir, "src/test/data/factions.csv");
const jsonlFile = path.join(baseDir, "src/test/data/factions.jsonl");

describe("Factions", () => {
    it("matches actual JSON", () => {
        testJSONFile(factionsValidator, jsonFile);
    });
});

describe("streamFactionsCSV", () => {
    it("streams factions from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        await expect(streamFactionsCSV(input, faction => {
            testJSON(factionValidator, faction);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        const list: Factions = [];
        await expect(streamFactionsCSV(input, async faction => {
            testJSON(factionValidator, faction);
            await sleep();
            list.push(faction);
        })).toResolve();
        expect(list).toEqual(factions);
    });
});

describe("readFactionsCSV", () => {
    it("reads factions from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        expect(await readFactionsCSV(input)).toEqual(factions);
    });
});

describe("streamFactionsJSONL", () => {
    it("reads factions from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        await expect(streamFactionsJSONL(input, faction => {
            testJSON(factionValidator, faction);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        const list: Factions = [];
        await expect(streamFactionsJSONL(input, async faction => {
            testJSON(factionValidator, faction);
            await sleep();
            list.push(faction);
        })).toResolve();
        expect(list).toEqual(factions);
    });
});

describe("readFactionsJSONL", () => {
    it("reads factions from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        expect(await readFactionsJSONL(input)).toEqual(factions);
    });
});
