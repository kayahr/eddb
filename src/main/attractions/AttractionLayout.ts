/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { SettlementSecurities } from "../stations/SettlementSecurities";
import { SettlementSecurity } from "../stations/SettlementSecurity";
import { SettlementSize } from "../stations/SettlementSize";
import { SettlementSizes } from "../stations/SettlementSizes";
import { Entity } from "../util/Entity";
import { Factories } from "../util/Factories";
import { AttractionCommodity, AttractionCommodityJSON } from "./AttractionCommodity";
import { AttractionMaterial, AttractionMaterialJSON } from "./AttractionMaterial";
import { BeaconType } from "./BeaconType";
import { BeaconTypes } from "./BeaconTypes";
import { InstallationType } from "./InstallationType";
import { InstallationTypes } from "./InstallationTypes";
import { Race } from "./Race";
import { Races } from "./Races";
import { SettlementType } from "./SettlementType";
import { SettlementTypes } from "./SettlementTypes";
import { ShipwreckType } from "./ShipwreckType";
import { ShipwreckTypes } from "./ShipwreckTypes";
import { ThreatLevel } from "./ThreatLevel";
import { ThreatLevels } from "./ThreatLevels";

/** JSON structure of an EDDB attraction layout. */
export interface AttractionLayoutJSON {
    updated_at: number;
    is_unique: boolean;
    is_unknown: boolean;
    threat_level_id: number | null;
    threat_level_name: string | null;
    has_cdt: boolean | null;
    requires_srv_jumping: boolean | null,
    description: string | null;
    race_id: number | null;
    race_name: string | null;
    settlement_size_id: number | null;
    settlement_size_name: string | null;
    settlement_security_id: number | null;
    settlement_security_name: string | null;
    settlement_type_id: number | null;
    settlement_type_name: string | null;
    installation_type_id: number | null;
    installation_type_name: string | null;
    beacon_type_id: number | null;
    beacon_type_name: string | null;
    tourist_beacon_index: number | null;
    shipwreck_type_id: number | null;
    shipwreck_type_name: string | null;
    materials: AttractionMaterialJSON[];
    commodities: AttractionCommodityJSON[];
}

/**
 * An EDDB attraction layout
 */
export class AttractionLayout extends Entity {
    private constructor(
        id: number,
        private readonly updatedAt: Date,
        private readonly unique: boolean,
        private readonly unknown: boolean,
        private readonly threatLevel: ThreatLevel | null,
        private readonly hasCdt: boolean | null,
        private readonly requiresSrvJumping: boolean | null,
        private readonly description: string | null,
        private readonly race: Race | null,
        private readonly settlementSize: SettlementSize | null,
        private readonly settlementSecurity: SettlementSecurity | null,
        private readonly settlementType: SettlementType | null,
        private readonly installationType: InstallationType | null,
        private readonly beaconType: BeaconType | null,
        private readonly touristBeaconIndex: number | null,
        private readonly shipwreckType: ShipwreckType | null,
        private readonly materials: AttractionMaterial[],
        private readonly commodities: AttractionCommodity[]
    ) {
        super(id);
    }

    public static fromJSON(json: AttractionLayoutJSON, id: number,
            {
                threatLevels = new ThreatLevels(),
                races = new Races(),
                settlementSizes = new SettlementSizes(),
                settlementSecurities = new SettlementSecurities(),
                settlementTypes = new SettlementTypes(),
                installationTypes = new InstallationTypes(),
                beaconTypes = new BeaconTypes(),
                shipwreckTypes = new ShipwreckTypes(),
                ...factories
            }: Factories = {}): AttractionLayout {
        return new AttractionLayout(
            id,
            new Date(json.updated_at * 1000),
            json.is_unique,
            json.is_unknown,
            threatLevels.create(json.threat_level_id, json.threat_level_name),
            json.has_cdt,
            json.requires_srv_jumping,
            json.description,
            races.create(json.race_id, json.race_name),
            settlementSizes.create(json.settlement_size_id, json.settlement_size_name),
            settlementSecurities.create(json.settlement_security_id, json.settlement_security_name),
            settlementTypes.create(json.settlement_type_id, json.settlement_type_name),
            installationTypes.create(json.installation_type_id, json.installation_type_name),
            beaconTypes.create(json.beacon_type_id, json.beacon_type_name),
            json.tourist_beacon_index,
            shipwreckTypes.create(json.shipwreck_type_id, json.shipwreck_type_name),
            json.materials.map(json => AttractionMaterial.fromJSON(json, factories)),
            json.commodities.map(json => AttractionCommodity.fromJSON(json, factories))
        );
    }

    /** @inheritDoc */
    public toJSON(): AttractionLayoutJSON {
        return {
            updated_at: Math.round(this.updatedAt.getTime() / 1000),
            is_unique: this.unique,
            is_unknown: this.unknown,
            threat_level_id: this.threatLevel?.getId() ?? null,
            threat_level_name: this.threatLevel?.getName() ?? null,
            has_cdt: this.hasCdt,
            requires_srv_jumping: this.requiresSrvJumping,
            description: this.description,
            race_id: this.race?.getId() ?? null,
            race_name: this.race?.getName() ?? null,
            settlement_size_id: this.settlementSize?.getId() ?? null,
            settlement_size_name: this.settlementSize?.getName() ?? null,
            settlement_security_id: this.settlementSecurity?.getId() ?? null,
            settlement_security_name: this.settlementSecurity?.getName() ?? null,
            settlement_type_id: this.settlementType?.getId() ?? null,
            settlement_type_name: this.settlementType?.getName() ?? null,
            installation_type_id: this.installationType?.getId() ?? null,
            installation_type_name: this.installationType?.getName() ?? null,
            beacon_type_id: this.beaconType?.getId() ?? null,
            beacon_type_name: this.beaconType?.getName() ?? null,
            tourist_beacon_index: this.touristBeaconIndex,
            shipwreck_type_id: this.shipwreckType?.getId() ?? null,
            shipwreck_type_name: this.shipwreckType?.getName() ?? null,
            materials: this.materials.map(material => material.toJSON()),
            commodities: this.commodities.map(commodity => commodity.toJSON())
        };
    }

    public getId(): number {
        return this.id;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public isUnique(): boolean {
        return this.unique;
    }

    public isUnknown(): boolean {
        return this.unknown;
    }

    public getThreatLevel(): ThreatLevel | null {
        return this.threatLevel;
    }

    public isHasCdt(): boolean | null {
        return this.hasCdt;
    }

    public isRequiresSrvJumping(): boolean | null {
        return this.requiresSrvJumping;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public getRace(): Race | null {
        return this.race;
    }

    public getSettlementSize(): SettlementSize | null {
        return this.settlementSize;
    }

    public getSettlementSecurity(): SettlementSecurity | null {
        return this.settlementSecurity;
    }

    public getSettlementType(): SettlementType | null {
        return this.settlementType;
    }

    public getInstallationType(): InstallationType | null {
        return this.installationType;
    }

    public getBeaconType(): BeaconType | null {
        return this.beaconType;
    }

    public getTouristBeaconIndex(): number | null {
        return this.touristBeaconIndex;
    }

    public getShipwreckType(): ShipwreckType | null {
        return this.shipwreckType;
    }

    public getMaterials(): AttractionMaterial[] {
        return this.materials.slice();
    }

    public getCommodities(): AttractionCommodity[] {
        return this.commodities.slice();
    }
}
