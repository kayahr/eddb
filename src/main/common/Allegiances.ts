/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { Allegiance } from "./Allegiance";

/**
 * Allegiances referenced by factions, stations and systems.
 */
export class Allegiances extends NamedEntities<Allegiance> {
    public create(id: number | null, name: string | null): Allegiance | null {
        return this.getOrCreate((id, name) => new Allegiance(id, name), id, name);
    }
}
