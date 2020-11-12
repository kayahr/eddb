/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { PowerState } from "./PowerState";

export class PowerStates extends NamedEntities<PowerState> {
    public create(id: number | null, name: string | null): PowerState | null {
        return this.getOrCreate((id, name) => new PowerState(id, name), id, name);
    }
}
