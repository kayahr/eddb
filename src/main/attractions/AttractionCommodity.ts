/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Factories } from "../util/Factories";
import { SimpleCommodities } from "./SimpleCommodities";
import { SimpleCommodity } from "./SimpleCommodity";

/** JSON structure of an EDDB attraction commodity. */
export interface AttractionCommodityJSON {
    commodity_id: number;
    commodity_name: string;
    frequency: number | null;
}

export class AttractionCommodity implements Serializable<AttractionCommodityJSON> {
    private constructor(
        private readonly commodity: SimpleCommodity,
        private readonly frequency: number | null
    ) {}

    public static fromJSON(json: AttractionCommodityJSON, { simpleCommodities = new SimpleCommodities() }:
            Factories = {}): AttractionCommodity {
        return new AttractionCommodity(
            simpleCommodities.create(json.commodity_id, json.commodity_name),
            json.frequency
        );
    }

    public toJSON(): AttractionCommodityJSON {
        return {
            commodity_id: this.commodity.getId(),
            commodity_name: this.commodity.getName(),
            frequency: this.frequency
        };
    }

    public getCommodity(): SimpleCommodity {
        return this.commodity;
    }

    public getFrequency(): number | null {
        return this.frequency;
    }
}
