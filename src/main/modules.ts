/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * Missile type. This data is somehow special because EDDB exports it as an ID without a name while other entities
 * usually are exported by name only or by an id/name pair. So for this property we use an enum so we can easily
 * translate the ID to a name if needed.
 */
export enum MissileType {
    Dumbfire = 16,
    Seeker = 32
}

/** A single EDDB module. */
export interface Module {
    id: number;
    group_id: number;
    class: number;
    rating: string;
    price: number | null;
    weapon_mode: string | null;
    missile_type: MissileType | null;
    name: string | null;
    belongs_to: number | null;
    ed_id: number;
    ed_symbol: string;
    game_context_id: number | null;
    dps?: number;
    ammo?: number;
    mass?: number;
    efficiency?: string,
    power_produced?: number,
    cells?: number;
    additional_armour?: number;
    count?: number;
    bins?: number;
    rate?: number;
    power?: number;
    recharge_rating?: string;
    duration?: number;
    range_km?: number;
    damage?: number;
    vehicle_count?: number,
    capacity?: number;
    ship: string | null;
    group: {
        id: number;
        category_id: number;
        name: string;
        category: string;
    }
}

/** A list of EDDB modules. */
export type Modules = Module[];

export function getModuleDisplayName(module: Module): string;
export function getModuleDisplayName(module: Module | null | undefined): string | null;

/**
 * Returns the unique display name of a module. This is constructed from the name (if present), group or category,
 * class and rating.
 *
 * @param module - The module to return the name for. When null or undefined then returned name is null.
 * @return The modules display name. Null if no module was specified.
 */
export function getModuleDisplayName(module: Module | null | undefined): string | null {
    if (module == null) {
        return null;
    }
    const name = module.name ?? module.group.name;
    const properties: string[] = [];
    if (module.missile_type != null) {
        properties.push(MissileType[module.missile_type]);
    }
    if (module.weapon_mode != null) {
        properties.push(module.weapon_mode);
    }
    if (module.ship != null) {
        properties.push(module.ship);
    }
    const propStr = properties.length > 0 ? ` (${properties.join(", ")})` : "";
    return `${module.class}${module.rating} ${name}${propStr}`;
}
