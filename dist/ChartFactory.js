"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Chart_1 = __importDefault(require("./Chart"));
var Types_1 = require("./Types");
/**
 * Usage: let chart: Chart = ChartFactory.create(person);
 */
var ChartFactory = /** @class */ (function () {
    function ChartFactory() {
    }
    ChartFactory.create = function (p1, p2, type) {
        if (p2 === void 0) { p2 = null; }
        if (type === void 0) { type = Types_1.ChartType.Basic; }
        var cdata = [], date, p;
        switch (type) {
            case Types_1.ChartType.Transits:
                cdata = [
                    Chart_1.default.getChartData(p1.date, p1.location),
                    Chart_1.default.getChartData(new Date(), p1.location)
                ];
                return new Chart_1.default(p1, cdata, null, type);
            case Types_1.ChartType.Synastry:
            case Types_1.ChartType.Combined:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                cdata = [
                    Chart_1.default.getChartData(p1.date, p1.location),
                    Chart_1.default.getChartData(p2.date, p2.location)
                ];
                return new Chart_1.default(p1, cdata, null, type);
            case Types_1.ChartType.CombinedTransits:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                cdata = [
                    Chart_1.default.getChartData(p1.date, p1.location),
                    Chart_1.default.getChartData(p2.date, p2.location),
                    Chart_1.default.getChartData(new Date(), p1.location)
                ];
                return new Chart_1.default(p1, cdata, null, type);
            case Types_1.ChartType.Davison:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                cdata.push(Chart_1.default.getChartData(date, p));
                return new Chart_1.default(p1, cdata);
            case Types_1.ChartType.DavisonTransits:
                if (null === p2) {
                    throw Error("2nd Person cannot be null for this chart type (ChartFactory)");
                }
                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                cdata = [
                    Chart_1.default.getChartData(date, p),
                    Chart_1.default.getChartData(new Date(), p)
                ];
                return new Chart_1.default(p1, cdata, null, type);
            default:
                cdata.push(Chart_1.default.getChartData(p1.date, p1.location));
                return new Chart_1.default(p1, cdata);
        }
    };
    /**
     * Calculates the lat/lon of the geographic midpoint between two lat/lon pairs
     * @param  {Point} p1 Latitude/longitude of first location
     * @param  {Point} p2 Latitude/longitude of second location
     * @return {Point} The latitude/longitude of the geographic midpoint
     */
    ChartFactory.getGeoMidpoint = function (p1, p2) {
        var lat1 = ChartFactory.toRadians(p1.lat), lng1 = ChartFactory.toRadians(p1.lng), lat2 = ChartFactory.toRadians(p2.lat), lng2 = ChartFactory.toRadians(p2.lng), bx = Math.cos(lat2) * Math.cos(lng2 - lng1), by = Math.cos(lat2) * Math.sin(lng2 - lng1), lng3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx), lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt(Math.pow(Math.cos(lat1) + bx, 2) + Math.pow(by, 2)));
        return {
            lat: ChartFactory.toDegrees(lat3),
            lng: ChartFactory.toDegrees(lng3)
        };
    };
    /**
     * Finds the exact midpoint between two dates
     * @param  {Date} date1 The first date
     * @param  {Date} date2 The second date
     * @return {Date}       The midpoint date as an ISO 8601 string
     */
    ChartFactory.getDatetimeMidpoint = function (date1, date2) {
        var d1 = date1.getTime(), d2 = date2.getTime(), ts;
        // if two dates are the same, midpoint is just that date
        if (d1 === d2) {
            return date1;
        }
        ts = d1 < d2 ? d1 + ((d2 - d1) / 2) : d2 + ((d1 - d2) / 2);
        return new Date(ts);
    };
    /**
     * Converts decimal degrees to radians
     * @param  {number} degrees Decimal representation of degrees to be converted
     * @return {number}         Returns radians
     */
    ChartFactory.toRadians = function (degrees) { return degrees * Math.PI / 180; };
    /**
     * Converts radians to decimal degrees
     * @param  {number} radians Radians to be converted
     * @return {number}         Returns decimal degrees
     */
    ChartFactory.toDegrees = function (radians) { return radians * 180 / Math.PI; };
    return ChartFactory;
}());
exports.ChartFactory = ChartFactory;
exports.default = ChartFactory;
