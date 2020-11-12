/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Factories } from "../util/Factories";
import { NamedEntity } from "../util/NamedEntity";
import { ModuleCategories } from "./ModuleCategories";
import { ModuleCategory } from "./ModuleCategory";

export interface ModuleGroupJSON {
    id: number;
    name: string;
    category_id: number;
    category: string;
}

/**
 * Module group referenced by modules.
 */
export class ModuleGroup extends NamedEntity implements Serializable<ModuleGroupJSON> {
    private constructor(
        id: number,
        name: string,
        private readonly category: ModuleCategory
    ) {
        super(id, name);
    }

    public static fromJSON(json: ModuleGroupJSON, { moduleCategories = new ModuleCategories() }: Factories = {}):
            ModuleGroup {
        return new ModuleGroup(json.id, json.name, moduleCategories.create(json.category_id, json.category));
    }

    public toJSON(): ModuleGroupJSON {
        return {
            id: this.id,
            name: this.name,
            category_id: this.category.getId(),
            category: this.category.getName()
        };
    }

    public getCategory(): ModuleCategory {
        return this.category;
    }
}
