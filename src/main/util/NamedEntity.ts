/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Comparable } from "@kayahr/kaylib/lib/main/lang/Comparable";

import { Entity } from "./Entity";

export abstract class NamedEntity extends Entity implements Comparable<NamedEntity> {
    public constructor(
        id: number,
        protected readonly name: string
    ) {
        super(id);
    }

    public compareTo(other: NamedEntity): number {
        return this.name.localeCompare(other.name);
    }

    public getName(): string {
        return this.name;
    }
}
