/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { AttractionGroup } from "./AttractionGroup";

/**
 * Attraction groups referenced by attractions.
 */
export class AttractionGroups extends NamedEntities<AttractionGroup> {
    public create(id: number, name: string): AttractionGroup {
        return this.getOrCreate((id, name) => new AttractionGroup(id, name), id, name);
    }
}
