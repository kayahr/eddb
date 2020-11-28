import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { readSystemsCSV, readSystemsJSONL, streamSystemsCSV, streamSystemsJSONL, Systems } from "../main/systems";
import { createValidator, sleep, testJSON, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/systems.ts")
];
const populatedSystemsJSONFile = path.join(baseDir, "src/test/data/systems_populated.json");
const populatedSystems = JSON.parse(fs.readFileSync(populatedSystemsJSONFile).toString()) as Systems;
const systemsJSONFile = path.join(baseDir, "src/test/data/systems.json");
const systems = JSON.parse(fs.readFileSync(systemsJSONFile).toString()) as Systems;
const systemsValidator = createValidator("systems", "Systems", sourceFiles);
const systemValidator = createValidator("system", "System", sourceFiles);
const csvFile = path.join(baseDir, "src/test/data/systems.csv");
const jsonlFile = path.join(baseDir, "src/test/data/systems_populated.jsonl");

describe("Systems", () => {
    it("matches actual JSON", () => {
        testJSONFile(systemsValidator, systemsJSONFile);
        testJSONFile(systemsValidator, populatedSystemsJSONFile);
    });
});

describe("streamSystemsCSV", () => {
    it("streams systems from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        await expect(streamSystemsCSV(input, system => {
            testJSON(systemValidator, system);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        const list: Systems = [];
        await expect(streamSystemsCSV(input, async system => {
            testJSON(systemValidator, system);
            await sleep();
            list.push(system);
        })).toResolve();
        expect(list).toEqual(systems);
    });
});

describe("readSystemsCSV", () => {
    it("reads systems from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        expect(await readSystemsCSV(input)).toEqual(systems);
    });
});

describe("streamSystemsJSONL", () => {
    it("reads systems from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        await expect(streamSystemsJSONL(input, system => {
            testJSON(systemValidator, system);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        const list: Systems = [];
        await expect(streamSystemsJSONL(input, async system => {
            testJSON(systemValidator, system);
            await sleep();
            list.push(system);
        })).toResolve();
        expect(list).toEqual(populatedSystems);
    });
});

describe("readSystemsJSONL", () => {
    it("reads systems from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        expect(await readSystemsJSONL(input)).toEqual(populatedSystems);
    });
});
