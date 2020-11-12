/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { SimpleMaterial } from "./SimpleMaterial";

/**
 * Materials referenced by attractions.
 */
export class SimpleMaterials extends NamedEntities<SimpleMaterial> {
    public create(id: number, name: string): SimpleMaterial {
        return this.getOrCreate((id, name) => new SimpleMaterial(id, name), id, name);
    }
}
