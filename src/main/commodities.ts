/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/** A EDDB commodity category */
export interface CommodityCategory {
    id: number;
    name: string;
}

/** A single EDDB commodity. */
export interface Commodity {
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
    category: CommodityCategory;
}

/** List of EDDB commodities. */
export type Commodities = Commodity[];
