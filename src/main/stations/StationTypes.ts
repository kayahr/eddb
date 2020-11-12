/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { StationType } from "./StationType";

export class StationTypes extends NamedEntities<StationType> {
    public create(id: number | null, name: string | null): StationType | null {
        return this.getOrCreate((id, name) => new StationType(id, name), id, name);
    }
}
