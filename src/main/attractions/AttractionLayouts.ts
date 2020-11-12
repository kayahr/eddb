/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Entities } from "../util/Entities";
import { Factories } from "../util/Factories";
import { AttractionLayout, AttractionLayoutJSON } from "./AttractionLayout";

/**
 * EDDB attraction layouts.
 */
export class AttractionLayouts extends Entities<AttractionLayout> {
    public create(json: AttractionLayoutJSON, id: number, factories?: Factories): AttractionLayout {
        return this.getOrCreate(id => AttractionLayout.fromJSON(json, id, factories), id);
    }
}
