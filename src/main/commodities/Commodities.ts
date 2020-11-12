/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Factories } from "../util/Factories";
import { NamedEntities } from "../util/NamedEntities";
import { Commodity, CommodityJSON } from "./Commodity";

/** JSON structure of a list of commodities. */
export type CommoditiesJSON = CommodityJSON[];

/**
 * EDDB commodities.
 */
export class Commodities extends NamedEntities<Commodity> implements Serializable<CommoditiesJSON> {
    public static fromJSON(json: CommoditiesJSON, factories?: Factories): Commodities {
        const commodities = new Commodities();
        json.forEach(json => {
            const commodity = Commodity.fromJSON(json, factories);
            commodities.add(commodity);
        });
        return commodities;
    }

    /** @inheritDoc */
    public toJSON(): CommoditiesJSON {
        return this.entities.map(commodity => commodity.toJSON());
    }
}
