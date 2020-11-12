/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { SettlementSecurity } from "./SettlementSecurity";

export class SettlementSecurities extends NamedEntities<SettlementSecurity> {
    public create(id: number | null, name: string | null): SettlementSecurity | null {
        return this.getOrCreate((id, name) => new SettlementSecurity(id, name), id, name);
    }
}
