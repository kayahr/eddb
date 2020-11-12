/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { SettlementType } from "./SettlementType";

/**
 * Settlement types referenced by attractions.
 */
export class SettlementTypes extends NamedEntities<SettlementType> {
    public create(id: number | null, name: string | null): SettlementType | null {
        return this.getOrCreate((id, name) => new SettlementType(id, name), id, name);
    }
}
