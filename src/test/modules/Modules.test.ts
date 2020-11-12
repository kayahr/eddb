import "jest-extended";

import { NotFoundException } from "@kayahr/kaylib/lib/main/util/exception";
import * as fs from "fs";
import * as path from "path";

import { ModuleCategories } from "../../main/modules/ModuleCategories";
import { ModuleGroups } from "../../main/modules/ModuleGroups";
import { Modules, ModulesJSON } from "../../main/modules/Modules";
import { testSchema } from "../support/testSchema";

const baseDir = path.join(__dirname, "../../..");
const sourceFiles = [
    path.join(baseDir, "src/main/modules/Modules.ts"),
    path.join(baseDir, "src/main/modules/Module.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/modules.json");
const modulesJSON = JSON.parse(fs.readFileSync(jsonFile).toString()) as ModulesJSON;
const moduleCategories = new ModuleCategories();
const moduleGroups = new ModuleGroups();
const modules = Modules.fromJSON(modulesJSON, { moduleCategories, moduleGroups });

describe("ModulesJSON", () => {
    it("matches actual JSON", () => {
        testSchema("modules", "ModulesJSON", sourceFiles, jsonFile);
    });
});

describe("Modules", () => {
    describe("toJSON", () => {
        it("writes exact JSON as the one the modules were read from", () => {
            expect(modules.toJSON()).toEqual(modulesJSON);
        });
    });


    describe("getAll", () => {
        it("returns all modules", () => {
            expect(modules.getAll().length).toBeGreaterThan(0);
        });
    });

    describe("has", () => {
        it("returns true when module exists", () => {
            expect(modules.has(1490)).toBe(true);
        });
        it("returns false when module does not exists", () => {
            expect(modules.has(123456)).toBe(false);
        });
    });

    describe("get", () => {
        it("returns single module by id", () => {
            expect(modules.get(1490).getEdSymbol()).toBe("Int_ShieldGenerator_Size6_Class5_Strong");
        });
        it("throws exception when module not found by id", () => {
            expect(() => modules.get(123456)).toThrowWithMessage(NotFoundException, "123456 not found in Modules");
        });
    });
});
