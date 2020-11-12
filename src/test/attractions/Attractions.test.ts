import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Attractions, AttractionsJSON } from "../../main/attractions/Attractions";
import { createFactories } from "../../main/util/Factories";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/attractions/Attraction.ts"),
    path.join(baseDir, "src/main/attractions/Attractions.ts"),
    path.join(baseDir, "src/main/attractions/Attractions.ts"),
    path.join(baseDir, "src/main/attractions/AttractionLayout.ts"),
    path.join(baseDir, "src/main/attractions/AttractionMaterial.ts"),
    path.join(baseDir, "src/main/attractions/AttractionCommodity.ts")
];

const jsonFile = path.join(baseDir, "src/test/data/attractions.json");
const jsonlFile = path.join(baseDir, "src/test/data/attractions.jsonl");
const attractionsJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as AttractionsJSON;
const attractions = Attractions.fromJSON(attractionsJSON);

describe("AttractionsJSON", () => {
    it("matches actual JSON", () => {
        testSchema("attractions", "AttractionsJSON", sourceFiles, jsonFile);
    });
});

describe("Attractions", () => {
    describe("toJSON", () => {
        it("writes exact JSON as the one the Attractions were read from", () => {
            expect(attractions.toJSON()).toEqual(attractionsJSON);
        });
    });

    describe("fromJSON", () => {
        it("allows gathering sub entities", () => {
            const factories = createFactories();
            Attractions.fromJSON(attractionsJSON, factories);
            expect(factories.allegiances.getAll().length).toBeGreaterThan(0);
            expect(factories.attractionBodies.getAll().length).toBeGreaterThan(0);
            expect(factories.attractionGroups.getAll().length).toBeGreaterThan(0);
            expect(factories.attractionLayouts.getAll().length).toBeGreaterThan(0);
            expect(factories.beaconTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.governments.getAll().length).toBeGreaterThan(0);
            expect(factories.installationTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.races.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSecurities.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementSizes.getAll().length).toBeGreaterThan(0);
            expect(factories.settlementTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.shipwreckTypes.getAll().length).toBeGreaterThan(0);
            expect(factories.simpleCommodities.getAll().length).toBeGreaterThan(0);
            expect(factories.simpleMaterials.getAll().length).toBeGreaterThan(0);
            expect(factories.threatLevels.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("fromJSONL", () => {
        it("ready data from JSONL file", async () => {
            const attractionsJSONL = readline.createInterface({ input: fs.createReadStream(jsonlFile) });
            const attractions = await Attractions.fromJSONL(attractionsJSONL);
            expect(attractions.toJSON()).toEqual(attractionsJSON);
        });
    });

    describe("getAll", () => {
        it("returns all attractions", () => {
            expect(attractions.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when attraction exists", () => {
            expect(attractions.has(73512)).toBe(true);
        });
        it("returns false when attraction does not exists", () => {
            expect(attractions.has(123456)).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single attraction by id", () => {
            expect(attractions.get(73512).getName()).toBe("Jameson Crash Site");
        });
        it("throws exception when attraction not found by id", () => {
            expect(() => attractions.get(987)).toThrowWithMessage(NotFoundException, "987 not found in Attractions");
        });
    });
});
