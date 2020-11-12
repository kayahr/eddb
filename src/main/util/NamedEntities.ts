/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Entities } from "./Entities";
import { NamedEntity } from "./NamedEntity";

export abstract class NamedEntities<T extends NamedEntity> extends Entities<T, [ number, string ]> {
    protected add(entity: T): void {
        super.add(entity);
        this.index.set(entity.getName(), entity);
    }
}
