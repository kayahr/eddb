/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { StationTypes } from "..";
import { AttractionBodies } from "../attractions/AttractionBodies";
import { AttractionGroups } from "../attractions/AttractionGroups";
import { AttractionLayouts } from "../attractions/AttractionLayouts";
import { BeaconTypes } from "../attractions/BeaconTypes";
import { InstallationTypes } from "../attractions/InstallationTypes";
import { Races } from "../attractions/Races";
import { SettlementTypes } from "../attractions/SettlementTypes";
import { ShipwreckTypes } from "../attractions/ShipwreckTypes";
import { SimpleCommodities } from "../attractions/SimpleCommodities";
import { SimpleMaterials } from "../attractions/SimpleMaterials";
import { ThreatLevels } from "../attractions/ThreatLevels";
import { CommodityCategories } from "../commodities/CommodityCategories";
import { Allegiances } from "../common/Allegiances";
import { Economies } from "../common/Economies";
import { Governments } from "../common/Governments";
import { States } from "../common/States";
import { ModuleCategories } from "../modules/ModuleCategories";
import { ModuleGroups } from "../modules/ModuleGroups";
import { SettlementSecurities } from "../stations/SettlementSecurities";
import { SettlementSizes } from "../stations/SettlementSizes";
import { PowerStates } from "../systems/PowerStates";
import { ReserveTypes } from "../systems/ReserveTypes";
import { Securities } from "../systems/Securities";

export interface Factories {
    allegiances?: Allegiances;
    attractionBodies?: AttractionBodies;
    attractionGroups?: AttractionGroups;
    attractionLayouts?: AttractionLayouts;
    beaconTypes?: BeaconTypes;
    commodityCategories?: CommodityCategories;
    economies?: Economies;
    governments?: Governments;
    installationTypes?: InstallationTypes;
    moduleCategories?: ModuleCategories;
    moduleGroups?: ModuleGroups;
    powerStates?: PowerStates;
    races?: Races;
    reserveTypes?: ReserveTypes;
    securities?: Securities;
    settlementSecurities?: SettlementSecurities;
    settlementSizes?: SettlementSizes;
    settlementTypes?: SettlementTypes;
    shipwreckTypes?: ShipwreckTypes;
    simpleCommodities?: SimpleCommodities;
    simpleMaterials?: SimpleMaterials;
    states?: States;
    stationTypes?: StationTypes;
    threatLevels?: ThreatLevels;
}

export function createFactories(): Required<Factories> {
    return {
        allegiances: new Allegiances(),
        attractionBodies: new AttractionBodies(),
        attractionGroups: new  AttractionGroups(),
        attractionLayouts: new AttractionLayouts(),
        beaconTypes: new BeaconTypes(),
        commodityCategories: new CommodityCategories(),
        economies: new Economies(),
        governments: new Governments(),
        installationTypes: new InstallationTypes(),
        moduleCategories: new ModuleCategories(),
        moduleGroups: new ModuleGroups(),
        powerStates: new PowerStates(),
        races: new  Races(),
        reserveTypes: new ReserveTypes(),
        securities: new Securities(),
        settlementSecurities: new SettlementSecurities(),
        settlementSizes: new SettlementSizes(),
        settlementTypes: new SettlementTypes(),
        shipwreckTypes: new ShipwreckTypes(),
        simpleCommodities: new SimpleCommodities(),
        simpleMaterials: new SimpleMaterials(),
        states: new States(),
        stationTypes: new StationTypes(),
        threatLevels: new ThreatLevels()
    };
}
