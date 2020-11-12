/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Commodities } from "../commodities/Commodities";
import { Commodity } from "../commodities/Commodity";
import { Station } from "../stations/Station";
import { Stations } from "../stations/Stations";
import { Entity } from "../util/Entity";

/**
 * Single EDDB price listing as read from the listings.csv file.
 */
export class Price extends Entity {
    private constructor(
        id: number,
        private readonly stationId: number,
        private readonly commodityId: number,
        private readonly supply: number,
        private readonly supplyBracket: number,
        private readonly buyPrice: number,
        private readonly sellPrice: number,
        private readonly demand: number,
        private readonly demandBracket: number,
        private readonly collectedAt: Date
    ) {
        super(id);
    }

    /**
     * Deserializes a price listing from the given CSV row.
     *
     * @return The deserialized price listing.
     */
    public static fromCSV([ id, stationId, commodityId, supply, supplyBracket, buyPrice, sellPrice, demand,
            demandBracket, collectedAt ]: string[]): Price {
        return new Price(
            +id,
            +stationId,
            +commodityId,
            +supply,
            +supplyBracket,
            +buyPrice,
            +sellPrice,
            +demand,
            +demandBracket,
            new Date(+collectedAt * 1000)
        );
    }

    /**
     * Returns the price listing id.
     *
     * @return The price listing id.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Returns the station ID.
     *
     * @return The station ID.
     */
    public getStationId(): number {
        return this.stationId;
    }

    /**
     * Returns the station.
     *
     * @param stations - The stations to use for looking up the station ID.
     * @return The station.
     * @throws NotFoundException - When station was not found.
     */
    public getStation(stations: Stations): Station {
        return stations.get(this.stationId);
    }

    /**
     * Returns the commodity ID.
     *
     * @return The commodity ID.
     */
    public getCommodityId(): number {
        return this.commodityId;
    }

    /**
     * Returns the commodity.
     *
     * @param commodities - The commodities to use for looking up the commodity ID.
     * @return The commodity.
     * @throws NotFoundException - When commodity was not found.
     */
    public getCommodity(commodities: Commodities): Commodity {
        return commodities.get(this.commodityId);
    }

    /**
     * Returns the supply.
     *
     * @return The supply.
     */
    public getSupply(): number {
        return this.supply;
    }

    public getSupplyBracket(): number {
        return this.supplyBracket;
    }

    /**
     * Returns the buy price.
     *
     * @return The buy price.
     */
    public getBuyPrice(): number {
        return this.buyPrice;
    }

    /**
     * Returns the sell price.
     *
     * @return The sell price.
     */
    public getSellPrice(): number {
        return this.sellPrice;
    }

    /**
     * Returns the demand.
     *
     * @return The demand.
     */
    public getDemand(): number {
        return this.demand;
    }

    public getDemandBracket(): number {
        return this.demandBracket;
    }

    /**
     * Returns the time when this price listing was collected.
     *
     * @return The time when this price listing was collected.
     */
    public getCollectedAt(): Date {
        return this.collectedAt;
    }
}
