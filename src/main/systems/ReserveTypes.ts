/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { ReserveType } from "./ReserveType";

export class ReserveTypes extends NamedEntities<ReserveType> {
    public create(id: number | null, name: string | null): ReserveType | null {
        return this.getOrCreate((id, name) => new ReserveType(id, name), id, name);
    }
}
