/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Factories } from "../util/Factories";
import { NamedEntity } from "../util/NamedEntity";
import { CommodityCategories } from "./CommodityCategories";
import { CommodityCategory } from "./CommodityCategory";

/** JSON structure of an EDDB commodity. */
export interface CommodityJSON {
    id: number;
    name: string;
    category_id: number | null;
    average_price: number | null;
    is_rare: number;
    max_buy_price: number | null;
    max_sell_price: number | null;
    min_buy_price: number | null;
    min_sell_price: number | null;
    buy_price_lower_average: number;
    sell_price_upper_average: number;
    is_non_marketable: number;
    ed_id: number;
    category: {
        id: number;
        name: string;
    }
}

/**
 * An EDDB commodity. An instance of it can be retrieved from a [[Commodities]] collection.
 */
export class Commodity extends NamedEntity implements Serializable<CommodityJSON> {
    private constructor(
        id: number,
        name: string,
        private readonly averagePrice: number | null,
        private readonly rare: boolean,
        private readonly maxBuyPrice: number | null,
        private readonly maxSellPrice: number | null,
        private readonly minBuyPrice: number | null,
        private readonly minSellPrice: number | null,
        private readonly buyPriceLowerAverage: number,
        private readonly sellPriceUpperAverage: number,
        private readonly nonMarketable: boolean,
        private readonly edId: number,
        private readonly category: CommodityCategory
    ) {
        super(id, name);
    }

    /**
     * Deserializes a commodity from the given JSON object.
     *
     * @param json                - The serialized commodity.
     * @param commodityCategories - Optional commodity categories to fill and reference.
     * @return The deserialized commodity.
     */
    public static fromJSON(json: CommodityJSON,
            {
                commodityCategories = new CommodityCategories()
            }: Factories = {}): Commodity {
        return new Commodity(
            json.id,
            json.name,
            json.average_price,
            json.is_rare !== 0,
            json.max_buy_price,
            json.max_sell_price,
            json.min_buy_price,
            json.min_sell_price,
            json.buy_price_lower_average,
            json.sell_price_upper_average,
            json.is_non_marketable !== 0,
            json.ed_id,
            commodityCategories.create(json.category)
        );
    }

    /** @inheritDoc */
    public toJSON(): CommodityJSON {
        return {
            id: this.id,
            name: this.name,
            category_id: this.category.getId(),
            average_price: this.averagePrice,
            is_rare: this.rare ? 1 : 0,
            max_buy_price: this.maxBuyPrice,
            max_sell_price: this.maxSellPrice,
            min_buy_price: this.minBuyPrice,
            min_sell_price: this.minSellPrice,
            buy_price_lower_average: this.buyPriceLowerAverage,
            sell_price_upper_average: this.sellPriceUpperAverage,
            is_non_marketable: this.nonMarketable ? 1 : 0,
            ed_id: this.edId,
            category: this.category.toJSON()
        };
    }

    /**
     * Returns the average price.
     *
     * @return The average price. Null if unknown.
     */
    public getAveragePrice(): number | null {
        return this.averagePrice;
    }

    /**
     * Checks if commodity is a rare commodity.
     *
     * @return True if rare commodity, false if not.
     */
    public isRare(): boolean {
        return this.rare;
    }

    /**
     * Returns the maximum buy price.
     *
     * @return The maximum buy price. Null if unknown.
     */
    public getMaxBuyPrice(): number | null {
        return this.maxBuyPrice;
    }

    /**
     * Returns the maximum sell price.
     *
     * @return The maximum sell price. Null if unknown.
     */
    public getMaxSellPrice(): number | null {
        return this.maxSellPrice;
    }

    /**
     * Returns the minimum buy price.
     *
     * @return The minimum buy price. Null if unknown.
     */
    public getMinBuyPrice(): number | null {
        return this.minBuyPrice;
    }

    /**
     * Returns the minimum sell price.
     *
     * @return The minimum sell price. Null if unknown.
     */
    public getMinSellPrice(): number | null {
        return this.minSellPrice;
    }

    /**
     * Returns the lower average buy price.
     *
     * @return The lower average buy price. Null if unknown.
     */
    public getBuyPriceLowerAverage(): number | null {
        return this.buyPriceLowerAverage;
    }

    /**
     * Returns the upper average sell price.
     *
     * @return The upper average sell price. Null if unknown.
     */
    public getSellPriceUpperAverage(): number | null {
        return this.sellPriceUpperAverage;
    }

    /**
     * Checks if commodity is non-marketable.
     *
     * @return True if non-marketable, false if not.
     */
    public isNonMarketable(): boolean {
        return this.nonMarketable;
    }

    /**
     * Returns the in-game ID of the commodity.
     *
     * @return The in-game ID.
     */
    public getEdId(): number {
        return this.edId;
    }

    /**
     * Returns the commodity category.
     *
     * @return The commodity category.
     */
    public getCategory(): CommodityCategory {
        return this.category;
    }
}
