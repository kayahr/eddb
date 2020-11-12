/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { State, StateJSON } from "../common/State";
import { States } from "../common/States";
import { Faction } from "../factions/Faction";
import { Factions } from "../factions/Factions";
import { Factories } from "../util/Factories";

export interface FactionPresenceJSON {
    happiness_id: number | null;
    minor_faction_id: number;
    influence: number | null;
    active_states: StateJSON[];
    pending_states: StateJSON[];
    recovering_states: StateJSON[];
}

export class FactionPresence implements Serializable<FactionPresenceJSON> {
    public constructor(
        private readonly minorFactionId: number,
        private readonly happinessId: number | null,
        private readonly influence: number | null,
        private readonly activeStates: readonly State[],
        private readonly pendingStates: readonly State[],
        private readonly recoveringStates: readonly State[]
    ) {}

    public static fromJSON(json: FactionPresenceJSON, { states = new States() }: Factories = {}): FactionPresence {
        return new FactionPresence(
            json.minor_faction_id,
            json.happiness_id,
            json.influence,
            json.active_states.map(json => states.create(json)),
            json.pending_states.map(json => states.create(json)),
            json.recovering_states.map(json => states.create(json))
        );
    }

    public toJSON(): FactionPresenceJSON {
        return {
            happiness_id: this.happinessId,
            minor_faction_id: this.minorFactionId,
            influence: this.influence,
            active_states: this.activeStates.map(state => state.toJSON()),
            pending_states: this.pendingStates.map(state => state.toJSON()),
            recovering_states: this.recoveringStates.map(state => state.toJSON())
        };
    }

    public getMinorFactionId(): number {
        return this.minorFactionId;
    }

    public getMinorFaction(factions: Factions): Faction {
        return factions.get(this.minorFactionId);
    }

    public getHappinessId(): number | null {
        return this.happinessId;
    }

    public getInfluence(): number | null {
        return this.influence;
    }

    public getActiveStates(): State[] {
        return this.activeStates.slice();
    }

    public getPendingStates(): State[] {
        return this.pendingStates.slice();
    }

    public getRecoveringStates(): State[] {
        return this.recoveringStates.slice();
    }
}
