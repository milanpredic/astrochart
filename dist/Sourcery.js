"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swisseph_1 = __importDefault(require("swisseph"));
var Planet_1 = __importDefault(require("./Planet"));
var HOUSE_METHOD_PLACIDUS = 'P';
var HOUSE_METHOD_KOCH = 'K';
var HOUSE_METHOD_REGIOMONTANUS = 'R';
var HOUSE_METHOD_EQUAL = 'E';
var Sourcery = /** @class */ (function () {
    function Sourcery() {
    }
    Sourcery.setHouseMethod = function (hsys) {
        this.houseMethod = hsys;
    };
    Sourcery.setEphemeridesPath = function (path) {
        if (path === void 0) { path = null; }
        if (path) {
            swisseph_1.default.swe_set_ephe_path(path);
        }
    };
    Sourcery.getPlanets = function (date) {
        var julianDate = this.toJulianUTCDate(date);
        var flags = swisseph_1.default.SEFLG_SPEED;
        var data = [];
        [
            swisseph_1.default.SE_SUN,
            swisseph_1.default.SE_MOON,
            swisseph_1.default.SE_MERCURY,
            swisseph_1.default.SE_MARS,
            swisseph_1.default.SE_VENUS,
            swisseph_1.default.SE_JUPITER,
            swisseph_1.default.SE_SATURN,
            swisseph_1.default.SE_URANUS,
            swisseph_1.default.SE_NEPTUNE,
            swisseph_1.default.SE_PLUTO,
            swisseph_1.default.SE_MEAN_NODE,
            swisseph_1.default.SE_TRUE_NODE,
        ].map(function (planet) {
            var d = swisseph_1.default.swe_calc_ut(julianDate, planet, flags);
            data[planet] = new Planet_1.default(Planet_1.default.names[planet], d.longitude, d.latitude, d.longitudeSpeed);
        });
        return data;
    };
    Sourcery.getHouses = function (date, point) {
        return swisseph_1.default.swe_houses(this.toJulianUTCDate(date), point.lat, point.lng, this.houseMethod);
    };
    Sourcery.toJulianUTCDate = function (date) {
        var julianDay = swisseph_1.default.swe_utc_to_jd(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), 0, swisseph_1.default.SE_GREG_CAL);
        return julianDay.julianDayUT;
    };
    Sourcery.toGregorianUTCDate = function (julianDate) {
        return swisseph_1.default.swe_jdut1_to_utc(julianDate, swisseph_1.default.SE_GREG_CAL);
    };
    Sourcery.houseMethod = 'P';
    return Sourcery;
}());
exports.default = Sourcery;
