import Person from "./Person";
import Chart from "./Chart";
import { ChartType, Point } from "./Types";
/**
 * Usage: let chart: Chart = ChartFactory.create(person);
 */
export declare class ChartFactory {
    static create(p1: Person, p2?: Person | null, type?: ChartType): Chart;
    /**
     * Calculates the lat/lon of the geographic midpoint between two lat/lon pairs
     * @param  {Point} p1 Latitude/longitude of first location
     * @param  {Point} p2 Latitude/longitude of second location
     * @return {Point} The latitude/longitude of the geographic midpoint
     */
    static getGeoMidpoint(p1: Point, p2: Point): Point;
    /**
     * Finds the exact midpoint between two dates
     * @param  {Date} date1 The first date
     * @param  {Date} date2 The second date
     * @return {Date}       The midpoint date as an ISO 8601 string
     */
    static getDatetimeMidpoint(date1: Date, date2: Date): Date;
    /**
     * Converts decimal degrees to radians
     * @param  {number} degrees Decimal representation of degrees to be converted
     * @return {number}         Returns radians
     */
    static toRadians: (degrees: number) => number;
    /**
     * Converts radians to decimal degrees
     * @param  {number} radians Radians to be converted
     * @return {number}         Returns decimal degrees
     */
    static toDegrees: (radians: number) => number;
}
export default ChartFactory;
