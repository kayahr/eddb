/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Commodities } from "../commodities/Commodities";
import { Commodity } from "../commodities/Commodity";
import { NamedEntity } from "../util/NamedEntity";

/**
 * Simply commodity (only has id and name) referenced by attractions.
 */
export class SimpleCommodity extends NamedEntity {
    /**
     * Returns the real commodity from this simple commodity by looking it up in the given list of
     * commodities.
     *
     * @param commodities - The list of all commodities.
     * @return The commodity.
     */
    public getCommodity(commodities: Commodities): Commodity {
        return commodities.get(this.id);
    }
}
