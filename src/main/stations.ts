/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { State } from "./common";
import { streamJSONL } from "./util";

/** A single EDDB station. */
export interface Station {
    id: number;
    name: string;
    system_id: number;
    updated_at: number;
    max_landing_pad_size: string;
    distance_to_star: number | null;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    states: State[];
    type_id: number | null;
    type: string | null;
    has_blackmarket: boolean;
    has_market: boolean;
    has_refuel: boolean;
    has_repair: boolean;
    has_rearm: boolean;
    has_outfitting: boolean;
    has_shipyard: boolean;
    has_docking: boolean;
    has_commodities: boolean;
    import_commodities: string[];
    export_commodities: string[];
    prohibited_commodities: string[];
    economies: string[];
    shipyard_updated_at: number | null;
    outfitting_updated_at: number | null;
    market_updated_at: number | null;
    is_planetary: boolean;
    selling_ships: string[];
    selling_modules: number[];
    settlement_size_id: number | null;
    settlement_size: string | null;
    settlement_security_id: number | null;
    settlement_security: string | null;
    body_id: number | null;
    controlling_minor_faction_id: number | null;
    ed_market_id: number;
}

/** A list of EDDB stations. */
export type Stations = Station[];

/**
 * Streams stations from the given JSONL input to the given callback function. If you want all stations in
 * an array then use [[readStationsJSONL]] instead.
 *
 * @param input    - The JSONL input as an async iterable.
 * @param callback - The callback function to call for each read station. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next station.
 * @return Promise resolved when all stations have been read. Rejected when reading fails.
 */
export function streamStationsJSONL(input: AsyncIterable<string>,
        callback: (station: Station) => Promise<void> | void): Promise<void> {
    return streamJSONL(input, callback);
}

/**
 * Reads all stations from the given JSONL input and returns them as an array. Use [[readStationsJSONL]] if
 * you want to stream the stations to a callback function instead of getting a huge array.
 *
 * @param input - The JSONL input as an async iterable.
 * @return The read stations.
 */
export async function readStationsJSONL(input: AsyncIterable<string>): Promise<Stations> {
    const stations: Stations = [];
    await streamStationsJSONL(input, station => void stations.push(station));
    return stations;
}
