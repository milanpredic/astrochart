import Person from "./Person";
import Chart from "./Chart";
import { ChartType, ChartData, Point } from "./Types";

/**
 * Usage: let chart: Chart = ChartFactory.create(person);
 */
export class ChartFactory {

    static create(p1: Person, p2: Person | null = null, type: ChartType = ChartType.Basic) {
        let cdata: Array<ChartData> = [], date: Date, p: Point;
        switch (type) {
            case ChartType.Transits:
                cdata = [
                    Chart.getChartData(p1.date, p1.location),
                    Chart.getChartData(new Date(), p1.location)
                ];
                return new Chart(p1, cdata, null, type);
            case ChartType.Synastry:
            case ChartType.Combined:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                cdata = [
                    Chart.getChartData(p1.date, p1.location),
                    Chart.getChartData(p2.date, p2.location)
                ];
                return new Chart(p1, cdata, null, type);
            case ChartType.CombinedTransits:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                cdata = [
                    Chart.getChartData(p1.date, p1.location),
                    Chart.getChartData(p2.date, p2.location),
                    Chart.getChartData(new Date(), p1.location)
                ];
                return new Chart(p1, cdata, null, type);
            case ChartType.Davison:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                cdata.push(Chart.getChartData(date, p));
                return new Chart(p1, cdata);
            case ChartType.DavisonTransits:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                cdata = [
                    Chart.getChartData(date, p),
                    Chart.getChartData(new Date(), p)
                ];
                return new Chart(p1, cdata, null, type);
            default:
                cdata.push(Chart.getChartData(p1.date, p1.location));
                return new Chart(p1, cdata);
        }
    }

    /**
     * Calculates the lat/lon of the geographic midpoint between two lat/lon pairs
     * @param  {Point} p1 Latitude/longitude of first location
     * @param  {Point} p2 Latitude/longitude of second location
     * @return {Point} The latitude/longitude of the geographic midpoint
     */
    static getGeoMidpoint(p1: Point, p2: Point): Point {
        let lat1 = ChartFactory.toRadians( p1.lat ),
            lng1 = ChartFactory.toRadians( p1.lng ),
            lat2 = ChartFactory.toRadians( p2.lat ),
            lng2 = ChartFactory.toRadians( p2.lng ),
            bx   = Math.cos( lat2 ) * Math.cos( lng2 - lng1 ),
            by   = Math.cos( lat2 ) * Math.sin( lng2 - lng1 ),
            lng3 = lng1 + Math.atan2( by, Math.cos( lat1 ) + bx ),
            lat3 = Math.atan2( Math.sin( lat1 ) + Math.sin( lat2 ),
                   Math.sqrt( Math.pow( Math.cos( lat1 ) + bx, 2 ) + Math.pow( by, 2 ) ) );

        return {
            lat: ChartFactory.toDegrees( lat3 ),
            lng: ChartFactory.toDegrees( lng3 )
        };
    }

    /**
     * Finds the exact midpoint between two dates
     * @param  {Date} date1 The first date
     * @param  {Date} date2 The second date
     * @return {Date}       The midpoint date as an ISO 8601 string
     */
    static getDatetimeMidpoint(date1: Date, date2: Date): Date {
        let d1 = date1.getTime(),
            d2 = date2.getTime(),
            ts: number;

        // if two dates are the same, midpoint is just that date
        if (d1 === d2) {
            return date1;
        }

        ts = d1 < d2 ? d1 + ((d2 - d1) / 2) : d2 + ((d1 - d2) / 2);
        return new Date(ts);
    }

    /**
     * Converts decimal degrees to radians
     * @param  {number} degrees Decimal representation of degrees to be converted
     * @return {number}         Returns radians
     */
    static toRadians = (degrees: number) => degrees * Math.PI / 180;

    /**
     * Converts radians to decimal degrees
     * @param  {number} radians Radians to be converted
     * @return {number}         Returns decimal degrees
     */
    static toDegrees = (radians: number) => radians * 180 / Math.PI;
}

export default ChartFactory