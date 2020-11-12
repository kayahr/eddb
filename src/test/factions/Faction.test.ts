import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Faction, FactionJSON } from "../../main/factions/Faction";
import { Systems } from "../../main/systems/Systems";

const baseDir = path.join(__dirname, "../../..");

const factionJSON1: FactionJSON = {
    id: 1,
    name: "foo",
    updated_at: 1604330025,
    government_id: 2,
    government: "a",
    allegiance_id: null,
    allegiance: null,
    home_system_id: 18454,
    is_player_faction: true
};
const faction1 = Faction.fromJSON(factionJSON1);

const factionJSON2: FactionJSON = {
    id: 2,
    name: "bar",
    updated_at: 1604330026,
    government_id: null,
    government: null,
    allegiance_id: 3,
    allegiance: "b",
    home_system_id: null,
    is_player_faction: false
};
const faction2 = Faction.fromJSON(factionJSON2);

describe("Faction", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(faction1.toJSON()).toEqual(factionJSON1);
            expect(faction2.toJSON()).toEqual(factionJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(faction1.getId()).toBe(1);
            expect(faction1.getName()).toBe("foo");
            expect(faction1.getUpdatedAt()).toEqual(new Date(1604330025000));
            expect(faction1.getGovernment()?.getId()).toBe(2);
            expect(faction1.getGovernment()?.getName()).toBe("a");
            expect(faction1.getAllegiance()).toBeNull();
            expect(faction1.getHomeSystemId()).toBe(18454);
            expect(faction1.isPlayerFaction()).toBe(true);

            expect(faction2.getId()).toBe(2);
            expect(faction2.getName()).toBe("bar");
            expect(faction2.getUpdatedAt()).toEqual(new Date(1604330026000));
            expect(faction2.getGovernment()).toBeNull();
            expect(faction2.getAllegiance()?.getId()).toBe(3);
            expect(faction2.getAllegiance()?.getName()).toBe("b");
            expect(faction2.getHomeSystemId()).toBeNull();
            expect(faction2.isPlayerFaction()).toBe(false);
        });
    });

    describe("getHomeSystem", () => {
        it("looks up the home system in the given systems list", async () => {
            const file = path.join(baseDir, "src/test/data/systems_populated.jsonl");
            const systems = await Systems.fromJSONL(readline.createInterface({ input: fs.createReadStream(file) }));
            expect(faction1.getHomeSystem(systems)?.getName()).toBe("Varati");
        });
        it("throws exception when system was not found in provided list", () => {
            expect(() => faction1.getHomeSystem(new Systems())).toThrowWithMessage(NotFoundException,
                "18454 not found in Systems");
        });
        it("returns null when no home system is known", () => {
            expect(faction2.getHomeSystem(new Systems())).toBeNull();
        });
    });
});
