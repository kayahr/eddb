EDDB
====

This library provides typescript types and utility functions for the Elite Dangerous Database ([EDDB]) API v6.0. It is primarily intended for Node.js and Electron applications to read EDDB data files but it also works in a web browser.

Usage
-----

First install the library as a dependency in your project:

```
npm install @kayahr/eddb
```

Then download the data dumps from EDDB and use this library to read them.

Working with JSON files
-----------------------

JSON files (like `commodities.json` and `modules.json`) do not need any helper functions. Simply parse the JSON files and then cast it to the corresponding type provided by this library:

```typescript
import * as fs from "fs";
import * as eddb from "@kayahr/eddb";

const json = fs.readFileSync("commodities.json").toString();
const commodities = JSON.parse(json) as eddb.Commodities;
```

Working with CSV files
----------------------

For CSV files (like `listings.csv`, `factions.csv`, `systems.csv` and `systems_recently.csv`) this library provides utility functions to read or stream them. As input you have to provide an async iterable for reading the lines. In Node.js/Electron it works like this:

```typescript
import * as fs from "fs";
import * as readline from "readline";
import * as eddb from "@kayahr/eddb";

const stream = fs.createReadStream("data/factions.csv");
const reader = readline.createInterface({ input: stream });
await eddb.streamFactionsCSV(reader, faction => {
    console.log(faction);
});
```

The `streamFactionsCSV` function calls the specified callback for each faction read from the given CSV file. It returns a promise which is resolved after the last faction has been read.

Note that the callback can be asynchronous as well. If it returns a promise then CSV parsing is paused until this promise is resolved.

There are also `streamPriceListingsCSV` and `streamSystemsCSV` functions to stream price listings and systems.

If you don't want to stream the data and instead you want to read all data as an array, then use `readFactionsCSV`, `readPriceListingsCSV` and `readSystemsCSV` which simply asynchronously returns an array with the corresponding data.

Working with JSONL files
------------------------

Streaming and reading JSONL files (like `factions.jsonl`, `attractions.jsonl`, `stations.jsonl` and `systems_populated.jsonl`) works exactly like streaming/reading CSV files. For this use the utility functions `streamFactionsJSONL`, `streamAttractionsJSONL`, `streamStationsJSONL`, `streamSystemsJSONL`, `readFactionsJSONL`, `readAttractionsJSONL`, `readStationsJSONL` and `readSystemsJSONL`).

Other utility functions
-----------------------

### getModuleDisplayName(module)

This function returns a unique display name for the given module. The resulting string may look like this:

* 2A Prismatic Shield Generator
* 2B Seismic Charge Launcher (Seeker, Turret)
* 2C Plasma Accelerator (Fixed)
* 3A AX Missile Rack (Dumbfire, Fixed)
* 1I Military Grade Composite (Imperial Clipper)

Known issues
------------

This library currently does not support bodies because EDDB doesn't export body data any longer.

[EDDB]: https://eddb.io/api
