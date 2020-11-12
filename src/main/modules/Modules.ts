/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Entities } from "../util/Entities";
import { Factories } from "../util/Factories";
import { Module, ModuleJSON } from "./Module";

/** JSON structure of EDDB modules. */
export type ModulesJSON = ModuleJSON[];

/**
 * Set of ship modules read from EDDB's module.json.
 */
export class Modules extends Entities<Module> implements Serializable<ModulesJSON> {
    /**
     * Deserializes modules from the given JSON object.
     *
     * @param json             - The JSON to deserialize.
     * @param moduleCategories - Optional module categories to fill and reference.
     * @param moduleGroups     - Optional module groups to fill and reference.
     * @return The deserialized modules
     */
    public static fromJSON(json: ModulesJSON, factories?: Factories): Modules {
        const modules = new Modules();
        json.forEach(json => modules.add(Module.fromJSON(json, factories)));
        return modules;
    }

    /** @inheritDoc */
    public toJSON(): ModulesJSON {
        return this.entities.map(module => module.toJSON());
    }
}
