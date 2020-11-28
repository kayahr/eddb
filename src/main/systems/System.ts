/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Allegiance } from "../common/Allegiance";
import { Allegiances } from "../common/Allegiances";
import { Economies } from "../common/Economies";
import { Economy } from "../common/Economy";
import { Government } from "../common/Government";
import { Governments } from "../common/Governments";
import { State, StateJSON } from "../common/State";
import { States } from "../common/States";
import { Faction } from "../factions/Faction";
import { Factions } from "../factions/Factions";
import { Factories } from "../util/Factories";
import { NamedEntity } from "../util/NamedEntity";
import { FactionPresence, FactionPresenceJSON } from "./FactionPresence";
import { PowerState } from "./PowerState";
import { PowerStates } from "./PowerStates";
import { ReserveType } from "./ReserveType";
import { ReserveTypes } from "./ReserveTypes";
import { Securities } from "./Securities";
import { Security } from "./Security";
import { SystemCoordinates } from "./SystemCoordinates";

export interface SystemJSON {
    id: number;
    edsm_id: number | null;
    name: string;
    x: number;
    y: number;
    z: number;
    population: number;
    is_populated: boolean;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    states: StateJSON[];
    security_id: number | null;
    security: string | null;
    primary_economy_id: number | null;
    primary_economy: string | null;
    power: string | null;
    power_state: string | null;
    power_state_id: number | null;
    needs_permit: boolean;
    updated_at: number;
    simbad_ref: string;
    controlling_minor_faction_id: number | null;
    controlling_minor_faction: string | null;
    reserve_type_id: number | null;
    reserve_type: string | null;
    minor_faction_presences: FactionPresenceJSON[];
    ed_system_address: number | null;
}

export class System extends NamedEntity {
    public constructor(
        id: number,
        name: string,
        private readonly edsmId: number | null,
        private readonly coordinates: SystemCoordinates,
        private readonly population: number,
        private readonly populated: boolean,
        private readonly government: Government | null,
        private readonly allegiance: Allegiance | null,
        private readonly states: readonly State[],
        private readonly security: Security | null,
        private readonly primaryEconomy: Economy | null,
        private readonly power: string | null,
        private readonly powerState: PowerState | null,
        private readonly permitNeeded: boolean,
        private readonly updatedAt: Date,
        private readonly simbadRef: string,
        private readonly controllingMinorFactionId: number | null,
        private readonly controllingMinorFactionName: string | null,
        private readonly reserveType: ReserveType | null,
        private readonly minorFactionPresences: readonly FactionPresence[],
        private readonly edSystemAddress: number | null
    ) {
        super(id, name);
    }

    public static fromJSON(json: SystemJSON,
            {
                governments = new Governments(),
                allegiances = new Allegiances(),
                states = new States(),
                economies = new Economies(),
                securities = new Securities(),
                powerStates = new PowerStates(),
                reserveTypes = new ReserveTypes()
            }: Factories = {}): System {
        return new System(
            json.id,
            json.name,
            json.edsm_id,
            new SystemCoordinates(json.x, json.y, json.z),
            json.population,
            json.is_populated,
            governments.create(json.government_id, json.government),
            allegiances.create(json.allegiance_id, json.allegiance),
            json.states.map(json => states.create(json)),
            securities.create(json.security_id, json.security),
            economies.create(json.primary_economy_id, json.primary_economy),
            json.power,
            powerStates.create(json.power_state_id, json.power_state),
            json.needs_permit,
            new Date(json.updated_at * 1000),
            json.simbad_ref,
            json.controlling_minor_faction_id,
            json.controlling_minor_faction,
            reserveTypes.create(json.reserve_type_id, json.reserve_type),
            json.minor_faction_presences.map(json => FactionPresence.fromJSON(json, { states })),
            json.ed_system_address
        );
    }

    public toJSON(): SystemJSON {
        return {
            id: this.id,
            edsm_id: this.edsmId,
            name: this.name,
            x: this.coordinates.getX(),
            y: this.coordinates.getY(),
            z: this.coordinates.getZ(),
            population: this.population,
            is_populated: this.populated,
            government_id: this.government?.getId() ?? null,
            government: this.government?.getName() ?? null,
            allegiance_id: this.allegiance?.getId() ?? null,
            allegiance: this.allegiance?.getName() ?? null,
            states: this.states.map(state => state.toJSON()),
            security_id: this.security?.getId() ?? null,
            security: this.security?.getName() ?? null,
            primary_economy_id: this.primaryEconomy?.getId() ?? null,
            primary_economy: this.primaryEconomy?.getName() ?? null,
            power: this.power,
            power_state: this.powerState?.getName() ?? null,
            power_state_id: this.powerState?.getId() ?? null,
            needs_permit: this.permitNeeded,
            updated_at: Math.round(this.updatedAt.getTime() / 1000),
            simbad_ref: this.simbadRef,
            controlling_minor_faction_id: this.controllingMinorFactionId,
            controlling_minor_faction: this.controllingMinorFactionName,
            reserve_type_id: this.reserveType?.getId() ?? null,
            reserve_type: this.reserveType?.getName() ?? null,
            minor_faction_presences: this.minorFactionPresences.map(presence => presence.toJSON()),
            ed_system_address: this.edSystemAddress
        };
    }

    public getEdsmId(): number | null {
        return this.edsmId;
    }

    public getCoordinates(): SystemCoordinates {
        return this.coordinates;
    }

    public getPopulation(): number {
        return this.population;
    }

    public isPopulated(): boolean {
        return this.populated;
    }

    public getGovernment(): Government | null {
        return this.government;
    }

    public getAllegiance(): Allegiance | null {
        return this.allegiance;
    }

    public getStates(): State[] {
        return this.states.slice();
    }

    public getSecurity(): Security | null {
        return this.security;
    }

    public getPrimaryEconomy(): Economy | null {
        return this.primaryEconomy;
    }

    public getPower(): string | null {
        return this.power;
    }

    public getPowerState(): PowerState | null {
        return this.powerState;
    }

    public isPermitNeeded(): boolean {
        return this.permitNeeded;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getSimbadRef(): string {
        return this.simbadRef;
    }

    public getControllingMinorFactionId(): number | null {
        return this.controllingMinorFactionId;
    }

    public getControllingMinorFactionName(): string | null {
        return this.controllingMinorFactionName;
    }

    public getControllingMinorFaction(factions: Factions): Faction | null {
        return this.controllingMinorFactionId == null ? null : factions.get(this.controllingMinorFactionId);
    }

    public getReserveType(): ReserveType | null {
        return this.reserveType;
    }

    public getMinorFactionPresences(): FactionPresence[] {
        return this.minorFactionPresences.slice();
    }

    public getEdSystemAddress(): number | null {
        return this.edSystemAddress;
    }

    public getDistanceTo(system: System): number {
        return this.coordinates.getDistanceTo(system.getCoordinates());
    }
}
