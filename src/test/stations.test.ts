import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { readStationsJSONL, Stations, streamStationsJSONL } from "../main/stations";
import { createValidator, sleep, testJSON, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/stations.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/stations.json");
const stations = JSON.parse(fs.readFileSync(jsonFile).toString()) as Stations;
const stationsValidator = createValidator("stations", "Stations", sourceFiles);
const stationValidator = createValidator("station", "Station", sourceFiles);
const jsonlFile = path.join(baseDir, "src/test/data/stations.jsonl");

describe("Stations", () => {
    it("matches actual JSON", () => {
        testJSONFile(stationsValidator, jsonFile);
    });
});

describe("streamStationsJSONL", () => {
    it("reads stations from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        await expect(streamStationsJSONL(input, station => {
            testJSON(stationValidator, station);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        const list: Stations = [];
        await expect(streamStationsJSONL(input, async station => {
            testJSON(stationValidator, station);
            await sleep();
            list.push(station);
        })).toResolve();
        expect(list).toEqual(stations);
    });
});

describe("readStationsJSONL", () => {
    it("reads stations from JSONL stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
        expect(await readStationsJSONL(input)).toEqual(stations);
    });
});
