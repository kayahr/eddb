/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

export class SystemCoordinates {
    public constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number
    ) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }
}
