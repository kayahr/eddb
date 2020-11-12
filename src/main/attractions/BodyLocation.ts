export class BodyLocation {
    public constructor(
        private readonly latitude: number,
        private readonly longitude: number
    ) {}

    public static create(latitude: number | null, longitude: number | null): BodyLocation | null {
        return (latitude != null && longitude != null) ? new BodyLocation(latitude, longitude) : null;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }
}
