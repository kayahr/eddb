import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { Module, ModuleJSON } from "../../main/modules/Module";
import { Modules, ModulesJSON } from "../../main/modules/Modules";

const baseDir = path.join(__dirname, "../../..");
const file = path.join(baseDir, "src/test/data/modules.json");
const json = JSON.parse(fs.readFileSync(file).toString()) as ModulesJSON;
const modules = Modules.fromJSON(json);

const moduleJSON1: ModuleJSON = {
    id: 1,
    group_id: 2,
    class: 3,
    rating: "A",
    price: 4,
    weapon_mode: "Fixed",
    missile_type: 16,
    name: "Laser",
    belongs_to: 1485,
    ed_id: 5,
    ed_symbol: "$ed$",
    game_context_id: 6,
    dps: 7,
    ammo: 8,
    mass: 9,
    efficiency: "B",
    power_produced: 10,
    cells: 11,
    additional_armour: 12,
    count: 13,
    bins: 14,
    rate: 15,
    power: 16,
    recharge_rating: "C",
    duration: 17,
    range_km: 18,
    damage: 19,
    vehicle_count: 20,
    capacity: 21,
    ship: "Imperial Clipper",
    group: {
        id: 2,
        category_id: 22,
        name: "group name",
        category: "category name"
    }
};
const module1 = Module.fromJSON(moduleJSON1);

const moduleJSON2: ModuleJSON = {
    id: 2,
    group_id: 3,
    class: 5,
    rating: "E",
    price: null,
    weapon_mode: null,
    missile_type: null,
    name: null,
    belongs_to: null,
    ed_id: 6,
    ed_symbol: "$3",
    game_context_id: null,
    ship: null,
    group: {
        id: 3,
        category_id: 4,
        name: "group",
        category: "category"
    }
};
const module2 = Module.fromJSON(moduleJSON2);

describe("Module", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(module1.toJSON()).toEqual(moduleJSON1);
            expect(module2.toJSON()).toEqual(moduleJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(module1.getId()).toBe(1);
            expect(module1.getName()).toBe("Laser");
            expect(module1.getGroup().getId()).toBe(2);
            expect(module1.getGroup().getName()).toBe("group name");
            expect(module1.getClass()).toBe(3);
            expect(module1.getRating()).toBe("A");
            expect(module1.getPrice()).toBe(4);
            expect(module1.getWeaponMode()).toBe("Fixed");
            expect(module1.getMissileType()).toBe(16);
            expect(module1.getBelongsToId()).toBe(1485);
            expect(module1.getEdId()).toBe(5);
            expect(module1.getEdSymbol()).toBe("$ed$");
            expect(module1.getGameContextId()).toBe(6);
            expect(module1.getDps()).toBe(7);
            expect(module1.getAmmo()).toBe(8);
            expect(module1.getMass()).toBe(9);
            expect(module1.getEfficiency()).toBe("B");
            expect(module1.getPowerProduced()).toBe(10);
            expect(module1.getCells()).toBe(11);
            expect(module1.getAdditionalArmour()).toBe(12);
            expect(module1.getCount()).toBe(13);
            expect(module1.getBins()).toBe(14);
            expect(module1.getRate()).toBe(15);
            expect(module1.getPower()).toBe(16);
            expect(module1.getRechargeRating()).toBe("C");
            expect(module1.getDuration()).toBe(17);
            expect(module1.getRange()).toBe(18);
            expect(module1.getDamage()).toBe(19);
            expect(module1.getVehicleCount()).toBe(20);
            expect(module1.getCapacity()).toBe(21);
            expect(module1.getShipName()).toBe("Imperial Clipper");
            expect(module1.getGroup().getCategory().getId()).toBe(22);
            expect(module1.getGroup().getCategory().getName()).toBe("category name");

            expect(module2.getId()).toBe(2);
            expect(module2.getName()).toBeNull();
            expect(module2.getGroup().getId()).toBe(3);
            expect(module2.getGroup().getName()).toBe("group");
            expect(module2.getClass()).toBe(5);
            expect(module2.getRating()).toBe("E");
            expect(module2.getPrice()).toBeNull();
            expect(module2.getWeaponMode()).toBeNull();
            expect(module2.getMissileType()).toBeNull();
            expect(module2.getBelongsToId()).toBeNull();
            expect(module2.getEdId()).toBe(6);
            expect(module2.getEdSymbol()).toBe("$3");
            expect(module2.getGameContextId()).toBeNull();
            expect(module2.getDps()).toBeNull();
            expect(module2.getAmmo()).toBeNull();
            expect(module2.getMass()).toBeNull();
            expect(module2.getEfficiency()).toBeNull();
            expect(module2.getPowerProduced()).toBeNull();
            expect(module2.getCells()).toBeNull();
            expect(module2.getAdditionalArmour()).toBeNull();
            expect(module2.getCount()).toBeNull();
            expect(module2.getBins()).toBeNull();
            expect(module2.getRate()).toBeNull();
            expect(module2.getPower()).toBeNull();
            expect(module2.getRechargeRating()).toBeNull();
            expect(module2.getDuration()).toBeNull();
            expect(module2.getRange()).toBeNull();
            expect(module2.getDamage()).toBeNull();
            expect(module2.getVehicleCount()).toBeNull();
            expect(module2.getCapacity()).toBeNull();
            expect(module2.getShipName()).toBeNull();
            expect(module2.getGroup().getCategory().getId()).toBe(4);
            expect(module2.getGroup().getCategory().getName()).toBe("category");
        });
    });

    describe("getMissileTypeName", () => {
        it("returns the missile type as string", () => {
            expect(modules.get(1792).getMissileTypeName()).toBe("Seeker");
            expect(modules.get(1623).getMissileTypeName()).toBe("Dumbfire");
            expect(modules.get(1486).getMissileTypeName()).toBeNull();
        });
    });

    describe("getDisplayName", () => {
        it("returns display name for a standard module", () => {
            expect(modules.get(1486).getDisplayName()).toBe("2A Prismatic Shield Generator");
            expect(modules.get(1792).getDisplayName()).toBe("2B Seismic Charge Launcher (Seeker, Turret)");
            expect(modules.get(873).getDisplayName()).toBe("2C Plasma Accelerator (Fixed)");
            expect(modules.get(1623).getDisplayName()).toBe("3A AX Missile Rack (Dumbfire, Fixed)");
            expect(modules.get(790).getDisplayName()).toBe("1I Military Grade Composite (Imperial Clipper)");
        });
    });

    describe("getHomeSystem", () => {
        it("looks up the module this module belongs to in the given modules list", () => {
            expect(module1.getBelongsTo(modules)?.getId()).toBe(1485);
        });
        it("throws exception when module was not found in provided list", () => {
            expect(() => module1.getBelongsTo(new Modules())).toThrowWithMessage(NotFoundException,
                "1485 not found in Modules");
        });
        it("returns null when no module was referenced", () => {
            expect(module2.getBelongsTo(new Modules())).toBeNull();
        });
    });
});
