import * as ajv from "ajv";
import * as fs from "fs";
import * as path from "path";
import { createGenerator } from "ts-json-schema-generator/dist/factory/generator";
import { Config, DEFAULT_CONFIG } from "ts-json-schema-generator/dist/src/Config";

const baseDir = path.join(__dirname, "../../..");

function getLastModified(file: string): number {
    try {
        return fs.statSync(file).mtimeMs;
    } catch (e: unknown) {
        if ((e as { code: string }).code === "ENOENT") {
            return 0;
        } else {
            throw e;
        }
    }
}

function getLatestLastModified(files: string[]): number {
    let latestLastModified = 0;
    for (const file of files) {
        latestLastModified = Math.max(latestLastModified, getLastModified(file));
    }
    return latestLastModified;
}

export function testSchema(schemaName: string, typeName: string, sourceFiles: string[], jsonFile: string): void {
    const schemaFile = path.join(baseDir, `lib/test/${schemaName}.schema.json`);

    // Generate the test JSON schema if not already up-to-date
    const schemaLastModified = getLastModified(schemaFile);
    const sourcesLastModified = getLatestLastModified(sourceFiles);
    let schemaJSON: object | null;
    if (sourcesLastModified > schemaLastModified) {
        const config: Config = {
            ...DEFAULT_CONFIG,
            tsconfig: path.join(baseDir, "tsconfig.json"),
            type: typeName
        };
        schemaJSON = createGenerator(config).createSchema(typeName);
        fs.writeFileSync(schemaFile, JSON.stringify(schemaJSON, null, 4));
    } else {
        schemaJSON = JSON.parse(fs.readFileSync(schemaFile).toString()) as object;
    }

    if (schemaJSON == null) {
        throw new Error("Generated schema is null");
    }

    // Create JSON validator
    const validate = new ajv({ allErrors: true }).compile(schemaJSON);

    const json = JSON.parse(fs.readFileSync(jsonFile).toString()) as unknown;
    if (validate(json) === false) {
        const errors = validate.errors;
        if (errors != null) {
            fail(errors);
        }
    }
}
