/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Entity } from "../util/Entity";
import { Factories } from "../util/Factories";
import { ModuleGroup } from "./ModuleGroup";
import { ModuleGroups } from "./ModuleGroups";
import { Modules } from "./Modules";

/**
 * Missile type. This data is somehow special because EDDB exports it as an ID without a name while other entities
 * usually are exported by name only or by an id/name pair. So for this property we use an enum so we can easily
 * translate the ID to a name if needed.
 */
export enum MissileType {
    Dumbfire = 16,
    Seeker = 32
}

/** JSON structure of an EDDB module. */
export interface ModuleJSON {
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

/**
 * An EDDB Module read from modules.json
 */
export class Module extends Entity implements Serializable<ModuleJSON> {
    private constructor(
        id: number,
        private readonly name: string | null,
        private readonly group: ModuleGroup,
        private readonly moduleClass: number,
        private readonly rating: string,
        private readonly price: number | null,
        private readonly weaponMode: string | null,
        private readonly missileType: MissileType | null,
        private readonly belongsToId: number | null,
        private readonly edId: number,
        private readonly edSymbol: string,
        private readonly gameContextId: number | null,
        private readonly dps: number | null,
        private readonly ammo: number | null,
        private readonly additionalArmour: number | null,
        private readonly mass: number | null,
        private readonly efficiency: string | null,
        private readonly powerProduced: number | null,
        private readonly cells: number | null,
        private readonly count: number | null,
        private readonly bins: number | null,
        private readonly rate: number | null,
        private readonly power: number | null,
        private readonly rechargeRating: string | null,
        private readonly duration: number | null,
        private readonly range: number | null,
        private readonly damage: number | null,
        private readonly vehicleCount: number | null,
        private readonly capacity: number | null,
        private readonly shipName: string | null
    ) {
        super(id);
    }

    /**
     * Deserializes a module from the given JSON object.
     *
     * @param json             - The serialized module.
     * @param moduleCategories - Optional module categories to fill and reference.
     * @param moduleGroups     - Optional module groups to fill and reference.
     * @return The deserialized module.
     */
    public static fromJSON(json: ModuleJSON,
            {
                moduleGroups = new ModuleGroups(),
                ...factories
            }: Factories = {}): Module {
        return new Module(
            json.id,
            json.name,
            moduleGroups.create(json.group, factories),
            json.class,
            json.rating,
            json.price,
            json.weapon_mode,
            json.missile_type,
            json.belongs_to,
            json.ed_id,
            json.ed_symbol,
            json.game_context_id,
            json.dps ?? null,
            json.ammo ?? null,
            json.additional_armour ?? null,
            json.mass ?? null,
            json.efficiency ?? null,
            json.power_produced ?? null,
            json.cells ?? null,
            json.count ?? null,
            json.bins ?? null,
            json.rate ?? null,
            json.power ?? null,
            json.recharge_rating ?? null,
            json.duration ?? null,
            json.range_km ?? null,
            json.damage ?? null,
            json.vehicle_count ?? null,
            json.capacity ?? null,
            json.ship
        );
    }

    /** @inheritDoc */
    public toJSON(): ModuleJSON {
        return {
            id: this.id,
            group_id: this.group.getId(),
            class: this.moduleClass,
            rating: this.rating,
            price: this.price,
            weapon_mode: this.weaponMode,
            missile_type: this.missileType,
            name: this.name,
            belongs_to: this.belongsToId,
            ed_id: this.edId,
            ed_symbol: this.edSymbol,
            game_context_id: this.gameContextId,
            dps: this.dps ?? undefined,
            ammo: this.ammo ?? undefined,
            mass: this.mass ?? undefined,
            efficiency: this.efficiency ?? undefined,
            power_produced: this.powerProduced ?? undefined,
            cells: this.cells ?? undefined,
            additional_armour: this.additionalArmour ?? undefined,
            count: this.count ?? undefined,
            bins: this.bins ?? undefined,
            rate: this.rate ?? undefined,
            power: this.power ?? undefined,
            recharge_rating: this.rechargeRating ?? undefined,
            duration: this.duration ?? undefined,
            range_km: this.range ?? undefined,
            damage: this.damage ?? undefined,
            vehicle_count: this.vehicleCount ?? undefined,
            capacity: this.capacity ?? undefined,
            ship: this.shipName,
            group: this.group.toJSON()
        };
    }

    /**
     * Returns the module name. Note that only special modules like "Prismatic Shields" have custom names. For standard
     * modules the name must be constructed from the group or category. [[getDisplayName]] already does this for you.
     *
     * @return The module name or null if none.
     */
    public getName(): string | null {
        return this.name;
    }

    /**
     * Returns the display name of the module. This is constructed from the name (if present), group or category, class
     * and rating.
     *
     * @return The modules display name.
     */
    public getDisplayName(): string {
        const name = this.name ?? this.group.getName();
        const properties: string[] = [];
        if (this.missileType != null) {
            properties.push(MissileType[this.missileType]);
        }
        if (this.weaponMode != null) {
            properties.push(this.weaponMode);
        }
        if (this.shipName != null) {
            properties.push(this.shipName);
        }
        const propStr = properties.length > 0 ? ` (${properties.join(", ")})` : "";
        return `${this.moduleClass}${this.rating} ${name}${propStr}`;
    }

    /**
     * Returns the module group.
     *
     * @return The module group.
     */
    public getGroup(): ModuleGroup {
        return this.group;
    }

    /**
     * Returns the module class (1-8).
     *
     * @return The module class.
     */
    public getClass(): number {
        return this.moduleClass;
    }

    /**
     * Returns the module rating (A-E).
     *
     * @return The module rating.
     */
    public getRating(): string {
        return this.rating;
    }

    /**
     * Returns the module price.
     *
     * @return The module price or null if unknown.
     */
    public getPrice(): number | null {
        return this.price;
    }

    /**
     * Returns the weapon mode like "Fixed", "Gimbal" or "Turret". Only applies to weapon modules.
     *
     * @return The weapon mode. Null if unknown or not applicable.
     */
    public getWeaponMode(): string | null {
        return this.weaponMode;
    }

    /**
     * Returns the missile type. Only applies to missile and torpedo racks.
     *
     * @return The missile type. Null if unknown or not applicable.
     */
    public getMissileType(): MissileType | null {
        return this.missileType;
    }

    /**
     * Returns the missile type name. Only applies to missile and torpedo racks.
     *
     * @return The missile type name. Null if unknown or not applicable.
     */
    public getMissileTypeName(): string | null {
        return this.missileType == null ? null : MissileType[this.missileType];
    }

    /**
     * Returns the module ID this module belongs to. This is used for specialized modules to refer to the corresponding
     * standard module it was derived from.
     *
     * @return The module ID this module belongs to. Null if none.
     */
    public getBelongsToId(): number | null {
        return this.belongsToId;
    }

    /**
     * Returns the module this module belongs to. This is used for specialized modules to refer to the corresponding
     * standard module it was derived from.
     *
     * @param modules - The modules for looking up the referenced module by id.
     * @return The module this module belongs to. Null if none.
     * @throws NotFoundException - When module was not found.
     */
    public getBelongsTo(modules: Modules): Module | null {
        return this.belongsToId == null ? null : modules.get(this.belongsToId);
    }

    /**
     * Returns the in-game ID of the module.
     *
     * @return The in-game ID.
     */
    public getEdId(): number {
        return this.edId;
    }

    /**
     * Returns the in-game symbol of the module.
     *
     * @return The in-game symbol
     */
    public getEdSymbol(): string {
        return this.edSymbol;
    }

    /**
     * Returns the game context id.
     *
     * @return The game context id. Null if none.
     */
    public getGameContextId(): number | null {
        return this.gameContextId;
    }

    /**
     * Returns the damage per second. Only applies to weapons and even there it may be missing.
     *
     * @return The damage per second. Null if unknown or not applicable.
     */
    public getDps(): number | null {
        return this.dps;
    }

    /**
     * Returns the amount of ammunition. Only applies to ammo-using weapons.
     *
     * @return The amount of ammunition. Null if unknown or not applicable.
     */
    public getAmmo(): number | null {
        return this.ammo;
    }

    /**
     * Returns the additional armour the module provides. Only applies to hull reinforcement modules.
     *
     * @return The additional armour provided. Null if unknown or not applicable.
     */
    public getAdditionalArmour(): number | null {
        return this.additionalArmour;
    }

    /**
     * Returns the mass added to the ship by this module.
     *
     * @return The added mass. Null if unknown or none.
     */
    public getMass(): number | null {
        return this.mass;
    }

    /**
     * Returns the power-plant heat efficiency. Only applies to power-plants.
     *
     * @return The heat efficiency. Null if unknown or not applicable.
     */
    public getEfficiency(): string | null {
        return this.efficiency;
    }

    /**
     * Returns the produced power. Only applies to power-plants.
     *
     * @return The produced power. Null if unknown or not applicable.
     */
    public getPowerProduced(): number | null {
        return this.powerProduced;
    }

    /**
     * Returns the number of cells. Only applies to shield cell banks.
     *
     * @return The number of cells. Null if unknown or not applicable.
     */
    public getCells(): number | null {
        return this.cells;
    }

    /**
     * Returns the number of supported limpets. Only applies to limpet controllers.
     *
     * @return The number of supported limpets. Null if unknown or not applicable.
     */
    public getCount(): number | null {
        return this.count;
    }

    /**
     * Returns the number of bins. Only applies to refineries.
     *
     * @return The number of bins. Null if unknown or not applicable.
     */
    public getBins(): number | null {
        return this.bins;
    }

    /**
     * Returns the scoop rate. Only applies to fuel scoops.
     *
     * @return The scoop rate. Null if unknown or not applicable.
     */
    public getRate(): number | null {
        return this.rate;
    }

    /**
     * Returns the consumed power. Only applies to modules which consumes power.
     *
     * @return The consumed power. Null if unknown or not applicable.
     */
    public getPower(): number | null {
        return this.power;
    }

    /**
     * Returns the shield recharge rating. Only applies to shield cell banks.
     *
     * @return The shield recharge rating. Null if unknown or not applicable.
     */
    public getRechargeRating(): string | null {
        return this.rechargeRating;
    }

    /**
     * Returns the duration of limpets or life support.
     *
     * @return The duration. Null if unknown or not applicable.
     */
    public getDuration(): number | null {
        return this.duration;
    }

    /**
     * Returns the range of limpets, sensors and scanners in kilometers.
     *
     * @return The range. Null if unknown or not applicable.
     */
    public getRange(): number | null {
        return this.range;
    }

    /**
     * Returns the damage. Only applies to weapons.
     *
     * @return The damage. Null if unknown or not applicable.
     */
    public getDamage(): number | null {
        return this.damage;
    }

    /**
     * Returns the vehicle count of vehicle hangars.
     *
     * @return The vehicle count. Null if unknown or not applicable.
     */
    public getVehicleCount(): number | null {
        return this.vehicleCount;
    }

    /**
     * Returns the capacity of cargo racks and fuel tanks.
     *
     * @return The capacity. Null if unknown or not applicable.
     */
    public getCapacity(): number | null {
        return this.capacity;
    }

    /**
     * Returns the name of the ship a bulkhead belongs to.
     *
     * @return The bulkhead ship name. Null if module is not a bulkhead.
     */
    public getShipName(): string | null {
        return this.shipName;
    }
}
