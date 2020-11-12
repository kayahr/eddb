/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { ThreatLevel } from "./ThreatLevel";

/**
 * Threat levels referenced by attractions.
 */
export class ThreatLevels extends NamedEntities<ThreatLevel> {
    public create(id: number | null, name: string | null): ThreatLevel | null {
        return this.getOrCreate((id, name) => new ThreatLevel(id, name), id, name);
    }
}
