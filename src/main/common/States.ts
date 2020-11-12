/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { State, StateJSON } from "./State";

/**
 * States as used in systems, stations and faction presences.
 */
export class States extends NamedEntities<State> {
    public create(json: StateJSON): State {
        return this.getOrCreate(() => State.fromJSON(json), json.id, json.name);
    }
}
