import Planet from './Planet';
import Aspect from './Aspect';
import Person from './Person';
import { ChartDataArray, ChartType, ChartData, Point } from './Types';
export declare class Chart {
    p1: Person;
    p2: Person | null;
    type: ChartType;
    _planets1: Array<Planet>;
    _planets2: Array<Planet>;
    _aspects: Array<Aspect>;
    _ascendant: number;
    _houses: Array<number>;
    _debug: boolean;
    _signs: {
        name: string;
        symbol: string;
        v: number;
    }[];
    constructor(p1: Person, cdata: ChartDataArray, p2?: Person | null, type?: ChartType);
    /**
     * Calculates the aspects between planets in the chart
     */
    calculateAspects(): void;
    /**
     * Calculates longitudes for a combined chart
     * @param {ChartData} p1 Planet data from person one
     * @param {ChartData} p2 Planet data from person two
     */
    calculateCombinedPlanets(cdata: ChartDataArray): ChartData;
    /**
     * Finds the midpoint between two planets on the "short" side
     * @param  {number} l1 Longitude of planet one
     * @param  {number} l2 Longitude of planet two
     * @return {number}    Longitude of the midpoint
     */
    getLonMidpoint(l1: number, l2: number): number;
    /**
     * Gets chart data from the online ephemeris
     * @param {Date} date A UTC datetime string in ISO 8601 format
     * @param {Point}  p    An object with numeric lat and lng properties
     * @return {ChartData}  A JSON object with the data needed to implement a chart
     */
    static getChartData(date: Date, p: Point): ChartData;
    /**
     * Refresh or set the transits to a new time
     * @param {string} date (Optional) Target datetime for transits in ISO 8601 format; defaults to now()
     */
    refreshTransits(date: Date | null): Promise<void>;
    readonly houses: Array<number>;
    readonly aspects: Array<Aspect>;
    readonly ascendant: number;
    readonly innerPlanets: Array<Planet>;
    readonly outerPlanets: Array<Planet>;
}
export default Chart;
