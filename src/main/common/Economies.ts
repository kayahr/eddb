/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { Economy } from "./Economy";

/**
 * Economies referenced by stations and systems.
 */
export class Economies extends NamedEntities<Economy> {
    public create(id: number, name: string): Economy;
    public create(id: number | null, name: string | null): Economy | null;
    public create(id: number | null, name: string | null): Economy | null {
        return this.getOrCreate((id, name) => new Economy(id, name), id, name);
    }
}
