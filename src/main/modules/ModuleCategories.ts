/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { ModuleCategory } from "./ModuleCategory";

/**
 * Module categories referenced by modules.
 */
export class ModuleCategories extends NamedEntities<ModuleCategory> {
    public create(id: number, name: string): ModuleCategory {
        return this.getOrCreate((id, name) => new ModuleCategory(id, name), id, name);
    }
}
