import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { Commodities, CommoditiesJSON } from "../../main/commodities/Commodities";
import { CommodityCategories } from "../../main/commodities/CommodityCategories";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/commodities/Commodities.ts"),
    path.join(baseDir, "src/main/commodities/Commodity.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/commodities.json");
const commoditiesJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as CommoditiesJSON;
const commodityCategories = new CommodityCategories();
const commodities = Commodities.fromJSON(commoditiesJSON, { commodityCategories });

describe("CommoditiesJSON", () => {
    it("matches actual JSON", () => {
        testSchema("commodities", "CommoditiesJSON", sourceFiles, jsonFile);
    });
});

describe("Commodities", () => {
    describe("toJSON", () => {
        it("writes exact JSON as the one the Commodities were read from", () => {
            expect(commodities.toJSON()).toEqual(commoditiesJSON);
        });
    });

    describe("fromJSON", () => {
        it("allows gathering commodity categories", () => {
            const commodityCategories = new CommodityCategories();
            Commodities.fromJSON(commoditiesJSON, { commodityCategories });
            expect(commodityCategories.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("getAll", () => {
        it("returns all commodities", () => {
            expect(commodities.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when commodity exists", () => {
            expect(commodities.has(72)).toBe(true);
            expect(commodities.has("Leather")).toBe(true);
        });
        it("returns false when commodity does not exists", () => {
            expect(commodities.has(123456)).toBe(false);
            expect(commodities.has("Cola")).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single commodity by id", () => {
            expect(commodities.get(72).getName()).toBe("Leather");
        });
        it("returns single commodity by name", () => {
            expect(commodities.get("Leather").getId()).toBe(72);
        });
        it("throws exception when commodity not found by name", () => {
            expect(() => commodities.get("Cola")).toThrowWithMessage(NotFoundException,
                "Cola not found in Commodities");
        });
        it("throws exception when commodity not found by id", () => {
            expect(() => commodities.get(123456)).toThrowWithMessage(NotFoundException,
                "123456 not found in Commodities");
        });
    });
});
