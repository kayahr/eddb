import * as fs from "fs";
import * as readline from "readline";

import * as eddb from "../main";

void (async () => {
    // Define the entity factories which gathers all the entities referenced in the EDDB files so they can be
    // iterated separately
    const factories = eddb.createFactories();

    // Read modules
    const modulesJSON = JSON.parse(fs.readFileSync("data/modules.json").toString()) as eddb.ModulesJSON;
    const modules = eddb.Modules.fromJSON(modulesJSON, factories);
    console.log("Number of modules:", modules.getAll().length);

    // Read commodities
    const commoditiesJSON = JSON.parse(fs.readFileSync("data/commodities.json").toString()) as eddb.CommoditiesJSON;
    const commodities = eddb.Commodities.fromJSON(commoditiesJSON, factories);
    console.log("Number of commodities:", commodities.getAll().length);

    // Read systems
    const systemsJSONL = readline.createInterface({ input: fs.createReadStream("data/systems_populated.jsonl") });
    const systems = await eddb.Systems.fromJSONL(systemsJSONL, factories);
    console.log("Number of systems:", systems.getAll().length);

    // Read factions
    const factionsCSV = fs.createReadStream("data/factions.csv");
    const factions = await eddb.Factions.fromCSV(factionsCSV, factories);
    console.log("Number of factions:", factions.getAll().length);

    // Read attractions
    const attractionsJSONL = readline.createInterface({ input: fs.createReadStream("data/attractions.jsonl") });
    const attractions = await eddb.Attractions.fromJSONL(attractionsJSONL, factories);
    console.log("Number of attractions:", attractions.getAll().length);

    // Read stations
    const stationsJSONL = readline.createInterface({ input: fs.createReadStream("data/stations.jsonl") });
    const stations = await eddb.Stations.fromJSONL(stationsJSONL, factories);
    console.log("Number of stations:", stations.getAll().length);

    // Read price listings
    const pricesCSV = fs.createReadStream("data/listings.csv");
    const prices = await eddb.Prices.fromCSV(pricesCSV);
    console.log("Number of price listings:", prices.getAll().length);

    // Show numbers of entities read on-the-fly while parsing the other files
    console.log("Number of allegiances:", factories.allegiances.getAll().length);
    console.log("Number of attraction bodies:", factories.attractionBodies.getAll().length);
    console.log("Number of attraction groups:", factories.attractionGroups.getAll().length);
    console.log("Number of attraction layouts:", factories.attractionLayouts.getAll().length);
    console.log("Number of beacon types", factories.beaconTypes.getAll().length);
    console.log("Number of commodity categories", factories.commodityCategories.getAll().length);
    console.log("Number of economies", factories.economies.getAll().length);
    console.log("Number of governments", factories.governments.getAll().length);
    console.log("Number of installation types", factories.installationTypes.getAll().length);
    console.log("Number of module categories", factories.moduleCategories.getAll().length);
    console.log("Number of module groups", factories.moduleGroups.getAll().length);
    console.log("Number of power states", factories.powerStates.getAll().length);
    console.log("Number of races", factories.races.getAll().length);
    console.log("Number of reserve types", factories.reserveTypes.getAll().length);
    console.log("Number of securities", factories.securities.getAll().length);
    console.log("Number of settlement securities", factories.settlementSecurities.getAll().length);
    console.log("Number of settlement sizes", factories.settlementSizes.getAll().length);
    console.log("Number of settlement types", factories.settlementTypes.getAll().length);
    console.log("Number of shipwreck types", factories.shipwreckTypes.getAll().length);
    console.log("Number of simple commodities", factories.simpleCommodities.getAll().length);
    console.log("Number of simple materials", factories.simpleMaterials.getAll().length);
    console.log("Number of states", factories.states.getAll().length);
    console.log("Number of station types", factories.stationTypes.getAll().length);
    console.log("Number of threat levels", factories.threatLevels.getAll().length);

    console.log("Finished");
})().catch(e => console.error(e));
