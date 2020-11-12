import { AttractionLayout, AttractionLayoutJSON } from "../../main/attractions/AttractionLayout";

const attractionLayoutJSON1: AttractionLayoutJSON = {
    "updated_at": 2,
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
};
const attractionLayout1 = AttractionLayout.fromJSON(attractionLayoutJSON1, 1);

const attractionLayoutJSON2: AttractionLayoutJSON = {
    "updated_at": 3,
    "is_unique": true,
    "is_unknown": true,
    "threat_level_id": 4,
    "threat_level_name": "5",
    "has_cdt": true,
    "requires_srv_jumping": true,
    "description": "6",
    "race_id": 7,
    "race_name": "8",
    "settlement_size_id": 9,
    "settlement_size_name": "10",
    "settlement_security_id": 11,
    "settlement_security_name": "12",
    "settlement_type_id": 13,
    "settlement_type_name": "14",
    "installation_type_id": 15,
    "installation_type_name": "16",
    "beacon_type_id": 17,
    "beacon_type_name": "18",
    "tourist_beacon_index": 19,
    "shipwreck_type_id": 20,
    "shipwreck_type_name": "21",
    "materials": [
        { "material_id": 22, "material_name": "23", frequency: null },
        { "material_id": 24, "material_name": "25", frequency: 26 }
    ],
    "commodities": [
        { "commodity_id": 27, "commodity_name": "28", "frequency": 29 },
        { "commodity_id": 30, "commodity_name": "31", "frequency": null }
    ]
};
const attractionLayout2 = AttractionLayout.fromJSON(attractionLayoutJSON2, 2);

describe("AttractionLayout", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(attractionLayout1.toJSON()).toEqual(attractionLayoutJSON1);
            expect(attractionLayout2.toJSON()).toEqual(attractionLayoutJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(attractionLayout1.getId()).toBe(1);
            expect(attractionLayout1.getUpdatedAt().getTime()).toEqual(2000);
            expect(attractionLayout1.isUnique()).toBe(false);
            expect(attractionLayout1.isUnknown()).toBe(false);
            expect(attractionLayout1.getThreatLevel()).toBeNull();
            expect(attractionLayout1.isHasCdt()).toBeNull();
            expect(attractionLayout1.isRequiresSrvJumping()).toBeNull();
            expect(attractionLayout1.getDescription()).toBeNull();
            expect(attractionLayout1.getRace()).toBeNull();
            expect(attractionLayout1.getSettlementSize()).toBeNull();
            expect(attractionLayout1.getSettlementSecurity()).toBeNull();
            expect(attractionLayout1.getSettlementType()).toBeNull();
            expect(attractionLayout1.getInstallationType()).toBeNull();
            expect(attractionLayout1.getBeaconType()).toBeNull();
            expect(attractionLayout1.getTouristBeaconIndex()).toBeNull();
            expect(attractionLayout1.getShipwreckType()).toBeNull();
            expect(attractionLayout1.getMaterials()).toEqual([]);
            expect(attractionLayout1.getCommodities()).toEqual([]);

            expect(attractionLayout2.getId()).toBe(2);
            expect(attractionLayout2.getUpdatedAt().getTime()).toEqual(3000);
            expect(attractionLayout2.isUnique()).toBe(true);
            expect(attractionLayout2.isUnknown()).toBe(true);
            expect(attractionLayout2.getThreatLevel()?.getId()).toBe(4);
            expect(attractionLayout2.getThreatLevel()?.getName()).toBe("5");
            expect(attractionLayout2.isHasCdt()).toBe(true);
            expect(attractionLayout2.isRequiresSrvJumping()).toBe(true);
            expect(attractionLayout2.getDescription()).toBe("6");
            expect(attractionLayout2.getRace()?.getId()).toBe(7);
            expect(attractionLayout2.getRace()?.getName()).toBe("8");
            expect(attractionLayout2.getSettlementSize()?.getId()).toBe(9);
            expect(attractionLayout2.getSettlementSize()?.getName()).toBe("10");
            expect(attractionLayout2.getSettlementSecurity()?.getId()).toBe(11);
            expect(attractionLayout2.getSettlementSecurity()?.getName()).toBe("12");
            expect(attractionLayout2.getSettlementType()?.getId()).toBe(13);
            expect(attractionLayout2.getSettlementType()?.getName()).toBe("14");
            expect(attractionLayout2.getInstallationType()?.getId()).toBe(15);
            expect(attractionLayout2.getInstallationType()?.getName()).toBe("16");
            expect(attractionLayout2.getBeaconType()?.getId()).toBe(17);
            expect(attractionLayout2.getBeaconType()?.getName()).toBe("18");
            expect(attractionLayout2.getTouristBeaconIndex()).toBe(19);
            expect(attractionLayout2.getShipwreckType()?.getId()).toBe(20);
            expect(attractionLayout2.getShipwreckType()?.getName()).toBe("21");
            expect(attractionLayout2.getMaterials().length).toBe(2);
            expect(attractionLayout2.getMaterials()[0].getMaterial().getId()).toBe(22);
            expect(attractionLayout2.getMaterials()[0].getMaterial().getName()).toBe("23");
            expect(attractionLayout2.getMaterials()[0].getFrequency()).toBeNull();
            expect(attractionLayout2.getMaterials()[1].getMaterial().getId()).toBe(24);
            expect(attractionLayout2.getMaterials()[1].getMaterial().getName()).toBe("25");
            expect(attractionLayout2.getMaterials()[1].getFrequency()).toBe(26);
            expect(attractionLayout2.getCommodities().length).toBe(2);
            expect(attractionLayout2.getCommodities()[0].getCommodity().getId()).toBe(27);
            expect(attractionLayout2.getCommodities()[0].getCommodity().getName()).toBe("28");
            expect(attractionLayout2.getCommodities()[0].getFrequency()).toBe(29);
            expect(attractionLayout2.getCommodities()[1].getCommodity().getId()).toBe(30);
            expect(attractionLayout2.getCommodities()[1].getCommodity().getName()).toBe("31");
            expect(attractionLayout2.getCommodities()[1].getFrequency()).toBeNull();
        });
    });
});
