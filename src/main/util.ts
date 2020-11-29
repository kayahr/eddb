/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * Helper function to parse a CSV stream to a callback function. The CSV lines are read into an object with
 * the CSV column names (read from the header line) as object keys.
 *
 * Please note that this implementation is not a full CSV implementation and is just suitable for the systems,
 * factions and price listings CSV files from EDDB which always quote string columns and never have comma and
 * quote characters in strings.
 *
 * @param input    - The CSV input as an async iterable.
 * @param callback - The callback function to call for each parsed dataset. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next dataset.
 * @return Promise resolved when CSV input has been fully read. Rejected when reading fails.
 */
export async function streamCSV<T>(input: AsyncIterable<string>, callback: (row: T) => Promise<void> | void):
        Promise<void> {
    let keys: string[] | null = null;
    for await (const line of input) {
        if (keys == null) {
            keys = line.split(",");
        } else {
            const row = line.split(",").reduce((dataset, column, index) => {
                const key = (keys as string[])[index];
                let value: unknown;
                if (column === "") {
                    // Handle null type
                    if (key === "simbad_ref") {
                        // simbad_ref must be empty string, not null
                        value = column;
                    } else {
                        value = null;
                    }
                } else if ((column === "0" || column === "1") && ((key.startsWith("is_")
                        || key.startsWith("needs_")))) {
                    // Handle boolean type
                    value = column === "1";
                } else if (column.startsWith("\"")) {
                    // Handle quoted strings
                    value = column.substring(1, column.length - 1);
                } else {
                    const first = column[0];
                    if (first === "-" || (first >= "0" && first <= "9")) {
                        // Handle number
                        value = +column;
                    } else {
                        // Handle strings
                        value = column;
                    }
                }
                dataset[key as keyof T] = value as T[keyof T];
                return dataset;
            }, {} as T);
            const promise = callback(row);
            if (promise != null) {
                await promise;
            }
        }
    }
}

/**
 * Helper function to stream parsed JSONL input to a callback function.
 *
 * @param input    - The JSONL input as an async iterable.
 * @param callback - The callback function to call for each parsed dataset. If callback returns a promise then this
 *                   function waits for the promise to be resolved before continuing with the next dataset.
 * @return Promise resolved when JSONL input has been fully read. Rejected when reading fails.
 */
export async function streamJSONL<T>(input: AsyncIterable<string>, callback: (row: T) => Promise<void> | void):
        Promise<void> {
    for await (const line of input) {
        const promise = callback(JSON.parse(line) as T);
        if (promise != null) {
            await promise;
        }
    }
}
