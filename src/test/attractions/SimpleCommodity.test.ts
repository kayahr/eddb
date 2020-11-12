import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { SimpleCommodity } from "../../main/attractions/SimpleCommodity";
import { Commodities, CommoditiesJSON } from "../../main/commodities/Commodities";

const baseDir = path.join(__dirname, "../../..");
const jsonFile = path.join(baseDir, "src/test/data/commodities.json");
const commoditiesJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as CommoditiesJSON;
const commodities = Commodities.fromJSON(commoditiesJSON);

describe("AttractionCommodity", () => {
    describe("getCommodity", () => {
        it("returns references commodity", () => {
            const simpleCommodity = new SimpleCommodity(2, "Hydrogen Fuel");
            expect(simpleCommodity.getCommodity(commodities).getCategory().getName()).toBe("Chemicals");
        });
        it("throws error when commodity not found", () => {
            const simpleCommodity = new SimpleCommodity(1232, "Something");
            expect(() => simpleCommodity.getCommodity(commodities)).toThrowWithMessage(NotFoundException,
                "1232 not found in Commodities");
        });
    });
});
