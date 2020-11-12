/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { Government } from "./Government";

/**
 * Governments referenced by factions, stations and systems.
 */
export class Governments extends NamedEntities<Government> {
    public create(id: number | null, name: string | null): Government | null {
        return this.getOrCreate((id, name) => new Government(id, name), id, name);
    }
}
