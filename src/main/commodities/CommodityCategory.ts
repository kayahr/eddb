/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { NamedEntity } from "../util/NamedEntity";

/** JSON representation of a commodity category */
export interface CommodityCategoryJSON {
    id: number;
    name: string;
}

/**
 * A commodity category referenced by [[Commodity]].
 */
export class CommodityCategory extends NamedEntity implements Serializable<CommodityCategoryJSON> {
    /**
     * Deserializes a commodity category from the given JSON object.
     *
     * @param The serialized commodity category.
     * @return The deserialized commodity category.
     */
    public static fromJSON(json: CommodityCategoryJSON): CommodityCategory {
        return new CommodityCategory(json.id, json.name);
    }

    /** @inheritDoc */
    public toJSON(): CommodityCategoryJSON {
        return {
            id: this.id,
            name: this.name
        };
    }
}
