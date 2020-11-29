/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { State } from "./common";
import { streamCSV, streamJSONL } from "./util";

/** EDDB faction presence in a system. */
export interface FactionPresence {
    happiness_id: number | null;
    minor_faction_id: number;
    influence: number | null;
    active_states: State[];
    pending_states: State[];
    recovering_states: State[];
}

/** A single EDDB system. */
export interface System {
    id: number;
    edsm_id: number | null;
    name: string;
    x: number;
    y: number;
    z: number;
    population: number;
    is_populated: boolean;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    states?: State[];
    security_id: number | null;
    security: string | null;
    primary_economy_id: number | null;
    primary_economy: string | null;
    power: string | null;
    power_state: string | null;
    power_state_id: number | null;
    needs_permit: boolean;
    updated_at: number;
    simbad_ref: string;
    controlling_minor_faction_id: number | null;
    controlling_minor_faction: string | null;
    reserve_type_id: number | null;
    reserve_type: string | null;
    minor_faction_presences?: FactionPresence[];
    ed_system_address: number | null;
}

/** A list of EDDB systems. */
export type Systems = System[];

/**
 * Streams systems from the given CSV input to the given callback function. If you want all systems in
 * an array then use [[readSystemsCSV]] instead.
 *
 * @param input    - The CSV input as an async iterable.
 * @param callback - The callback function to call for each read system. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next system.
 * @return Promise resolved when all systems have been read or rejected when reading fails.
 */
export function streamSystemsCSV(input: AsyncIterable<string>, callback: (system: System) => Promise<void> | void):
        Promise<void> {
    return streamCSV(input, callback);
}

/**
 * Reads all systems from the given CSV input and returns them as an array. Use [[streamSystemsCSV]] if
 * you want to stream the systems to a callback function instead of getting a huge array.
 *
 * @param input - The CSV input as an async iterable.
 * @return The read systems.
 */
export async function readSystemsCSV(input: AsyncIterable<string>): Promise<Systems> {
    const systems: Systems = [];
    await streamSystemsCSV(input, system => void systems.push(system));
    return systems;
}

/**
 * Streams systems from the given JSONL input to the given callback function. If you want all systems in
 * an array then use [[readSystemsJSONL]] instead.
 *
 * @param input    - The JSONL input as an async iterable.
 * @param callback - The callback function to call for each read system. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next system.
 * @return Promise resolved when all systems have been read. Rejected when reading fails.
 */
export function streamSystemsJSONL(input: AsyncIterable<string>,
        callback: (system: System) => Promise<void> | void): Promise<void> {
    return streamJSONL(input, callback);
}

/**
 * Reads all systems from the given JSONL input and returns them as an array. Use [[streamSystemsJSONL]] if
 * you want to stream the systems to a callback function instead of getting a huge array.
 *
 * @param input - The JSONL input as an async iterable.
 * @return The read systems.
 */
export async function readSystemsJSONL(input: AsyncIterable<string>): Promise<Systems> {
    const systems: Systems = [];
    await streamSystemsJSONL(input, system => void systems.push(system));
    return systems;
}
