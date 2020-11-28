import "jest-extended";

import * as edsm from "../main";
import { streamCSV, streamJSONL } from "../main/util";

describe("index", () => {
    it("exports public stuff", () => {
        expect(edsm.getModuleDisplayName).toBeInstanceOf(Function);
        expect(edsm.readAttractionsJSONL).toBeInstanceOf(Function);
        expect(edsm.readFactionsCSV).toBeInstanceOf(Function);
        expect(edsm.readFactionsJSONL).toBeInstanceOf(Function);
        expect(edsm.readPriceListingsCSV).toBeInstanceOf(Function);
        expect(edsm.readStationsJSONL).toBeInstanceOf(Function);
        expect(edsm.readSystemsCSV).toBeInstanceOf(Function);
        expect(edsm.readSystemsJSONL).toBeInstanceOf(Function);
        expect(edsm.streamAttractionsJSONL).toBeInstanceOf(Function);
        expect(edsm.streamFactionsCSV).toBeInstanceOf(Function);
        expect(edsm.streamFactionsJSONL).toBeInstanceOf(Function);
        expect(edsm.streamPriceListingsCSV).toBeInstanceOf(Function);
        expect(edsm.streamStationsJSONL).toBeInstanceOf(Function);
        expect(edsm.streamSystemsCSV).toBeInstanceOf(Function);
        expect(edsm.streamSystemsJSONL).toBeInstanceOf(Function);
    });
    it("does not export internal utilities", () => {
        expect(edsm).not.toContainValue(streamCSV);
        expect(edsm).not.toContainValue(streamJSONL);
    });
});
