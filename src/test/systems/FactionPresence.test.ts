import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { State } from "../../main/common/State";
import { Factions, FactionsJSON } from "../../main/factions/Factions";
import { FactionPresence, FactionPresenceJSON } from "../../main/systems/FactionPresence";

const baseDir = path.join(__dirname, "../../..");
const factionsFile = path.join(baseDir, "src/test/data/factions.json");
const factionsJSON = JSON.parse(fs.readFileSync(factionsFile).toString()) as FactionsJSON;
const factions = Factions.fromJSON(factionsJSON);

const factionPresenceJSON1: FactionPresenceJSON = {
    happiness_id: 1,
    minor_faction_id: 2,
    influence: 3,
    active_states: [
        {
            id: 4,
            name: "5"
        },
        {
            id: 6,
            name: "7"
        }
    ],
    pending_states: [
        {
            id: 8,
            name: "9"
        }

    ],
    recovering_states: [
        {
            id: 10,
            name: "11"
        }
    ]
};
const factionPresence1 = FactionPresence.fromJSON(factionPresenceJSON1);

const factionPresenceJSON2: FactionPresenceJSON = {
    happiness_id: null,
    minor_faction_id: 14271,
    influence: null,
    active_states: [],
    pending_states: [],
    recovering_states: []
};
const factionPresence2 = FactionPresence.fromJSON(factionPresenceJSON2);

describe("FactionPresence", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(factionPresence1.toJSON()).toEqual(factionPresenceJSON1);
            expect(factionPresence2.toJSON()).toEqual(factionPresenceJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(factionPresence1.getHappinessId()).toBe(1);
            expect(factionPresence1.getMinorFactionId()).toBe(2);
            expect(factionPresence1.getInfluence()).toBe(3);
            expect(factionPresence1.getActiveStates().length).toBe(2);
            expect(factionPresence1.getActiveStates()[0]).toEqual(new State(4, "5"));
            expect(factionPresence1.getActiveStates()[1]).toEqual(new State(6, "7"));
            expect(factionPresence1.getPendingStates().length).toBe(1);
            expect(factionPresence1.getPendingStates()[0]).toEqual(new State(8, "9"));
            expect(factionPresence1.getRecoveringStates().length).toBe(1);
            expect(factionPresence1.getRecoveringStates()[0]).toEqual(new State(10, "11"));

            expect(factionPresence2.getHappinessId()).toBe(null);
            expect(factionPresence2.getMinorFactionId()).toBe(14271);
            expect(factionPresence2.getInfluence()).toBe(null);
            expect(factionPresence2.getActiveStates().length).toBe(0);
            expect(factionPresence2.getPendingStates().length).toBe(0);
            expect(factionPresence2.getRecoveringStates().length).toBe(0);
        });
    });

    describe("getControllingMinorFaction", () => {
        it("looks up the faction in the given factions list", () => {
            expect(factionPresence2.getMinorFaction(factions)?.getName()).toBe("Canonn");
        });
        it("throws exception when module was not found in provided list", () => {
            expect(() => factionPresence2.getMinorFaction(new Factions())).toThrowWithMessage(NotFoundException,
                "14271 not found in Factions");
        });
    });
});
