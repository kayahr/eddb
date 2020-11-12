import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { Commodities, CommoditiesJSON } from "../../main/commodities/Commodities";
import { State } from "../../main/common/State";
import { Factions, FactionsJSON } from "../../main/factions/Factions";
import { Modules, ModulesJSON } from "../../main/modules/Modules";
import { Station, StationJSON } from "../../main/stations/Station";
import { Systems, SystemsJSON } from "../../main/systems/Systems";

const baseDir = path.join(__dirname, "../../..");
const systemsFile = path.join(baseDir, "src/test/data/systems_populated.json");
const systemsJSON = JSON.parse(fs.readFileSync(systemsFile).toString()) as SystemsJSON;
const systems = Systems.fromJSON(systemsJSON);

const commoditiesFile = path.join(baseDir, "src/test/data/commodities.json");
const commoditiesJSON = JSON.parse(fs.readFileSync(commoditiesFile).toString()) as CommoditiesJSON;
const commodities = Commodities.fromJSON(commoditiesJSON);

const modulesFile = path.join(baseDir, "src/test/data/modules.json");
const modulesJSON = JSON.parse(fs.readFileSync(modulesFile).toString()) as ModulesJSON;
const modules = Modules.fromJSON(modulesJSON);

const factionsFile = path.join(baseDir, "src/test/data/factions.json");
const factionsJSON = JSON.parse(fs.readFileSync(factionsFile).toString()) as FactionsJSON;
const factions = Factions.fromJSON(factionsJSON);

const stationJSON1: StationJSON = {
    id: 1,
    name: "2",
    system_id: 18454,
    updated_at: 4,
    max_landing_pad_size: "5",
    distance_to_star: 6,
    government_id: 7,
    government: "8",
    allegiance_id: 9,
    allegiance: "10",
    states: [
        {
            id: 11,
            name: "12"
        },
        {
            id: 13,
            name: "14"
        }
    ],
    type_id: 15,
    type: "16",
    has_blackmarket: true,
    has_market: false,
    has_refuel: true,
    has_repair: false,
    has_rearm: true,
    has_outfitting: false,
    has_shipyard: true,
    has_docking: false,
    has_commodities: true,
    import_commodities: [ "Food Cartridges", "Fruit and Vegetables" ],
    export_commodities: [ "Grain" ],
    prohibited_commodities: [ "Synthetic Meat", "Tea", "Polymers" ],
    economies: [ "23", "24" ],
    shipyard_updated_at: 25,
    outfitting_updated_at: 26,
    market_updated_at: 27,
    is_planetary: true,
    selling_ships: [ "28", "29" ],
    selling_modules: [ 1155, 1156 ],
    settlement_size_id: 32,
    settlement_size: "33",
    settlement_security_id: 34,
    settlement_security: "35",
    body_id: 36,
    controlling_minor_faction_id: 14271,
    ed_market_id: 38
};
const station1 = Station.fromJSON(stationJSON1);

const stationJSON2: StationJSON = {
    id: 2,
    name: "3",
    system_id: 4,
    updated_at: 5,
    max_landing_pad_size: "6",
    distance_to_star: null,
    government_id: null,
    government: null,
    allegiance_id: null,
    allegiance: null,
    states: [],
    type_id: null,
    type: null,
    has_blackmarket: false,
    has_market: true,
    has_refuel: false,
    has_repair: true,
    has_rearm: false,
    has_outfitting: true,
    has_shipyard: false,
    has_docking: true,
    has_commodities: false,
    import_commodities: [],
    export_commodities: [],
    prohibited_commodities: [],
    economies: [],
    shipyard_updated_at: null,
    outfitting_updated_at: null,
    market_updated_at: null,
    is_planetary: false,
    selling_ships: [],
    selling_modules: [],
    settlement_size_id: null,
    settlement_size: null,
    settlement_security_id: null,
    settlement_security: null,
    body_id: null,
    controlling_minor_faction_id: null,
    ed_market_id: 7
};
const station2 = Station.fromJSON(stationJSON2);

describe("Station", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(station1.toJSON()).toEqual(stationJSON1);
            expect(station2.toJSON()).toEqual(stationJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(station1.getId()).toBe(1);
            expect(station1.getName()).toBe("2");
            expect(station1.getSystemId()).toBe(18454);
            expect(station1.getUpdatedAt()).toEqual(new Date(4 * 1000));
            expect(station1.getMaxLandingPadSize()).toBe("5");
            expect(station1.getDistanceToStar()).toBe(6);
            expect(station1.getGovernment()?.getId()).toBe(7);
            expect(station1.getGovernment()?.getName()).toBe("8");
            expect(station1.getAllegiance()?.getId()).toBe(9);
            expect(station1.getAllegiance()?.getName()).toBe("10");
            expect(station1.getStates().length).toBe(2);
            expect(station1.getStates()[0]).toEqual(new State(11, "12"));
            expect(station1.getStates()[1]).toEqual(new State(13, "14"));
            expect(station1.getType()?.getId()).toBe(15);
            expect(station1.getType()?.getName()).toBe("16");
            expect(station1.hasBlackmarket()).toBe(true);
            expect(station1.hasMarket()).toBe(false);
            expect(station1.hasRefuel()).toBe(true);
            expect(station1.hasRepair()).toBe(false);
            expect(station1.hasRearm()).toBe(true);
            expect(station1.hasOutfitting()).toBe(false);
            expect(station1.hasShipyard()).toBe(true);
            expect(station1.hasDocking()).toBe(false);
            expect(station1.hasCommodities()).toBe(true);
            expect(station1.getImportCommodityNames()).toEqual([ "Food Cartridges", "Fruit and Vegetables" ]);
            expect(station1.getExportCommodityNames()).toEqual([ "Grain" ]);
            expect(station1.getProhibitedCommodityNames()).toEqual([ "Synthetic Meat", "Tea", "Polymers" ]);
            expect(station1.getEconomies().length).toBe(2);
            expect(station1.getEconomies()[0].getName()).toBe("23");
            expect(station1.getEconomies()[1].getName()).toBe("24");
            expect(station1.getShipyardUpdatedAt()).toEqual(new Date(25 * 1000));
            expect(station1.getOutfittingUpdatedAt()).toEqual(new Date(26 * 1000));
            expect(station1.getMarketUpdatedAt()).toEqual(new Date(27 * 1000));
            expect(station1.isPlanetary()).toBe(true);
            expect(station1.getSellingShipNames()).toEqual([ "28", "29" ]);
            expect(station1.getSellingModuleIds()).toEqual([ 1155, 1156 ]);
            expect(station1.getSettlementSize()?.getId()).toBe(32);
            expect(station1.getSettlementSize()?.getName()).toBe("33");
            expect(station1.getSettlementSecurity()?.getId()).toBe(34);
            expect(station1.getSettlementSecurity()?.getName()).toBe("35");
            expect(station1.getBodyId()).toBe(36);
            expect(station1.getControllingMinorFactionId()).toBe(14271);
            expect(station1.getEdMarketId()).toBe(38);

            expect(station2.getId()).toBe(2);
            expect(station2.getName()).toBe("3");
            expect(station2.getSystemId()).toBe(4);
            expect(station2.getUpdatedAt()).toEqual(new Date(5 * 1000));
            expect(station2.getMaxLandingPadSize()).toBe("6");
            expect(station2.getDistanceToStar()).toBeNull();
            expect(station2.getGovernment()).toBeNull();
            expect(station2.getAllegiance()).toBeNull();
            expect(station2.getStates()).toEqual([]);
            expect(station2.getType()).toBeNull();
            expect(station2.hasBlackmarket()).toBe(false);
            expect(station2.hasMarket()).toBe(true);
            expect(station2.hasRefuel()).toBe(false);
            expect(station2.hasRepair()).toBe(true);
            expect(station2.hasRearm()).toBe(false);
            expect(station2.hasOutfitting()).toBe(true);
            expect(station2.hasShipyard()).toBe(false);
            expect(station2.hasDocking()).toBe(true);
            expect(station2.hasCommodities()).toBe(false);
            expect(station2.getImportCommodityNames()).toEqual([]);
            expect(station2.getExportCommodityNames()).toEqual([]);
            expect(station2.getProhibitedCommodityNames()).toEqual([]);
            expect(station2.getEconomies()).toEqual([]);
            expect(station2.getShipyardUpdatedAt()).toBeNull();
            expect(station2.getOutfittingUpdatedAt()).toBeNull();
            expect(station2.getMarketUpdatedAt()).toBeNull();
            expect(station2.isPlanetary()).toBe(false);
            expect(station2.getSellingShipNames()).toEqual([]);
            expect(station2.getSellingModuleIds()).toEqual([]);
            expect(station2.getSettlementSize()).toBeNull();
            expect(station2.getSettlementSecurity()).toBeNull();
            expect(station2.getBodyId()).toBeNull();
            expect(station2.getControllingMinorFactionId()).toBeNull();
            expect(station2.getEdMarketId()).toBe(7);
        });
    });

    describe("getHomeSystem", () => {
        it("looks up the system this station belongs to in the given systems list", () => {
            expect(station1.getSystem(systems).getId()).toBe(18454);
        });
        it("throws exception when station was not found in provided list", () => {
            expect(() => station1.getSystem(new Systems())).toThrowWithMessage(NotFoundException,
                "18454 not found in Systems");
        });
    });

    describe("getImportCommodities", () => {
        it("looks up the import commodities in the given commodities list", () => {
            expect(station1.getImportCommodities(commodities).map(c => c.getId())).toEqual([ 17, 18 ]);
        });
        it("throws exception when commodity was not found in provided list", () => {
            expect(() => station1.getImportCommodities(new Commodities())).toThrowWithMessage(NotFoundException,
                "Food Cartridges not found in Commodities");
        });
    });

    describe("getExportCommodities", () => {
        it("looks up the export commodities in the given commodities list", () => {
            expect(station1.getExportCommodities(commodities).map(c => c.getId())).toEqual([ 19 ]);
        });
        it("throws exception when commodity was not found in provided list", () => {
            expect(() => station1.getExportCommodities(new Commodities())).toThrowWithMessage(NotFoundException,
                "Grain not found in Commodities");
        });
    });

    describe("getProhibitedCommodities", () => {
        it("looks up the prohibited commodities in the given commodities list", () => {
            expect(station1.getProhibitedCommodities(commodities).map(c => c.getId())).toEqual([ 20, 21, 22 ]);
        });
        it("throws exception when commodity was not found in provided list", () => {
            expect(() => station1.getProhibitedCommodities(new Commodities())).toThrowWithMessage(NotFoundException,
                "Synthetic Meat not found in Commodities");
        });
    });

    describe("getSellingModules", () => {
        it("looks up the sold modules in the given modules list", () => {
            expect(station1.getSellingModules(modules).map(c => c.getId())).toEqual([ 1155, 1156 ]);
        });
        it("throws exception when module was not found in provided list", () => {
            expect(() => station1.getSellingModules(new Modules())).toThrowWithMessage(NotFoundException,
                "1155 not found in Modules");
        });
    });

    describe("getControllingMinorFaction", () => {
        it("looks up the faction in the given factions list", () => {
            expect(station1.getControllingMinorFaction(factions)?.getName()).toBe("Canonn");
        });
        it("throws exception when module was not found in provided list", () => {
            expect(() => station1.getControllingMinorFaction(new Factions())).toThrowWithMessage(NotFoundException,
                "14271 not found in Factions");
        });
        it("returns null when no controlling faction is known", () => {
            expect(station2.getControllingMinorFaction(new Factions())).toBeNull();
        });
    });
});
