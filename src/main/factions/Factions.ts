/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";
import * as papa from "papaparse";
import * as readline from "readline";

import { Factories } from "../util/Factories";
import { NamedEntities } from "../util/NamedEntities";
import { Faction, FactionJSON } from "./Faction";

/** JSON structure of a list of EDDB factions. */
export type FactionsJSON = FactionJSON[];

/**
 * EDDB factions.
 */
export class Factions extends NamedEntities<Faction> implements Serializable<FactionsJSON> {
    /**
     * Deserializes factions from the given JSON object.
     *
     * @param json - The serialized factions.
     * @return The deserialized factions.
     */
    public static fromJSON(json: FactionsJSON, factories?: Factories): Factions {
        const factions = new Factions();
        json.forEach(json => {
            factions.add(Faction.fromJSON(json, factories));
        });
        return factions;
    }

    /**
     * Deserializes factions from the given JSONL readline interface.
     *
     * @param input - The readline interface to read JSON lines from.
     * @return The deserialized factions.
     */
    public static async fromJSONL(input: readline.Interface, factories?: Factories): Promise<Factions> {
        const factions = new Factions();
        for await (const line of input) {
            factions.add(Faction.fromJSON(JSON.parse(line) as FactionJSON, factories));
        }
        return factions;
    }

    /**
     * Deserializes factions from the given CSV input.
     *
     * @param input - A CSV string, file or stream.
     * @return The deserialized factions.
     */
    public static async fromCSV(input: string | File | NodeJS.ReadableStream, factories?: Factories):
            Promise<Factions> {
        return new Promise((resolve, reject) => {
            const factions = new Factions();
            let header = true;
            papa.parse<string>(input, {
                step: results => {
                    if (header) {
                        header = false;
                    } else {
                        factions.add(Faction.fromCSV(results.data, factories));
                    }
                },
                complete: () => {
                    resolve(factions);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }

    /** @inheritDoc */
    public toJSON(): FactionsJSON {
        return this.entities.map(entity => entity.toJSON());
    }
}
