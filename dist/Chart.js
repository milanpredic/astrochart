"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Aspect_1 = __importDefault(require("./Aspect"));
var Types_1 = require("./Types");
var Sourcery_1 = __importDefault(require("./Sourcery"));
var Chart = /** @class */ (function () {
    function Chart(p1, cdata, p2, type) {
        if (p2 === void 0) { p2 = null; }
        if (type === void 0) { type = Types_1.ChartType.Basic; }
        this.p1 = p1;
        this.p2 = p2;
        this.type = type;
        this._planets2 = [];
        this._aspects = [];
        this._debug = true;
        this._signs = [
            { name: "aries", symbol: "q", v: 1 },
            { name: "taurus", symbol: "w", v: 1 },
            { name: "gemini", symbol: "e", v: 1 },
            { name: "cancer", symbol: "r", v: 1 },
            { name: "leo", symbol: "t", v: 1 },
            { name: "virgo", symbol: "z", v: 1 },
            { name: "libra", symbol: "u", v: 1 },
            { name: "scorpio", symbol: "i", v: 1 },
            { name: "sagittarius", symbol: "o", v: 1 },
            { name: "capricorn", symbol: "p", v: 1 },
            { name: "aquarius", symbol: "ü", v: 1 },
            { name: "pisces", symbol: "+", v: 1 }
        ];
        var pdata;
        switch (type) {
            case Types_1.ChartType.Combined:
                pdata = this.calculateCombinedPlanets(cdata);
                this._planets1 = pdata.planets;
                this._ascendant = pdata.ascendant;
                this._houses = pdata.houses;
                break;
            case Types_1.ChartType.CombinedTransits:
                pdata = this.calculateCombinedPlanets(cdata);
                this._planets1 = pdata.planets;
                this._planets2 = cdata[2].planets;
                this._ascendant = pdata.ascendant;
                this._houses = pdata.houses;
                break;
            default:
                this._planets1 = cdata[0].planets;
                if (cdata[1]) {
                    this._planets2 = cdata[1].planets;
                }
                this._ascendant = cdata[0].ascendant;
                this._houses = cdata[0].houses;
                break;
        }
        this.calculateAspects();
    }
    /**
     * Calculates the aspects between planets in the chart
     */
    Chart.prototype.calculateAspects = function () {
        this._aspects = [];
        if (!this._planets2.length) {
            // calculate aspects within the _planets1 array
            for (var i in this._planets1) {
                for (var j in this._planets1) {
                    if (i !== j && j > i) {
                        try {
                            this._aspects.push(new Aspect_1.default(this._planets1[i], this._planets1[j]));
                        }
                        catch (err) {
                            if (this._debug)
                                console.error(err);
                        }
                    }
                }
            }
        }
        else {
            // calculate aspects between the _planets1 and _planets2 arrays
            for (var i in this._planets1) {
                for (var j in this._planets2) {
                    try {
                        this._aspects.push(new Aspect_1.default(this._planets1[i], this._planets2[j]));
                    }
                    catch (err) {
                        if (this._debug)
                            console.error(err);
                    }
                }
            }
        }
    };
    /**
     * Calculates longitudes for a combined chart
     * @param {ChartData} p1 Planet data from person one
     * @param {ChartData} p2 Planet data from person two
     */
    Chart.prototype.calculateCombinedPlanets = function (cdata) {
        var cd = {
            houses: [],
            planets: [],
            ascendant: 0,
            mc: 0
        };
        for (var p in cdata[0].planets) {
            cd.planets[p].name = p;
            cd.planets[p].longitude = this.getLonMidpoint(cdata[0].planets[p].longitude, cdata[1].planets[p].longitude);
            cd.planets[p].latitude = (cdata[0].planets[p].latitude + cdata[1].planets[p].latitude) / 2;
            cd.planets[p].speed = (cdata[0].planets[p].speed + cdata[1].planets[p].speed) / 2;
        }
        for (var h in cdata[0].houses) {
            cd.houses[h] = this.getLonMidpoint(cdata[0].houses[h], cdata[1].houses[h]);
        }
        cd.ascendant = this.getLonMidpoint(cdata[0].ascendant, cdata[1].ascendant);
        cd.mc = this.getLonMidpoint(cdata[0].mc, cdata[1].mc);
        return cd;
    };
    /**
     * Finds the midpoint between two planets on the "short" side
     * @param  {number} l1 Longitude of planet one
     * @param  {number} l2 Longitude of planet two
     * @return {number}    Longitude of the midpoint
     */
    Chart.prototype.getLonMidpoint = function (l1, l2) {
        var mp, high, low;
        // if they are exactly the same, return either one
        if (l1 === l2) {
            return l1;
        }
        // figure out which has a higher/lower longitude
        high = l1 > l2 ? l1 : l2;
        low = l1 < l2 ? l1 : l2;
        if (high - low <= 180) {
            mp = (high + low) / 2;
        }
        else {
            mp = ((((low + 360) - high) / 2) + high) % 360;
        }
        return mp;
    };
    /**
     * Gets chart data from the online ephemeris
     * @param {Date} date A UTC datetime string in ISO 8601 format
     * @param {Point}  p    An object with numeric lat and lng properties
     * @return {ChartData}  A JSON object with the data needed to implement a chart
     */
    Chart.getChartData = function (date, p) {
        var planets = Sourcery_1.default.getPlanets(date);
        var houses = Sourcery_1.default.getHouses(date, p);
        return {
            planets: planets,
            houses: houses.house,
            ascendant: houses.ascendant,
            mc: houses.mc
        };
    };
    /**
     * Refresh or set the transits to a new time
     * @param {string} date (Optional) Target datetime for transits in ISO 8601 format; defaults to now()
     */
    Chart.prototype.refreshTransits = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var cdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Types_1.ChartType.Synastry === this.type) {
                            throw new Error("You cannot refresh transits on a synastry chart");
                        }
                        if (null === date) {
                            date = new Date();
                        }
                        return [4 /*yield*/, Chart.getChartData(date, this.p1.location)];
                    case 1:
                        cdata = _a.sent();
                        this._planets2 = cdata.planets;
                        this.calculateAspects();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Chart.prototype, "houses", {
        get: function () { return this._houses; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "aspects", {
        get: function () { return this._aspects; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "ascendant", {
        get: function () { return this._ascendant; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "innerPlanets", {
        get: function () { return this._planets2 ? this._planets1 : []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "outerPlanets", {
        get: function () { return this._planets2 ? this._planets2 : this._planets1; },
        enumerable: true,
        configurable: true
    });
    return Chart;
}());
exports.Chart = Chart;
exports.default = Chart;
