import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Attraction, AttractionJSON } from "../../main/attractions/Attraction";
import { Factions } from "../../main/factions/Factions";
import { Systems } from "../../main/systems/Systems";

const baseDir = path.join(__dirname, "../../..");

const attractionJSON1: AttractionJSON = {
    "id": 1,
    "updated_at": 2,
    "name": "3",
    "group_id": 4,
    "group_name": "5",
    "system_id": 6,
    "body_id": null,
    "body_name": null,
    "is_planetary": null,
    "is_approved": false,
    "distance_to_spawn": null,
    "body_latitude": null,
    "body_longitude": null,
    "controlling_minor_faction_id": null,
    "allegiance_id": null,
    "allegiance_name": null,
    "government_id": null,
    "government_name": null,
    "faction_updated_at": null,
    "layout_id": 7,
    "layout": {
        "updated_at": 8,
        "is_unique": false,
        "is_unknown": false,
        "threat_level_id": null,
        "threat_level_name": null,
        "has_cdt": null,
        "requires_srv_jumping": null,
        "description": null,
        "race_id": null,
        "race_name": null,
        "settlement_size_id": null,
        "settlement_size_name": null,
        "settlement_security_id": null,
        "settlement_security_name": null,
        "settlement_type_id": null,
        "settlement_type_name": null,
        "installation_type_id": null,
        "installation_type_name": null,
        "beacon_type_id": null,
        "beacon_type_name": null,
        "tourist_beacon_index": null,
        "shipwreck_type_id": null,
        "shipwreck_type_name": null,
        "materials": [],
        "commodities": []
    }
};
const attraction1 = Attraction.fromJSON(attractionJSON1);

const attractionJSON2: AttractionJSON = {
    "id": 2,
    "updated_at": 3,
    "name": "4",
    "group_id": 5,
    "group_name": "6",
    "system_id": 18454,
    "body_id": 8,
    "body_name": "9",
    "is_planetary": true,
    "is_approved": true,
    "distance_to_spawn": 10,
    "body_latitude": 11,
    "body_longitude": 12,
    "controlling_minor_faction_id": 14271,
    "allegiance_id": 14,
    "allegiance_name": "15",
    "government_id": 16,
    "government_name": "17",
    "faction_updated_at": 18,
    "layout_id": 19,
    "layout": {
        "updated_at": 8,
        "is_unique": false,
        "is_unknown": false,
        "threat_level_id": null,
        "threat_level_name": null,
        "has_cdt": null,
        "requires_srv_jumping": null,
        "description": null,
        "race_id": null,
        "race_name": null,
        "settlement_size_id": null,
        "settlement_size_name": null,
        "settlement_security_id": null,
        "settlement_security_name": null,
        "settlement_type_id": null,
        "settlement_type_name": null,
        "installation_type_id": null,
        "installation_type_name": null,
        "beacon_type_id": null,
        "beacon_type_name": null,
        "tourist_beacon_index": null,
        "shipwreck_type_id": null,
        "shipwreck_type_name": null,
        "materials": [],
        "commodities": []
    }
};
const attraction2 = Attraction.fromJSON(attractionJSON2);

describe("Attraction", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(attraction1.toJSON()).toEqual(attractionJSON1);
            expect(attraction2.toJSON()).toEqual(attractionJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(attraction1.getId()).toBe(1);
            expect(attraction1.getUpdatedAt().getTime()).toEqual(2000);
            expect(attraction1.getName()).toBe("3");
            expect(attraction1.getGroup().getId()).toBe(4);
            expect(attraction1.getGroup().getName()).toBe("5");
            expect(attraction1.getSystemId()).toBe(6);
            expect(attraction1.getBody()).toBeNull();
            expect(attraction1.isPlanetary()).toBeNull();
            expect(attraction1.isApproved()).toBe(false);
            expect(attraction1.getDistanceToSpawn()).toBeNull();
            expect(attraction1.getBodyLocation()).toBeNull();
            expect(attraction1.getControllingMinorFactionId()).toBeNull();
            expect(attraction1.getAllegiance()).toBeNull();
            expect(attraction1.getGovernment()).toBeNull();
            expect(attraction1.getFactionUpdatedAt()).toBeNull();
            expect(attraction1.getLayout().getId()).toBe(7);

            expect(attraction2.getId()).toBe(2);
            expect(attraction2.getUpdatedAt().getTime()).toEqual(3000);
            expect(attraction2.getName()).toBe("4");
            expect(attraction2.getGroup().getId()).toBe(5);
            expect(attraction2.getGroup().getName()).toBe("6");
            expect(attraction2.getSystemId()).toBe(18454);
            expect(attraction2.getBody()?.getId()).toBe(8);
            expect(attraction2.getBody()?.getName()).toBe("9");
            expect(attraction2.isPlanetary()).toBe(true);
            expect(attraction2.isApproved()).toBe(true);
            expect(attraction2.getDistanceToSpawn()).toBe(10);
            expect(attraction2.getBodyLocation()?.getLatitude()).toBe(11);
            expect(attraction2.getBodyLocation()?.getLongitude()).toBe(12);
            expect(attraction2.getControllingMinorFactionId()).toBe(14271);
            expect(attraction2.getAllegiance()?.getId()).toBe(14);
            expect(attraction2.getAllegiance()?.getName()).toBe("15");
            expect(attraction2.getGovernment()?.getId()).toBe(16);
            expect(attraction2.getGovernment()?.getName()).toBe("17");
            expect(attraction2.getFactionUpdatedAt()?.getTime()).toBe(18000);
            expect(attraction2.getLayout().getId()).toBe(19);
        });
    });

    describe("getSystem", () => {
        it("looks up the system in the given systems list", async () => {
            const file = path.join(baseDir, "src/test/data/systems_populated.jsonl");
            const systems = await Systems.fromJSONL(readline.createInterface({ input: fs.createReadStream(file) }));
            expect(attraction2.getSystem(systems)?.getName()).toBe("Varati");
        });
        it("throws exception when system was not found in provided list", () => {
            expect(() => attraction2.getSystem(new Systems())).toThrowWithMessage(NotFoundException,
                "18454 not found in Systems");
        });
    });

    describe("getControllingMinorFaction", () => {
        it("looks up the faction in the given factions list", async () => {
            const file = path.join(baseDir, "src/test/data/factions.jsonl");
            const factions = await Factions.fromJSONL(readline.createInterface({ input: fs.createReadStream(file) }));
            expect(attraction2.getControllingMinorFaction(factions)?.getName()).toBe("Canonn");
        });
        it("throws exception when system was not found in provided list", () => {
            expect(() => attraction2.getControllingMinorFaction(new Factions())).toThrowWithMessage(NotFoundException,
                "14271 not found in Factions");
        });
        it("returns null when no controlling faction is known", () => {
            expect(attraction1.getControllingMinorFaction(new Factions())).toBeNull();
        });
    });
});
