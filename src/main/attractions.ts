/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { streamJSONL } from "./util";

/** EDDB attraction material. */
export interface AttractionMaterial {
    material_id: number;
    material_name: string;
    frequency: number | null;
}

/** EDDB attraction commodity. */
export interface AttractionCommodity {
    commodity_id: number;
    commodity_name: string;
    frequency: number | null;
}

/** EDDB attraction layout. */
export interface AttractionLayout {
    updated_at: number;
    is_unique: boolean;
    is_unknown: boolean;
    threat_level_id: number | null;
    threat_level_name: string | null;
    has_cdt: boolean | null;
    requires_srv_jumping: boolean | null,
    description: string | null;
    race_id: number | null;
    race_name: string | null;
    settlement_size_id: number | null;
    settlement_size_name: string | null;
    settlement_security_id: number | null;
    settlement_security_name: string | null;
    settlement_type_id: number | null;
    settlement_type_name: string | null;
    installation_type_id: number | null;
    installation_type_name: string | null;
    beacon_type_id: number | null;
    beacon_type_name: string | null;
    tourist_beacon_index: number | null;
    shipwreck_type_id: number | null;
    shipwreck_type_name: string | null;
    materials: AttractionMaterial[];
    commodities: AttractionCommodity[];
}

/** A single EDDB attraction. */
export interface Attraction {
    id: number;
    updated_at: number;
    name: string;
    group_id: number;
    group_name: string;
    system_id: number;
    body_id: number | null;
    body_name: string | null;
    is_planetary: boolean | null;
    is_approved: boolean;
    distance_to_spawn: number | null;
    body_latitude: number | null;
    body_longitude: number | null;
    controlling_minor_faction_id: number | null;
    allegiance_id: number | null;
    allegiance_name: string | null;
    government_id: number | null;
    government_name: string | null;
    faction_updated_at: number | null;
    layout_id: number;
    layout: AttractionLayout;
}

/** A list of EDDB attractions. */
export type Attractions = Attraction[];

/**
 * Streams attractions from the given JSONL input to the given callback function. If you want all attractions in
 * an array then use [[readAttractionsJSONL]] instead.
 *
 * @param input    - The JSONL input as an async iterable.
 * @param callback - The callback function to call for each read attraction. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next attraction.
 * @return Promise resolved when all attractions have been read. Rejected when reading fails.
 */
export function streamAttractionsJSONL(input: AsyncIterable<string>,
        callback: (attraction: Attraction) => Promise<void> | void): Promise<void> {
    return streamJSONL(input, callback);
}

/**
 * Reads all attractions from the given JSONL input and returns them as an array. Use [[streamAttractionsJSONL]] if
 * you want to stream the attractions to a callback function instead of getting a huge array.
 *
 * @param input - The JSONL input as an async iterable.
 * @return The read attractions.
 */
export async function readAttractionsJSONL(input: AsyncIterable<string>): Promise<Attractions> {
    const attractions: Attractions = [];
    await streamAttractionsJSONL(input, attraction => void attractions.push(attraction));
    return attractions;
}
