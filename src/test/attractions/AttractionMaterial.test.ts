import { AttractionMaterial } from "../../main/attractions/AttractionMaterial";

describe("AttractionMaterial", () => {
    describe("getters", () => {
        it("returns correct values", () => {
            const attractionMaterial = AttractionMaterial.fromJSON({
                material_id: 1,
                material_name: "Test",
                frequency: 3
            });
            expect(attractionMaterial.getMaterial().getId()).toBe(1);
            expect(attractionMaterial.getMaterial().getName()).toBe("Test");
            expect(attractionMaterial.getFrequency()).toBe(3);
        });
    });
});
