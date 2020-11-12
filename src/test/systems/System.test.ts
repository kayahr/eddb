import "jest-extended";
import "@kayahr/jest-matchers";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { State } from "../../main/common/State";
import { Factions, FactionsJSON } from "../../main/factions/Factions";
import { System, SystemJSON } from "../../main/systems/System";
import { SystemCoordinates } from "../../main/systems/SystemCoordinates";

const baseDir = path.join(__dirname, "../../..");
const factionsFile = path.join(baseDir, "src/test/data/factions.json");
const factionsJSON = JSON.parse(fs.readFileSync(factionsFile).toString()) as FactionsJSON;
const factions = Factions.fromJSON(factionsJSON);

const systemJSON1: SystemJSON = {
    id: 1,
    edsm_id: 2,
    name: "3",
    x: 4,
    y: 5,
    z: 6,
    population: 7,
    is_populated: true,
    government_id: 8,
    government: "9",
    allegiance_id: 10,
    allegiance: "11",
    states: [
        {
            id: 12,
            name: "13"
        },
        {
            id: 14,
            name: "15"
        }
    ],
    security_id: 16,
    security: "17",
    primary_economy_id: 18,
    primary_economy: "19",
    power: "20",
    power_state_id: 21,
    power_state: "22",
    needs_permit: false,
    updated_at: 23,
    simbad_ref: "24",
    controlling_minor_faction_id: 14271,
    controlling_minor_faction: "Canonn",
    reserve_type_id: 27,
    reserve_type: "28",
    minor_faction_presences: [
        {
            happiness_id: 29,
            minor_faction_id: 30,
            influence: 31,
            active_states: [
                {
                    id: 32,
                    name: "33"
                },
                {
                    id: 34,
                    name: "35"
                }
            ],
            pending_states: [],
            recovering_states: [
                {
                    id: 36,
                    name: "37"
                }
            ]
        },
        {
            happiness_id: null,
            minor_faction_id: 38,
            influence: null,
            active_states: [],
            pending_states: [],
            recovering_states: []
        }
    ],
    ed_system_address: 38
};
const system1 = System.fromJSON(systemJSON1);

const systemJSON2: SystemJSON = {
    id: 2,
    edsm_id: null,
    name: "3",
    x: 4,
    y: 5,
    z: 6,
    population: 7,
    is_populated: false,
    government_id: null,
    government: null,
    allegiance_id: null,
    allegiance: null,
    states: [],
    security_id: null,
    security: null,
    primary_economy_id: null,
    primary_economy: null,
    power: null,
    power_state: null,
    power_state_id: null,
    needs_permit: true,
    updated_at: 8,
    simbad_ref: "9",
    controlling_minor_faction_id: null,
    controlling_minor_faction: null,
    reserve_type_id: null,
    reserve_type: null,
    minor_faction_presences: [],
    ed_system_address: 10
};
const system2 = System.fromJSON(systemJSON2);

describe("System", () => {
    it("is equatable", () => {
        expect(system1).toBeEquatable(
            [ System.fromJSON(systemJSON1) ],
            [ system2 ]
        );
    });

    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(system1.toJSON()).toEqual(systemJSON1);
            expect(system2.toJSON()).toEqual(systemJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(system1.getId()).toBe(1);
            expect(system1.getEdsmId()).toBe(2);
            expect(system1.getName()).toBe("3");
            expect(system1.getCoordinates()).toEqual(new SystemCoordinates(4, 5, 6));
            expect(system1.getPopulation()).toBe(7);
            expect(system1.isPopulated()).toBe(true);
            expect(system1.getGovernment()?.getId()).toBe(8);
            expect(system1.getGovernment()?.getName()).toBe("9");
            expect(system1.getAllegiance()?.getId()).toBe(10);
            expect(system1.getAllegiance()?.getName()).toBe("11");
            expect(system1.getStates().length).toBe(2);
            expect(system1.getStates()[0]).toEqual(new State(12, "13"));
            expect(system1.getStates()[1]).toEqual(new State(14, "15"));
            expect(system1.getSecurity()?.getId()).toBe(16);
            expect(system1.getSecurity()?.getName()).toBe("17");
            expect(system1.getPrimaryEconomy()?.getId()).toBe(18);
            expect(system1.getPrimaryEconomy()?.getName()).toBe("19");
            expect(system1.getPower()).toBe("20");
            expect(system1.getPowerState()?.getId()).toBe(21);
            expect(system1.getPowerState()?.getName()).toBe("22");
            expect(system1.isPermitNeeded()).toBe(false);
            expect(system1.getUpdatedAt()).toEqual(new Date(23 * 1000));
            expect(system1.getSimbadRef()).toBe("24");
            expect(system1.getControllingMinorFactionId()).toBe(14271);
            expect(system1.getControllingMinorFactionName()).toBe("Canonn");
            expect(system1.getReserveType()?.getId()).toBe(27);
            expect(system1.getReserveType()?.getName()).toBe("28");
            expect(system1.getMinorFactionPresences().length).toBe(2);
            expect(system1.getEdSystemAddress()).toBe(38);

            expect(system2.getId()).toBe(2);
            expect(system2.getName()).toBe("3");
            expect(system2.getEdsmId()).toBeNull();
            expect(system2.getCoordinates()).toEqual(new SystemCoordinates(4, 5, 6));
            expect(system2.getPopulation()).toBe(7);
            expect(system2.isPopulated()).toBe(false);
            expect(system2.getGovernment()).toBeNull();
            expect(system2.getAllegiance()).toBeNull();
            expect(system2.getStates()).toEqual([]);
            expect(system2.getSecurity()).toBeNull();
            expect(system2.getPrimaryEconomy()).toBeNull();
            expect(system2.getPower()).toBeNull();
            expect(system2.getPowerState()).toBeNull();
            expect(system2.isPermitNeeded()).toBe(true);
            expect(system2.getUpdatedAt()).toEqual(new Date(8 * 1000));
            expect(system2.getSimbadRef()).toBe("9");
            expect(system2.getControllingMinorFactionId()).toBeNull();
            expect(system2.getControllingMinorFactionName()).toBeNull();
            expect(system2.getReserveType()).toBeNull();
            expect(system2.getMinorFactionPresences()).toEqual([]);
            expect(system2.getEdSystemAddress()).toBe(10);
        });
    });

    describe("getControllingMinorFaction", () => {
        it("looks up the faction in the given factions list", () => {
            expect(system1.getControllingMinorFaction(factions)?.getName()).toBe("Canonn");
        });
        it("throws exception when module was not found in provided list", () => {
            expect(() => system1.getControllingMinorFaction(new Factions())).toThrowWithMessage(NotFoundException,
                "14271 not found in Factions");
        });
        it("returns null when no controlling faction is known", () => {
            expect(system2.getControllingMinorFaction(new Factions())).toBeNull();
        });
    });
});
