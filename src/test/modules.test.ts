import "jest-extended";

import * as fs from "fs";
import * as path from "path";

import { getModuleDisplayName, Modules } from "../main/modules";
import { createValidator, testJSONFile } from "./util";

const baseDir = path.join(__dirname, "../..");
const sourceFiles = [
    path.join(baseDir, "src/main/modules.ts")
];
const jsonFile = path.join(baseDir, "src/test/data/modules.json");
const modules = JSON.parse(fs.readFileSync(jsonFile).toString()) as Modules;

describe("Modules", () => {
    it("matches actual JSON", () => {
        testJSONFile(createValidator("modules", "Modules", sourceFiles), jsonFile);
    });
});

describe("getModuleDisplayName", () => {
    it("returns null if passing null", () => {
        expect(getModuleDisplayName(null)).toBeNull();
    });
    it("returns null if passing undefined", () => {
        expect(getModuleDisplayName(undefined)).toBeNull();
    });
    it("returns display name for a standard module", () => {
        expect(getModuleDisplayName(modules.find(m => m.id === 1486))).toBe("2A Prismatic Shield Generator");
        expect(getModuleDisplayName(modules.find(m => m.id === 1792)))
            .toBe("2B Seismic Charge Launcher (Seeker, Turret)");
        expect(getModuleDisplayName(modules.find(m => m.id === 873))).toBe("2C Plasma Accelerator (Fixed)");
        expect(getModuleDisplayName(modules.find(m => m.id === 1623))).toBe("3A AX Missile Rack (Dumbfire, Fixed)");
        expect(getModuleDisplayName(modules.find(m => m.id === 790)))
            .toBe("1I Military Grade Composite (Imperial Clipper)");
    });
});
