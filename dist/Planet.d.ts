export declare class Planet {
    static names: string[];
    /**
     * The planet name
     * @type {string}
     */
    name: string;
    /**
     * A planet's longitude
     * @type {number}
     */
    longitude: number;
    /**
     * A planet's latitude
     * @type {number}
     */
    latitude: number;
    /**
     * A planet's speed
     * @type {number}
     */
    speed: number;
    /**
     * Instantiate a new planet object.
     * @param {string} name The planet's name
     * @param {number} lon  The planet's longitude
     * @param {number} lat  The planet's latitude
     * @param {number} spd  The planet's speed relative to earth
     */
    constructor(name: string, lon: number, lat: number, spd: number);
    /**
     * A planet is retrograde when it's speed relative
     * to earth is less than zero
     * @return {boolean} Whether or not the planet is retrograde
     */
    readonly retrograde: boolean;
    readonly house: number;
    readonly position: string;
    /**
     * Is this one of the major planets typically included in a chart?
     * @return {boolean} Returns true if it is a major planet
     */
    isMajor(): boolean;
}
export default Planet;
