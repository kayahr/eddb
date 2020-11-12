/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { AttractionBody } from "./AttractionBody";

/**
 * Attraction bodies referenced by attractions.
 */
export class AttractionBodies extends NamedEntities<AttractionBody> {
    public create(id: number | null, name: string | null): AttractionBody | null {
        return this.getOrCreate((id, name) => new AttractionBody(id, name), id, name);
    }
}
