/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { SimpleCommodity } from "./SimpleCommodity";

/**
 * Simple commodities (only id and name) referenced by attractions.
 */
export class SimpleCommodities extends NamedEntities<SimpleCommodity> {
    public create(id: number, name: string): SimpleCommodity {
        return this.getOrCreate((id, name) => new SimpleCommodity(id, name), id, name);
    }
}
