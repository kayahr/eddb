/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";
import * as readline from "readline";

import { System } from "../systems/System";
import { Factories } from "../util/Factories";
import { NamedEntities } from "../util/NamedEntities";
import { Station, StationJSON } from "./Station";

export type StationsJSON = StationJSON[];

export class Stations extends NamedEntities<Station> implements Serializable<StationsJSON> {
    private readonly systemStations = new Map<number, Station[]>();

    protected add(station: Station): void {
        super.add(station);

        const systemId = station.getSystemId();
        let systemStations = this.systemStations.get(systemId);
        if (systemStations == null) {
            systemStations = [];
            this.systemStations.set(systemId, systemStations);
        }
        systemStations.push(station);
    }

    public static fromJSON(json: StationsJSON, factories?: Factories): Stations {
        const stations = new Stations();
        json.forEach(json => {
            stations.add(Station.fromJSON(json, factories));
        });
        return stations;
    }

    public static async fromJSONL(input: readline.Interface, factories?: Factories): Promise<Stations> {
        const stations = new Stations();
        for await (const line of input) {
            const json = JSON.parse(line) as StationJSON;
            stations.add(Station.fromJSON(json, factories));
        }
        return stations;
    }

    public toJSON(): StationsJSON {
        return this.entities.map(entity => entity.toJSON());
    }

    /**
     * Returns all stations for the given system.
     *
     * @param system - The system or system ID.
     * @return All stations for the given system.
     */
    public getBySystem(system: System | number): Station[] {
        const stations = this.systemStations.get(system instanceof System ? system.getId() : system);
        if (stations == null) {
            return [];
        }
        return stations.slice();
    }
}
