/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";

import { Entity } from "./Entity";

export type OptionalIds<T> = {
    [P in keyof T]?: T[P] | null;
};

export abstract class Entities<T extends Entity, I extends unknown[] = [ number ]>  {
    protected readonly entities: T[] = [];
    protected readonly index = new Map<unknown, T>();

    protected add(entity: T): void {
        this.entities.push(entity);
        this.index.set(entity.getId(), entity);
    }

    protected getOrCreate(factory: (...ids: I) => T, ...ids: I): T;
    protected getOrCreate(factory: (...ids: I) => T, ...ids: OptionalIds<I>): T | null;
    protected getOrCreate(factory: (...ids: I) => T, ...ids: I): T | null {
        if (ids.some(id => id == null)) {
            return null;
        }
        for (const id of ids) {
            const entity = this.index.get(id);
            if (entity != null) {
                return entity;
            }
        }
        const entity = factory(...ids);
        this.add(entity);
        return entity;
    }

    public has(id: I[number]): boolean {
        return this.index.has(id);
    }

    public get(id: I[number]): T {
        const entity = this.index.get(id);
        if (entity == null) {
            throw new NotFoundException(`${id} not found in ${this.constructor.name}`);
        }
        return entity;
    }

    public getAll(): T[] {
        return this.entities.slice();
    }
}
