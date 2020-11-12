/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { CommodityCategory, CommodityCategoryJSON } from "./CommodityCategory";

/**
 * EDDB commodity categories.
 */
export class CommodityCategories extends NamedEntities<CommodityCategory> {
    public create(json: CommodityCategoryJSON): CommodityCategory {
        return this.getOrCreate(() => CommodityCategory.fromJSON(json), json.id, json.name);
    }
}
