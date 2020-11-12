import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Commodities, CommoditiesJSON } from "../../main/commodities/Commodities";
import { Prices } from "../../main/prices/Prices";
import { Stations } from "../../main/stations/Stations";

const baseDir = path.join(__dirname, "../../..");
const csvFile = path.join(baseDir, "src/test/data/listings.csv");

const commoditiesFile = path.join(baseDir, "src/test/data/commodities.json");
const commoditiesJSON = JSON.parse(fs.readFileSync(commoditiesFile).toString()) as CommoditiesJSON;
const commodities = Commodities.fromJSON(commoditiesJSON);

const stationsFile = path.join(baseDir, "src/test/data/stations.jsonl");

describe("Stations", () => {
    let prices: Prices;
    let stations: Stations;

    beforeAll(async () => {
        const pricesCSV = fs.createReadStream(csvFile);
        prices = await Prices.fromCSV(pricesCSV);

        const stationsJSONL = readline.createInterface({ input: fs.createReadStream(stationsFile) });
        stations = await Stations.fromJSONL(stationsJSONL);
    });

    describe("getAll", () => {
        it("returns all stations", () => {
            expect(prices.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("getByStation", () => {
        it("returns prices for specific station", () => {
            expect(prices.getByStation(21842).length).toBeGreaterThan(0);
            expect(prices.getByStation(stations.get(21842)).length).toBeGreaterThan(0);
        });
        it("returns empty array for unknown station", () => {
            expect(prices.getByStation(1234567)).toEqual([]);
            expect(prices.getByStation(stations.get(39))).toEqual([]);
        });
    });

    describe("getByCommodity", () => {
        it("returns prices for specific commodity", () => {
            expect(prices.getByCommodity(66).length).toBeGreaterThan(0);
            expect(prices.getByCommodity(commodities.get(66)).length).toBeGreaterThan(0);
        });
        it("returns empty array for unknown commodity", () => {
            expect(prices.getByCommodity(1234567)).toEqual([]);
            expect(prices.getByCommodity(commodities.get(1))).toEqual([]);
        });
    });
});
