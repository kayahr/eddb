/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { streamCSV } from "./util";

/** An EDDB price listing. */
export interface PriceListing {
    id: number;
    station_id: number;
    commodity_id: number;
    supply: number;
    supply_bracket: number | null;
    buy_price: number;
    sell_price: number;
    demand: number;
    demand_bracket: number | null;
    collected_at: number;
}

/** List of EDDB price listings. */
export type PriceListings = PriceListing[];

/**
 * Streams price listings from the given CSV input to the given callback function. If you want all price listings in
 * an array then use [[readPriceListingsCSV]] instead.
 *
 * @param input    - The CSV input as an async iterable.
 * @param callback - The callback function to call for each read price listing. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next price listing.
 * @return Promise resolved when all price listings have been read or rejected when reading fails.
 */
export function streamPriceListingsCSV(input: AsyncIterable<string>,
        callback: (listing: PriceListing) => Promise<void> | void): Promise<void> {
    return streamCSV(input, callback);
}

/**
 * Reads all price listings from the given CSV input and returns them as an array. Use [[readPriceListingsCSV]] if
 * you want to stream the price listings to a callback function instead of getting a huge array.
 *
 * @param input - The CSV input as an async iterable.
 * @return The read price listings.
 */
export async function readPriceListingsCSV(input: AsyncIterable<string>): Promise<PriceListings> {
    const listings: PriceListings = [];
    await streamPriceListingsCSV(input, listing => void listings.push(listing));
    return listings;
}
