/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { BeaconType } from "./BeaconType";

/**
 * Beacon types referenced by attractions.
 */
export class BeaconTypes extends NamedEntities<BeaconType> {
    public create(id: number | null, name: string | null): BeaconType | null {
        return this.getOrCreate((id, name) => new BeaconType(id, name), id, name);
    }
}
