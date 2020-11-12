/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";
import * as readline from "readline";

import { Factories } from "../util/Factories";
import { NamedEntities } from "../util/NamedEntities";
import { System, SystemJSON } from "./System";

export type SystemsJSON = SystemJSON[];

export class Systems extends NamedEntities<System> implements Serializable<SystemsJSON> {
    public static fromJSON(json: SystemsJSON, factories?: Factories): Systems {
        const systems = new Systems();
        json.forEach(json => {
            systems.add(System.fromJSON(json, factories));
        });
        return systems;
    }

    public static async fromJSONL(input: readline.Interface, factories?: Factories): Promise<Systems> {
        const systems = new Systems();
        for await (const line of input) {
            systems.add(System.fromJSON(JSON.parse(line) as SystemJSON, factories));
        }
        return systems;
    }

     public toJSON(): SystemsJSON {
        return this.entities.map(entity => entity.toJSON());
    }
}
