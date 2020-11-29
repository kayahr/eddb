/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { streamCSV, streamJSONL } from "./util";

/** A single EDDB faction. */
export interface Faction {
    id: number;
    name: string;
    updated_at: number;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    home_system_id: number | null;
    is_player_faction: boolean;
}

/** A list of EDDB factions. */
export type Factions = Faction[];

/**
 * Streams factions from the given CSV input to the given callback function. If you want all factions in
 * an array then use [[readFactionsCSV]] instead.
 *
 * @param input    - The CSV input as an async iterable.
 * @param callback - The callback function to call for each read faction. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next faction.
 * @return Promise resolved when all factions have been read. Rejected when reading fails.
 */
export function streamFactionsCSV(input: AsyncIterable<string>, callback: (listing: Faction) => Promise<void> | void):
        Promise<void> {
    return streamCSV(input, callback);
}

/**
 * Reads all factions from the given CSV input and returns them as an array. Use [[streamFactionsCSV]] if
 * you want to stream the factions to a callback function instead of getting a huge array.
 *
 * @param input - The CSV input as an async iterable.
 * @return The read factions.
 */
export async function readFactionsCSV(input: AsyncIterable<string>): Promise<Factions> {
    const factions: Factions = [];
    await streamFactionsCSV(input, faction => void factions.push(faction));
    return factions;
}

/**
 * Streams factions from the given JSONL input to the given callback function. If you want all factions in
 * an array then use [[readFactionsJSONL]] instead.
 *
 * @param input    - The JSONL input as an async iterable.
 * @param callback - The callback function to call for each read faction. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next faction.
 * @return Promise resolved when all factions have been read. Rejected when reading fails.
 */
export function streamFactionsJSONL(input: AsyncIterable<string>, callback: (faction: Faction) => Promise<void> | void):
        Promise<void> {
    return streamJSONL(input, callback);
}

/**
 * Reads all factions from the given JSONL input and returns them as an array. Use [[streamFactionsJSONL]] if
 * you want to stream the factions to a callback function instead of getting a huge array.
 *
 * @param input - The JSONL input as an async iterable.
 * @return The read factions.
 */
export async function readFactionsJSONL(input: AsyncIterable<string>): Promise<Factions> {
    const factions: Factions = [];
    await streamFactionsJSONL(input, faction => void factions.push(faction));
    return factions;
}
