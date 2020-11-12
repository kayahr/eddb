/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { Security } from "./Security";

export class Securities extends NamedEntities<Security> {
    public create(id: number | null, name: string | null): Security | null {
        return this.getOrCreate((id, name) => new Security(id, name), id, name);
    }
}
