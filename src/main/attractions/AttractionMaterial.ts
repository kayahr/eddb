/*
 * Copyright (C) 2020 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { Serializable } from "@kayahr/kaylib/lib/main/lang/Serializable";

import { Factories } from "../util/Factories";
import { SimpleMaterial } from "./SimpleMaterial";
import { SimpleMaterials } from "./SimpleMaterials";

/** JSON structure of an EDDB attraction material. */
export interface AttractionMaterialJSON {
    material_id: number;
    material_name: string;
    frequency: number | null;
}

/**
 * Material referenced by attractions.
 */
export class AttractionMaterial implements Serializable<AttractionMaterialJSON> {
    private constructor(
        private readonly material: SimpleMaterial,
        private readonly frequency: number | null
    ) {}

    public static fromJSON(json: AttractionMaterialJSON, { simpleMaterials = new SimpleMaterials() }: Factories = {}):
            AttractionMaterial {
        return new AttractionMaterial(
            simpleMaterials.create(json.material_id, json.material_name),
            json.frequency
        );
    }

    /** @inheritDoc */
    public toJSON(): AttractionMaterialJSON {
        return {
            material_id: this.material.getId(),
            material_name: this.material.getName(),
            frequency: this.frequency
        };
    }

    public getMaterial(): SimpleMaterial {
        return this.material;
    }

    /**
     * Returns the frequency the material appears at the attraction.
     *
     * @return The frequency. Null if unknown.
     */
    public getFrequency(): number | null {
        return this.frequency;
    }
}
