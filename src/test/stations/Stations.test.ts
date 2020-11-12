import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Stations, StationsJSON } from "../../main/stations/Stations";
import { createFactories } from "../../main/util/Factories";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/stations/Station.ts"),
    path.join(baseDir, "src/main/stations/Stations.ts"),
    path.join(baseDir, "src/main/stations/Stations.ts")
];

const jsonFile = path.join(baseDir, "src/test/data/stations.json");
const jsonlFile = path.join(baseDir, "src/test/data/stations.jsonl");
const stationsJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as StationsJSON;
const stations = Stations.fromJSON(stationsJSON);

describe("StationsJSON", () => {
    it("matches actual JSON", () => {
        testSchema("stations", "StationsJSON", sourceFiles, jsonFile);
    });
});

describe("Stations", () => {
    describe("toJSON", () => {
        it("writes exact JSON as the one the Stations were read from", () => {
            expect(stations.toJSON()).toEqual(stationsJSON);
        });
    });

    describe("fromJSON", () => {
        it("allows gathering sub entities", () => {
            const factories = createFactories();
            Stations.fromJSON(stationsJSON, factories);
            expect(factories.governments.getAll().length).toBeGreaterThan(0);
            expect(factories.allegiances.getAll().length).toBeGreaterThan(0);
            expect(factories.states.getAll().length).toBeGreaterThan(0);
            expect(factories.economies.getAll().length).toBeGreaterThan(0);
            expect(factories.stationTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSecurities.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSizes.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("fromJSONL", () => {
        it("ready data from JSONL file", async () => {
            const stationsJSONL = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
            const stations = await Stations.fromJSONL(stationsJSONL);
            expect(stations.toJSON()).toEqual(stationsJSON);
        });
        it("allows gathering sub entities", async () => {
            const factories = createFactories();
            const stationsJSONL = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
            await Stations.fromJSONL(stationsJSONL, factories);
            expect(factories.governments.getAll().length).toBeGreaterThan(0);
            expect(factories.allegiances.getAll().length).toBeGreaterThan(0);
            expect(factories.states.getAll().length).toBeGreaterThan(0);
            expect(factories.economies.getAll().length).toBeGreaterThan(0);
            expect(factories.stationTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSecurities.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSizes.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("getAll", () => {
        it("returns all stations", () => {
            expect(stations.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when station exists", () => {
            expect(stations.has(46518)).toBe(true);
        });
        it("returns false when station does not exists", () => {
            expect(stations.has(123456)).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single station by id", () => {
            expect(stations.get(46518).getName()).toBe("Ross Holdings");
        });
        it("throws exception when station not found by id", () => {
            expect(() => stations.get(123456)).toThrowWithMessage(NotFoundException, "123456 not found in Stations");
        });
    });
});
