/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { NamedEntity } from "../util/NamedEntity";

/** JSON structure of a list of states. */
export interface StateJSON {
    id: number;
    name: string;
}

/**
 * A state as used in systems, stations and faction presences.
 */
export class State extends NamedEntity implements Serializable<StateJSON> {
    public static fromJSON(json: StateJSON): State {
        return new State(json.id, json.name);
    }

    /** @inheritDoc */
    public toJSON(): StateJSON {
        return {
            id: this.id,
            name: this.name
        };
    }
}
