/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";
import * as readline from "readline";

import { Entities } from "../util/Entities";
import { Factories } from "../util/Factories";
import { Attraction, AttractionJSON } from "./Attraction";


/** JSON structure of a list of attractions. */
export type AttractionsJSON = AttractionJSON[];

/**
 * EDDB attractions.
 */
export class Attractions extends Entities<Attraction> implements Serializable<AttractionsJSON> {
    protected readonly entityType = Attraction;

    public static fromJSON(json: AttractionsJSON, factories?: Factories): Attractions {
        const attractions = new Attractions();
        json.forEach(json => {
            const attraction = Attraction.fromJSON(json, factories);
            attractions.add(attraction);
        });
        return attractions;
    }

    public static async fromJSONL(input: readline.Interface, factories?: Factories): Promise<Attractions> {
        const attractions = new Attractions();
        for await (const line of input) {
            const json = JSON.parse(line) as AttractionJSON;
            const attraction = Attraction.fromJSON(json, factories);
            attractions.add(attraction);
        }
        return attractions;
    }

    /** @inheritDoc */
    public toJSON(): AttractionsJSON {
        return this.entities.map(attraction => attraction.toJSON());
    }
}
