/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { ShipwreckType } from "./ShipwreckType";

/**
 * Shipwreck types referenced by attractions.
 */
export class ShipwreckTypes extends NamedEntities<ShipwreckType> {
    public create(id: number | null, name: string | null): ShipwreckType | null {
        return this.getOrCreate((id, name) => new ShipwreckType(id, name), id, name);
    }
}
