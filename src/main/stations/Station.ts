/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Commodities } from "../commodities/Commodities";
import { Commodity } from "../commodities/Commodity";
import { Allegiance } from "../common/Allegiance";
import { Allegiances } from "../common/Allegiances";
import { Economies } from "../common/Economies";
import { Economy } from "../common/Economy";
import { Government } from "../common/Government";
import { Governments } from "../common/Governments";
import { State, StateJSON } from "../common/State";
import { States } from "../common/States";
import { Faction } from "../factions/Faction";
import { Factions } from "../factions/Factions";
import { Module } from "../modules/Module";
import { Modules } from "../modules/Modules";
import { System } from "../systems/System";
import { Systems } from "../systems/Systems";
import { Factories } from "../util/Factories";
import { NamedEntity } from "../util/NamedEntity";
import { SettlementSecurities } from "./SettlementSecurities";
import { SettlementSecurity } from "./SettlementSecurity";
import { SettlementSize } from "./SettlementSize";
import { SettlementSizes } from "./SettlementSizes";
import { StationType } from "./StationType";
import { StationTypes } from "./StationTypes";

let nextEconomyId = Number.MAX_SAFE_INTEGER;

export interface StationJSON {
    id: number;
    name: string;
    system_id: number;
    updated_at: number;
    max_landing_pad_size: string;
    distance_to_star: number | null;
    government_id: number | null;
    government: string | null;
    allegiance_id: number | null;
    allegiance: string | null;
    states: StateJSON[];
    type_id: number | null;
    type: string | null;
    has_blackmarket: boolean;
    has_market: boolean;
    has_refuel: boolean;
    has_repair: boolean;
    has_rearm: boolean;
    has_outfitting: boolean;
    has_shipyard: boolean;
    has_docking: boolean;
    has_commodities: boolean;
    import_commodities: string[];
    export_commodities: string[];
    prohibited_commodities: string[];
    economies: string[];
    shipyard_updated_at: number | null;
    outfitting_updated_at: number | null;
    market_updated_at: number | null;
    is_planetary: boolean;
    selling_ships: string[];
    selling_modules: number[];
    settlement_size_id: number | null;
    settlement_size: string | null;
    settlement_security_id: number | null;
    settlement_security: string | null;
    body_id: number | null;
    controlling_minor_faction_id: number | null;
    ed_market_id: number;
}

export class Station extends NamedEntity {
    public constructor(
        id: number,
        name: string,
        private readonly systemId: number,
        private readonly updatedAt: Date,
        private readonly maxLandingPadSize: string,
        private readonly distanceToStar: number | null,
        private readonly government: Government | null,
        private readonly allegiance: Allegiance | null,
        private readonly states: readonly State[],
        private readonly type: StationType | null,
        private readonly blackmarket: boolean,
        private readonly market: boolean,
        private readonly refuel: boolean,
        private readonly repair: boolean,
        private readonly rearm: boolean,
        private readonly outfitting: boolean,
        private readonly shipyard: boolean,
        private readonly docking: boolean,
        private readonly commodities: boolean,
        private readonly importCommodityNames: string[],
        private readonly exportCommodityNames: string[],
        private readonly prohibitedCommodityNames: string[],
        private readonly economies: readonly Economy[],
        private readonly shipyardUpdatedAt: Date | null,
        private readonly outfittingUpdatedAt: Date | null,
        private readonly marketUpdatedAt: Date | null,
        private readonly planetary: boolean,
        private readonly sellingShipNames: string[],
        private readonly sellingModuleIds: number[],
        private readonly settlementSize: SettlementSize | null,
        private readonly settlementSecurity: SettlementSecurity | null,
        private readonly bodyId: number | null,
        private readonly controllingMinorFactionId: number | null,
        private readonly edMarketId: number
    ) {
        super(id, name);
    }

    public static fromJSON(json: StationJSON,
            {
                governments = new Governments(),
                allegiances = new Allegiances(),
                states = new States(),
                economies = new Economies(),
                stationTypes = new StationTypes(),
                settlementSizes = new SettlementSizes(),
                settlementSecurities = new SettlementSecurities()
            }: Factories = {}): Station {
        return new Station(
            json.id,
            json.name,
            json.system_id,
            new Date(json.updated_at * 1000),
            json.max_landing_pad_size,
            json.distance_to_star,
            governments.create(json.government_id, json.government),
            allegiances.create(json.allegiance_id, json.allegiance),
            json.states.map(json => states.create(json)),
            stationTypes.create(json.type_id, json.type),
            json.has_blackmarket,
            json.has_market,
            json.has_refuel,
            json.has_repair,
            json.has_rearm,
            json.has_outfitting,
            json.has_shipyard,
            json.has_docking,
            json.has_commodities,
            json.import_commodities,
            json.export_commodities,
            json.prohibited_commodities,
            json.economies.map(name => economies.create(nextEconomyId--, name)),
            json.shipyard_updated_at == null ? null : new Date(json.shipyard_updated_at * 1000),
            json.outfitting_updated_at == null ? null : new Date(json.outfitting_updated_at * 1000),
            json.market_updated_at == null ? null : new Date(json.market_updated_at * 1000),
            json.is_planetary,
            json.selling_ships,
            json.selling_modules,
            settlementSizes.create(json.settlement_size_id, json.settlement_size),
            settlementSecurities.create(json.settlement_security_id, json.settlement_security),
            json.body_id,
            json.controlling_minor_faction_id,
            json.ed_market_id
        );
    }

    public toJSON(): StationJSON {
        return {
            id: this.id,
            name: this.name,
            system_id: this.systemId,
            updated_at: Math.round(this.updatedAt.getTime() / 1000),
            max_landing_pad_size: this.maxLandingPadSize,
            distance_to_star: this.distanceToStar,
            government_id: this.government?.getId() ?? null,
            government: this.government?.getName() ?? null,
            allegiance_id: this.allegiance?.getId() ?? null,
            allegiance: this.allegiance?.getName() ?? null,
            states: this.states.map(state => state.toJSON()),
            type_id: this.type?.getId() ?? null,
            type: this.type?.getName() ?? null,
            has_blackmarket: this.blackmarket,
            has_market: this.market,
            has_refuel: this.refuel,
            has_repair: this.repair,
            has_rearm: this.rearm,
            has_outfitting: this.outfitting,
            has_shipyard: this.shipyard,
            has_docking: this.docking,
            has_commodities: this.commodities,
            import_commodities: this.importCommodityNames.slice(),
            export_commodities: this.exportCommodityNames.slice(),
            prohibited_commodities: this.prohibitedCommodityNames.slice(),
            economies: this.economies.map(economy => economy.getName()),
            shipyard_updated_at: this.shipyardUpdatedAt == null ? null :
                Math.round(this.shipyardUpdatedAt.getTime() / 1000),
            outfitting_updated_at: this.outfittingUpdatedAt == null ? null :
                Math.round(this.outfittingUpdatedAt.getTime() / 1000),
            market_updated_at: this.marketUpdatedAt == null ? null : Math.round(this.marketUpdatedAt.getTime() / 1000),
            is_planetary: this.planetary,
            selling_ships: this.sellingShipNames,
            selling_modules: this.sellingModuleIds,
            settlement_size_id: this.settlementSize?.getId() ?? null,
            settlement_size: this.settlementSize?.getName() ?? null,
            settlement_security_id: this.settlementSecurity?.getId() ?? null,
            settlement_security: this.settlementSecurity?.getName() ?? null,
            body_id: this.bodyId,
            controlling_minor_faction_id: this.controllingMinorFactionId,
            ed_market_id: this.edMarketId
        };
    }

    public getSystemId(): number {
        return this.systemId;
    }

    public getSystem(systems: Systems): System {
        return systems.get(this.systemId);
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getMaxLandingPadSize(): string {
        return this.maxLandingPadSize;
    }

    public getDistanceToStar(): number | null {
        return this.distanceToStar;
    }

    public getGovernment(): Government | null {
        return this.government;
    }

    public getAllegiance(): Allegiance | null {
        return this.allegiance;
    }

    public getStates(): State[] {
        return this.states.slice();
    }

    public getType(): StationType | null {
        return this.type;
    }

    public hasBlackmarket(): boolean {
        return this.blackmarket;
    }

    public hasMarket(): boolean {
        return this.market;
    }

    public hasRefuel(): boolean {
        return this.refuel;
    }

    public hasRepair(): boolean {
        return this.repair;
    }

    public hasRearm(): boolean {
        return this.rearm;
    }

    public hasOutfitting(): boolean {
        return this.outfitting;
    }

    public hasShipyard(): boolean {
        return this.shipyard;
    }

    public hasDocking(): boolean {
        return this.docking;
    }

    public hasCommodities(): boolean {
        return this.commodities;
    }

    public getImportCommodityNames(): string[] {
        return this.importCommodityNames.slice();
    }

    public getImportCommodities(commodities: Commodities): Commodity[] {
        return this.importCommodityNames.map(name => commodities.get(name));
    }

    public getExportCommodityNames(): string[] {
        return this.exportCommodityNames.slice();
    }

    public getExportCommodities(commodities: Commodities): Commodity[] {
        return this.exportCommodityNames.map(name => commodities.get(name));
    }

    public getProhibitedCommodityNames(): string[] {
        return this.prohibitedCommodityNames.slice();
    }

    public getProhibitedCommodities(commodities: Commodities): Commodity[] {
        return this.prohibitedCommodityNames.map(name => commodities.get(name));
    }

    public getEconomies(): Economy[] {
        return this.economies.slice();
    }

    public getShipyardUpdatedAt(): Date | null {
        return this.shipyardUpdatedAt;
    }

    public getOutfittingUpdatedAt(): Date | null {
        return this.outfittingUpdatedAt;
    }
    public getMarketUpdatedAt(): Date | null {
        return this.marketUpdatedAt;
    }

    public isPlanetary(): boolean {
        return this.planetary;
    }

    public getSellingShipNames(): string[] {
        return this.sellingShipNames.slice();
    }

    public getSellingModuleIds(): number[] {
        return this.sellingModuleIds;
    }

    public getSellingModules(modules: Modules): Module[] {
        return this.sellingModuleIds.map(id => modules.get(id));
    }

    public getSettlementSize(): SettlementSize | null {
        return this.settlementSize;
    }

    public getSettlementSecurity(): SettlementSecurity | null {
        return this.settlementSecurity;
    }

    public getBodyId(): number | null {
        return this.bodyId;
    }

    public getControllingMinorFactionId(): number | null {
        return this.controllingMinorFactionId;
    }

    public getControllingMinorFaction(factions: Factions): Faction | null {
        return this.controllingMinorFactionId == null ? null : factions.get(this.controllingMinorFactionId);
    }

    public getEdMarketId(): number {
        return this.edMarketId;
    }
}
