/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Allegiance } from "../common/Allegiance";
import { Allegiances } from "../common/Allegiances";
import { Government } from "../common/Government";
import { Governments } from "../common/Governments";
import { Faction } from "../factions/Faction";
import { Factions } from "../factions/Factions";
import { System } from "../systems/System";
import { Systems } from "../systems/Systems";
import { Entity } from "../util/Entity";
import { Factories } from "../util/Factories";
import { AttractionBodies } from "./AttractionBodies";
import { AttractionBody } from "./AttractionBody";
import { AttractionGroup } from "./AttractionGroup";
import { AttractionGroups } from "./AttractionGroups";
import { AttractionLayout, AttractionLayoutJSON } from "./AttractionLayout";
import { AttractionLayouts } from "./AttractionLayouts";
import { BodyLocation } from "./BodyLocation";

/** JSON structure of an EDDB attraction. */
export interface AttractionJSON {
    id: number;
    updated_at: number;
    name: string;
    group_id: number;
    group_name: string;
    system_id: number;
    body_id: number | null;
    body_name: string | null;
    is_planetary: boolean | null;
    is_approved: boolean;
    distance_to_spawn: number | null;
    body_latitude: number | null;
    body_longitude: number | null;
    controlling_minor_faction_id: number | null;
    allegiance_id: number | null;
    allegiance_name: string | null;
    government_id: number | null;
    government_name: string | null;
    faction_updated_at: number | null;
    layout_id: number;
    layout: AttractionLayoutJSON;
}

/**
 * An EDDB attraction. An instance of it can be retrieved from a [[Attractions]] collection.
 */
export class Attraction extends Entity implements Serializable<AttractionJSON> {
    private constructor(
        id: number,
        private readonly name: string,
        private readonly updatedAt: Date,
        private readonly group: AttractionGroup,
        private readonly systemId: number,
        private readonly body: AttractionBody | null,
        private readonly planetary: boolean | null,
        private readonly approved: boolean,
        private readonly distanceToSpawn: number | null,
        private readonly bodyLocation: BodyLocation | null,
        private readonly controllingMinorFactionId: number | null,
        private readonly allegiance: Allegiance | null,
        private readonly government: Government | null,
        private readonly factionUpdatedAt: Date | null,
        private readonly layout: AttractionLayout
    ) {
        super(id);
    }

    /**
     * Deserializes an attraction from the given JSON object.
     *
     * @param json             - The serialized attraction.
     * @param governments - Optional governments to fill and reference.
     * @param allegiances - Optional allegiances to fill and reference.
     * @param attractionGroups - Optional attraction groups to fill and reference.
     * @return The deserialized attraction.
     */
    public static fromJSON(json: AttractionJSON,
            {
                governments = new Governments(),
                allegiances = new Allegiances(),
                attractionGroups = new AttractionGroups(),
                attractionBodies = new AttractionBodies(),
                attractionLayouts = new AttractionLayouts(),
                ...factories
            }: Factories = {}): Attraction {
        return new Attraction(
            json.id,
            json.name,
            new Date(json.updated_at * 1000),
            attractionGroups.create(json.group_id, json.group_name),
            json.system_id,
            attractionBodies.create(json.body_id, json.body_name),
            json.is_planetary,
            json.is_approved,
            json.distance_to_spawn,
            BodyLocation.create(json.body_latitude, json.body_longitude),
            json.controlling_minor_faction_id,
            allegiances.create(json.allegiance_id, json.allegiance_name),
            governments.create(json.government_id, json.government_name),
            json.faction_updated_at == null ? null : new Date(json.faction_updated_at * 1000),
            attractionLayouts.create(json.layout, json.layout_id, factories)
        );
    }

    /** @inheritDoc */
    public toJSON(): AttractionJSON {
        return {
            id: this.id,
            name: this.name,
            updated_at: Math.round(this.updatedAt.getTime() / 1000),
            group_id: this.group?.getId(),
            group_name: this.group.getName(),
            system_id: this.systemId,
            body_id: this.body?.getId() ?? null,
            body_name: this.body?.getName() ?? null,
            is_planetary: this.planetary,
            is_approved: this.approved,
            distance_to_spawn: this.distanceToSpawn,
            body_latitude: this.bodyLocation?.getLatitude() ?? null,
            body_longitude: this.bodyLocation?.getLongitude() ?? null,
            controlling_minor_faction_id: this.controllingMinorFactionId,
            government_name: this.government?.getName() ?? null,
            government_id: this.government?.getId() ?? null,
            allegiance_name: this.allegiance?.getName() ?? null,
            allegiance_id: this.allegiance?.getId() ?? null,
            faction_updated_at: this.factionUpdatedAt == null ? null :
                Math.round(this.factionUpdatedAt.getTime() / 1000),
            layout_id: this.layout.getId(),
            layout: this.layout.toJSON()
        };
    }

    public getName(): string {
        return this.name;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getGroup(): AttractionGroup {
        return this.group;
    }

    public getSystemId(): number {
        return this.systemId;
    }

    public getSystem(systems: Systems): System {
        return systems.get(this.systemId);
    }

    public getBody(): AttractionBody | null {
        return this.body;
    }

    public isPlanetary(): boolean | null {
        return this.planetary;
    }

    public isApproved(): boolean | null {
        return this.approved;
    }

    public getDistanceToSpawn(): number | null {
        return this.distanceToSpawn;
    }

    public getBodyLocation(): BodyLocation | null {
        return this.bodyLocation;
    }

    public getControllingMinorFactionId(): number | null {
        return this.controllingMinorFactionId;
    }

    public getControllingMinorFaction(factions: Factions): Faction | null {
        return this.controllingMinorFactionId == null ? null : factions.get(this.controllingMinorFactionId);
    }

    public getAllegiance(): Allegiance | null {
        return this.allegiance;
    }

    public getGovernment(): Government | null {
        return this.government;
    }

    public getFactionUpdatedAt(): Date | null {
        return this.factionUpdatedAt;
    }

    public getLayout(): AttractionLayout {
        return this.layout;
    }
}
