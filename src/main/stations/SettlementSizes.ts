/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { SettlementSize } from "./SettlementSize";

export class SettlementSizes extends NamedEntities<SettlementSize> {
    public create(id: number | null, name: string | null): SettlementSize | null {
        return this.getOrCreate((id, name) => new SettlementSize(id, name), id, name);
    }
}
