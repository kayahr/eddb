import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { Commodities, CommoditiesJSON } from "../../main/commodities/Commodities";
import { Price } from "../../main/prices/Price";
import { Stations, StationsJSON } from "../../main/stations/Stations";

const priceCSV = [ "1", "66", "10", "4", "5", "6", "7", "8", "9", "10" ];
const price = Price.fromCSV(priceCSV);

const baseDir = path.join(__dirname, "../../..");
const stationsFile = path.join(baseDir, "src/test/data/stations.json");
const stationsJSON = JSON.parse(fs.readFileSync(stationsFile).toString()) as StationsJSON;
const stations = Stations.fromJSON(stationsJSON);

const commoditiesFile = path.join(baseDir, "src/test/data/commodities.json");
const commoditiesJSON = JSON.parse(fs.readFileSync(commoditiesFile).toString()) as CommoditiesJSON;
const commodities = Commodities.fromJSON(commoditiesJSON);

describe("Price", () => {
    describe("getters", () => {
        it("return the correct values", () => {
            expect(price.getId()).toBe(1);
            expect(price.getStationId()).toBe(66);
            expect(price.getCommodityId()).toBe(10);
            expect(price.getSupply()).toBe(4);
            expect(price.getSupplyBracket()).toBe(5);
            expect(price.getBuyPrice()).toBe(6);
            expect(price.getSellPrice()).toBe(7);
            expect(price.getDemand()).toBe(8);
            expect(price.getDemandBracket()).toBe(9);
            expect(price.getCollectedAt()).toEqual(new Date(10 * 1000));
        });
    });

    describe("getStation", () => {
        it("looks up the station this price belongs to in the given station list", () => {
            expect(price.getStation(stations)?.getId()).toBe(66);
        });
        it("throws exception when station was not found in provided list", () => {
            expect(() => price.getStation(new Stations())).toThrowWithMessage(NotFoundException,
                "66 not found in Stations");
        });
    });

    describe("getCommodity", () => {
        it("looks up the commodity this price belongs to in the given commodities list", () => {
            expect(price.getCommodity(commodities)?.getId()).toBe(10);
        });
        it("throws exception when station was not found in provided list", () => {
            expect(() => price.getCommodity(new Commodities())).toThrowWithMessage(NotFoundException,
                "10 not found in Commodities");
        });
    });
});
