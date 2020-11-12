/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import * as papa from "papaparse";

import { Commodity } from "../commodities/Commodity";
import { Station } from "../stations/Station";
import { Price } from "./Price";

/**
 * EDDB price listings as read from the listings.csv file.
 */
export class Prices {
    private readonly prices: Price[] = [];
    private readonly stationPrices = new Map<number, Price[]>();
    private readonly commodityPrices = new Map<number, Price[]>();

    private add(price: Price): void {
        this.prices.push(price);

        const stationId = price.getStationId();
        let stationPrices = this.stationPrices.get(stationId);
        if (stationPrices == null) {
            stationPrices = [];
            this.stationPrices.set(stationId, stationPrices);
        }
        stationPrices.push(price);

        const commodityId = price.getCommodityId();
        let commodityPrices = this.commodityPrices.get(commodityId);
        if (commodityPrices == null) {
            commodityPrices = [];
            this.commodityPrices.set(commodityId, commodityPrices);
        }
        commodityPrices.push(price);
    }

   /**
     * Deserializes price listings from the given CSV input.
     *
     * @param input       - A CSV string, file or stream.
     * @return The deserialized prices.
     */
    public static async fromCSV(input: string | File | NodeJS.ReadableStream): Promise<Prices> {
        return new Promise((resolve, reject) => {
            const prices = new Prices();
            let header = true;
            papa.parse<string>(input, {
                step: results => {
                    if (header) {
                        header = false;
                    } else {
                        prices.add(Price.fromCSV(results.data));
                    }
                },
                complete: () => {
                    resolve(prices);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }

    /**
     * Returns all prices.
     *
     * @return The prices.
     */
    public getAll(): Price[] {
        return this.prices.slice();
    }

    /**
     * Returns all prices for the given station.
     *
     * @param station - The station or station ID.
     * @return All prices of the given station.
     */
    public getByStation(station: Station | number): Price[] {
        const prices = this.stationPrices.get(station instanceof Station ? station.getId() : station);
        if (prices == null) {
            return [];
        }
        return prices.slice();
    }

    /**
     * Returns all prices for the given commodity.
     *
     * @param commodity - The commodity or commodity ID.
     * @return All prices for the given commodity.
     */
    public getByCommodity(commodity: Commodity | number): Price[] {
        const prices = this.commodityPrices.get(commodity instanceof Commodity ? commodity.getId() : commodity);
        if (prices == null) {
            return [];
        }
        return prices.slice();
    }
}
