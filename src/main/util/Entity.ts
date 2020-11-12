/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Equatable, isEqual } from "@kayahr/kaylib/lib/main/lang/Equatable";

export abstract class Entity implements Equatable {
    protected constructor(
        protected readonly id: number
    ) {}

    public equals(other: unknown): boolean {
        return isEqual(this, other, other => this.id === other.id);
    }

    public getId(): number {
        return this.id;
    }
}
