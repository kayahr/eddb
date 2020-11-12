/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { Race } from "./Race";

/**
 * Races referenced by attractions.
 */
export class Races extends NamedEntities<Race> {
    public create(id: number | null, name: string | null): Race | null {
        return this.getOrCreate((id, name) => new Race(id, name), id, name);
    }
}
