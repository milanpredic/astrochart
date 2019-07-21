import Planet from "./Planet";
export interface AspectType {
    major: boolean;
    angle: number;
    orb: number;
}
export interface AspectTypeArray {
    [name: string]: AspectType;
}
export declare enum ChartType {
    Basic = 0,
    Transits = 1,
    Synastry = 2,
    Combined = 3,
    Davison = 4,
    CombinedTransits = 5,
    DavisonTransits = 6
}
export interface SourceryPlanetData {
    longitude: number;
    longitudeSpeed: number;
    latitude: number;
    latitudeSpeed: number;
    distance: number;
    distanceSpeed: number;
}
export interface ChartData {
    planets: Array<Planet>;
    houses: Array<number>;
    ascendant: number;
    mc: number;
}
export interface ChartDataArray {
    [index: number]: ChartData;
}
interface GoogleAddressComponent {
    long_name: string;
    short_name: string;
    types: Array<string>;
}
export interface GoogleLocation {
    lat: number;
    lng: number;
}
export declare type Point = GoogleLocation;
export interface GoogleViewport {
    northeast: GoogleLocation;
    southwest: GoogleLocation;
}
export interface GoogleGeocode {
    address_components: Array<GoogleAddressComponent>;
    formatted_address: string;
    geometry: {
        location: GoogleLocation;
        location_type: string;
        viewport: GoogleViewport;
        bounds?: GoogleViewport;
    };
    place_id: string;
    types: Array<string>;
    partial_match?: boolean;
    postcode_localities?: Array<string>;
}
export interface GoogleGeocodeResult {
    results: Array<GoogleGeocode>;
    status: string;
    error_message?: string;
}
export interface GoogleTimezoneResult {
    status: string;
    dstOffset?: number;
    rawOffset?: number;
    timeZoneId?: string;
    timeZoneName?: string;
    errorMessage?: string;
}
export {};
