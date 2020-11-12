/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NamedEntities } from "../util/NamedEntities";
import { InstallationType } from "./InstallationType";

/**
 * Installation types referenced by attractions.
 */
export class InstallationTypes extends NamedEntities<InstallationType> {
    public create(id: number | null, name: string | null): InstallationType | null {
        return this.getOrCreate((id, name) => new InstallationType(id, name), id, name);
    }
}
