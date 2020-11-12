import { Commodity, CommodityJSON } from "../../main/commodities/Commodity";

const commodityJSON1: CommodityJSON = {
    id: 1,
    name: "foo",
    category_id: 11,
    average_price: 3,
    is_rare: 1,
    max_buy_price: 4,
    max_sell_price: 5,
    min_buy_price: 6,
    min_sell_price: 7,
    buy_price_lower_average: 8,
    sell_price_upper_average: 9,
    is_non_marketable: 0,
    ed_id: 10,
    category: {
        id: 11,
        name: "bar"
    }
};
const commodity1 = Commodity.fromJSON(commodityJSON1);

const commodityJSON2: CommodityJSON = {
    id: 2,
    name: "name",
    category_id: 12,
    average_price: null,
    is_rare: 0,
    max_buy_price: null,
    max_sell_price: null,
    min_buy_price: null,
    min_sell_price: null,
    buy_price_lower_average: 9,
    sell_price_upper_average: 10,
    is_non_marketable: 1,
    ed_id: 11,
    category: {
        id: 12,
        name: "category"
    }
};
const commodity2 = Commodity.fromJSON(commodityJSON2);

describe("Commodity", () => {
    describe("toJSON", () => {
        it("re-produces exact input JSON", () => {
            expect(commodity1.toJSON()).toEqual(commodityJSON1);
            expect(commodity2.toJSON()).toEqual(commodityJSON2);
        });
    });

    describe("getters", () => {
        it("return the correct values", () => {
            expect(commodity1.getId()).toBe(1);
            expect(commodity1.getName()).toBe("foo");
            expect(commodity1.getAveragePrice()).toBe(3);
            expect(commodity1.isRare()).toBe(true);
            expect(commodity1.getMaxBuyPrice()).toBe(4);
            expect(commodity1.getMaxSellPrice()).toBe(5);
            expect(commodity1.getMinBuyPrice()).toBe(6);
            expect(commodity1.getMinSellPrice()).toBe(7);
            expect(commodity1.getBuyPriceLowerAverage()).toBe(8);
            expect(commodity1.getSellPriceUpperAverage()).toBe(9);
            expect(commodity1.isNonMarketable()).toBe(false);
            expect(commodity1.getEdId()).toBe(10);
            expect(commodity1.getCategory().getId()).toBe(11);
            expect(commodity1.getCategory().getName()).toBe("bar");

            expect(commodity2.getId()).toBe(2);
            expect(commodity2.getName()).toBe("name");
            expect(commodity2.getAveragePrice()).toBeNull();
            expect(commodity2.isRare()).toBe(false);
            expect(commodity2.getMaxBuyPrice()).toBeNull();
            expect(commodity2.getMaxSellPrice()).toBeNull();
            expect(commodity2.getMinBuyPrice()).toBeNull();
            expect(commodity2.getMinSellPrice()).toBeNull();
            expect(commodity2.getBuyPriceLowerAverage()).toBe(9);
            expect(commodity2.getSellPriceUpperAverage()).toBe(10);
            expect(commodity2.isNonMarketable()).toBe(true);
            expect(commodity2.getEdId()).toBe(11);
            expect(commodity2.getCategory().getId()).toBe(12);
            expect(commodity2.getCategory().getName()).toBe("category");
        });
    });
});
