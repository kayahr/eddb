/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Factories } from "../util/Factories";
import { NamedEntities } from "../util/NamedEntities";
import { ModuleGroup, ModuleGroupJSON } from "./ModuleGroup";

/**
 * Module groups referenced by modules.
 */
export class ModuleGroups extends NamedEntities<ModuleGroup> {
    public create(json: ModuleGroupJSON, factories?: Factories): ModuleGroup {
        return this.getOrCreate(() => ModuleGroup.fromJSON(json, factories), json.id, json.name);
    }
}
