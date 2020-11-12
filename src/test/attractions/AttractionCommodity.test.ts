import { AttractionCommodity } from "../../main/attractions/AttractionCommodity";

describe("AttractionCommodity", () => {
    describe("getters", () => {
        it("returns correct values", () => {
            const attractionCommodity = AttractionCommodity.fromJSON({
                commodity_id: 1,
                commodity_name: "Test",
                frequency: 3
            });
            expect(attractionCommodity.getCommodity().getId()).toBe(1);
            expect(attractionCommodity.getCommodity().getName()).toBe("Test");
            expect(attractionCommodity.getFrequency()).toBe(3);
        });
    });
});
