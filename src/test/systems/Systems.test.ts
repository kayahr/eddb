import "jest-extended";

import { compare } from "@kayahr/kaylib/lib/main/lang/Comparable";
import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Systems, SystemsJSON } from "../../main/systems/Systems";
import { createFactories } from "../../main/util/Factories";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/systems/System.ts"),
    path.join(baseDir, "src/main/systems/Systems.ts"),
    path.join(baseDir, "src/main/systems/FactionPresence.ts")
];

const jsonFile = path.join(baseDir, "src/test/data/systems_populated.json");
const jsonlFile = path.join(baseDir, "src/test/data/systems_populated.jsonl");
const systemsJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as SystemsJSON;
const systems = Systems.fromJSON(systemsJSON);

describe("SystemsJSON", () => {
    it("matches actual JSON", () => {
        testSchema("systems", "SystemsJSON", sourceFiles, jsonFile);
    });
});

describe("Systems", () => {
    it("can be sorted alphabetically", () => {
        const expected = systems.getAll().map(system => system.getName()).sort((a, b) => a.localeCompare(b));
        const sorted = systems.getAll().sort(compare).map(system => system.getName());
        expect(sorted).toEqual(expected);
    });

    describe("toJSON", () => {
        it("writes exact JSON as the one the Systems were read from", () => {
            expect(systems.toJSON()).toEqual(systemsJSON);
        });
    });

    describe("fromJSON", () => {
        it("allows gathering sub entities", () => {
            const factories = createFactories();
            Systems.fromJSON(systemsJSON, factories);
            expect(factories.governments.getAll().length).toBeGreaterThan(0);
            expect(factories.allegiances.getAll().length).toBeGreaterThan(0);
            expect(factories.states.getAll().length).toBeGreaterThan(0);
            expect(factories.economies.getAll().length).toBeGreaterThan(0);
            expect(factories.securities.getAll().length).toBeGreaterThan(0);
            expect(factories.powerStates.getAll().length).toBeGreaterThan(0);
            expect(factories.reserveTypes.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("fromJSONL", () => {
        it("ready data from JSONL file", async () => {
            const systemsJSONL = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
            const systems = await Systems.fromJSONL(systemsJSONL);
            expect(systems.toJSON()).toEqual(systemsJSON);
        });
        it("allows gathering sub entities", async () => {
            const factories = createFactories();
            const systemsJSONL = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
            await Systems.fromJSONL(systemsJSONL, factories);
            expect(factories.governments.getAll().length).toBeGreaterThan(0);
            expect(factories.allegiances.getAll().length).toBeGreaterThan(0);
            expect(factories.states.getAll().length).toBeGreaterThan(0);
            expect(factories.economies.getAll().length).toBeGreaterThan(0);
            expect(factories.securities.getAll().length).toBeGreaterThan(0);
            expect(factories.powerStates.getAll().length).toBeGreaterThan(0);
            expect(factories.reserveTypes.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("getAll", () => {
        it("returns all systems", () => {
            expect(systems.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when system exists", () => {
            expect(systems.has(18454)).toBe(true);
        });
        it("returns false when system does not exists", () => {
            expect(systems.has(123456)).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single system by id", () => {
            expect(systems.get(18454).getName()).toBe("Varati");
        });
        it("throws exception when system not found by id", () => {
            expect(() => systems.get(123456)).toThrowWithMessage(NotFoundException, "123456 not found in Systems");
        });
    });
});
