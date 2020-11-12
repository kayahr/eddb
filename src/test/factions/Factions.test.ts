import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Allegiances } from "../../main/common/Allegiances";
import { Governments } from "../../main/common/Governments";
import { Factions, FactionsJSON } from "../../main/factions/Factions";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/factions/Factions.ts"),
    path.join(baseDir, "src/main/factions/Faction.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/factions.json");
const jsonlFile = path.join(baseDir, "src/test/data/factions.jsonl");
const csvFile = path.join(baseDir, "src/test/data/factions.csv");
const factionsJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as FactionsJSON;
const governments = new Governments();
const allegiances = new Allegiances();
const factions = Factions.fromJSON(factionsJSON, { governments, allegiances });

describe("FactionsJSON", () => {
    it("matches actual JSON", () => {
        testSchema("factions", "FactionsJSON", sourceFiles, jsonFile);
    });
});

describe("Factions", () => {
    describe("toJSON", () => {
        it("writes exact JSON as the one the Factions were read from", () => {
            expect(factions.toJSON()).toEqual(factionsJSON);
        });
    });

    describe("fromJSON", () => {
        it("allows gathering governments and allegiances", () => {
            const governments = new Governments();
            const allegiances = new Allegiances();
            Factions.fromJSON(factionsJSON, { governments, allegiances });
            expect(governments.getAll().length).toBeGreaterThan(0);
            expect(allegiances.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("fromCSV", () => {
        it("reads factions from CSV", async () => {
            const factions = await Factions.fromCSV(fs.createReadStream(csvFile));
            expect(factions.toJSON()).toEqual(factionsJSON);
        });
        it("allows gathering governments and allegiances", async () => {
            const governments = new Governments();
            const allegiances = new Allegiances();
            await Factions.fromCSV(fs.createReadStream(csvFile), { governments, allegiances });
            expect(governments.getAll().length).toBeGreaterThan(0);
            expect(allegiances.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("fromJSONL", () => {
        it("reads factions from JSONL", async () => {
            const factions = await Factions.fromJSONL(readline.createInterface(
                { input: fs.createReadStream(jsonlFile) }));
            expect(factions.toJSON()).toEqual(factionsJSON);
        });
        it("allows gathering governments and allegiances", async () => {
            const governments = new Governments();
            const allegiances = new Allegiances();
            await Factions.fromJSONL(readline.createInterface({ input: fs.createReadStream(jsonlFile) }),
                { governments, allegiances });
            expect(governments.getAll().length).toBeGreaterThan(0);
            expect(allegiances.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("getAll", () => {
        it("returns all factions", () => {
            expect(factions.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when commodity exists", () => {
            expect(factions.has(14271)).toBe(true);
            expect(factions.has("Canonn")).toBe(true);
        });
        it("returns false when commodity does not exists", () => {
            expect(factions.has(123456)).toBe(false);
            expect(factions.has("void")).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single faction by id", () => {
            expect(factions.get(14271).getName()).toBe("Canonn");
        });
        it("returns single faction by name", () => {
            expect(factions.get("Canonn").getId()).toBe(14271);
        });
        it("throws exception when faction not found by name", () => {
            expect(() => factions.get("Void")).toThrowWithMessage(NotFoundException, "Void not found in Factions");
        });
        it("throws exception when faction not found by id", () => {
            expect(() => factions.get(123456)).toThrowWithMessage(NotFoundException, "123456 not found in Factions");
        });
    });
});
