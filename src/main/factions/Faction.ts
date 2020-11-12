/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Allegiance } from "../common/Allegiance";
import { Allegiances } from "../common/Allegiances";
import { Government } from "../common/Government";
import { Governments } from "../common/Governments";
import { System } from "../systems/System";
import { Systems } from "../systems/Systems";
import { Factories } from "../util/Factories";
import { NamedEntity } from "../util/NamedEntity";

/** JSON structure of an EDDB faction. */
export interface FactionJSON {
    id: number;
    name: string;
    updated_at: number;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    home_system_id: number | null;
    is_player_faction: boolean;
}

/**
 * EDDB faction.
 */
export class Faction extends NamedEntity {
    private constructor(
        id: number,
        name: string,
        private readonly updatedAt: Date,
        private readonly government: Government | null,
        private readonly allegiance: Allegiance | null,
        private readonly homeSystemId: number | null,
        private readonly playerFaction: boolean
    ) {
        super(id, name);
    }

    /**
     * Deserializes a faction from the given JSON object.
     *
     * @param json - The serialized faction.
     * @return The deserialized faction.
     */
    public static fromJSON(json: FactionJSON,
            {
                governments = new Governments(),
                allegiances = new Allegiances()
            }: Factories = {}): Faction {
        return new Faction(
            json.id,
            json.name,
            new Date(json.updated_at * 1000),
            governments.create(json.government_id, json.government),
            allegiances.create(json.allegiance_id, json.allegiance),
            json.home_system_id,
            json.is_player_faction
        );
    }

    /**
     * Deserializes a faction from the given CSV row.
     *
     * @param governments - Optional governments to fill and reference.
     * @param allegiances - Optional allegiances to fill and reference.
     * @return The deserialized faction.
     */
    public static fromCSV([ id, name, updatedAt, governmentId, government, allegianceId, allegiance, homeSystemId,
            playerFaction ]: string[], {
                governments = new Governments(),
                allegiances = new Allegiances()
            }: Factories = {}): Faction {
        return new Faction(
            +id,
            name,
            new Date(+updatedAt * 1000),
            (governmentId === "" || government === "") ? null :
                governments.create(+governmentId, government),
            (allegianceId === "" || allegiance === "") ? null :
                allegiances.create(+allegianceId, allegiance),
            homeSystemId === "" ? null : +homeSystemId,
            playerFaction !== "0"
        );
    }

    /** @inheritDoc */
    public toJSON(): FactionJSON {
        return {
            id: this.id,
            name: this.name,
            updated_at: Math.round(this.updatedAt.getTime() / 1000),
            government: this.government?.getName() ?? null,
            government_id: this.government?.getId() ?? null,
            allegiance: this.allegiance?.getName() ?? null,
            allegiance_id: this.allegiance?.getId() ?? null,
            home_system_id: this.homeSystemId,
            is_player_faction: this.playerFaction
        };
    }

    /**
     * Returns the timestamp when this faction was last updated.
     *
     * @return The time of the last update.
     */
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    /**
     * Returns the government this faction belongs to.
     *
     * @return The government or null if none or unknown.
     */
    public getGovernment(): Government | null {
        return this.government;
    }

    /**
     * Returns the allegiance of this faction.
     *
     * @return The allegiance or null if none or unknown.
     */
    public getAllegiance(): Allegiance | null {
        return this.allegiance;
    }

    /**
     * Returns the ID of the home system.
     *
     * @return The home system ID or null if none or unknown.
     */
    public getHomeSystemId(): number | null {
        return this.homeSystemId;
    }

    /**
     * Returns the home system of this faction
     *
     * @param systems - The systems for looking up the home system by id.
     * @return The home system or null if none or unknown.
     * @throws NotFoundException - When system was not found.
     */
    public getHomeSystem(systems: Systems): System | null {
        return this.homeSystemId == null ? null : systems.get(this.homeSystemId);
    }

    /**
     * Checks if this is a player faction.
     *
     * @return True if player faction, false if not.
     */
    public isPlayerFaction(): boolean {
        return this.playerFaction;
    }
}
