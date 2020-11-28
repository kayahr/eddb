import "jest-extended";

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { PriceListings, readPriceListingsCSV, streamPriceListingsCSV } from "../main/listings";
import { createValidator, sleep, testJSON, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/listings.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/listings.json");
const priceListings = JSON.parse(fs.readFileSync(jsonFile).toString()) as PriceListings;
const priceListingsValidator = createValidator("priceListings", "PriceListings", sourceFiles);
const priceListingValidator = createValidator("priceListing", "PriceListing", sourceFiles);
const csvFile = path.join(baseDir, "src/test/data/listings.csv");

describe("PriceListings", () => {
    it("matches actual JSON", () => {
        testJSONFile(priceListingsValidator, jsonFile);
    });
});

describe("streamPriceListingsCSV", () => {
    it("streams priceListings from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        await expect(streamPriceListingsCSV(input, priceListing => {
            testJSON(priceListingValidator, priceListing);
        })).toResolve();
    });
    it("waits for async callback result", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        const list: PriceListings = [];
        await expect(streamPriceListingsCSV(input, async priceListing => {
            testJSON(priceListingValidator, priceListing);
            await sleep();
            list.push(priceListing);
        })).toResolve();
        expect(list).toEqual(priceListings);
    });
});

describe("readPriceListingsCSV", () => {
    it("reads priceListings from CSV stream", async () => {
        const input = readline.createInterface({ input: fs.createReadStream(csvFile) });
        expect(await readPriceListingsCSV(input)).toEqual(priceListings);
    });
});
