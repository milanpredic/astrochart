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
var axios_1 = __importDefault(require("axios"));
/**
 * Represents a person or event for whom a chart will be created
 */
var Person = /** @class */ (function () {
    /**
     * Creates a Person object
     * @param {string} public name Name of the person or event
     * @param {string} public date UTC date in ISO 8601 format, i.e. YYYY-MM-DDTHH:mmZ (caller must convert to UTC)
     * @param {Point} location The [lat: number, lon: number] of the event or person's birthplace
     */
    function Person(name, date, location) {
        this.name = name;
        this.date = date;
        this.location = location;
    }
    /**
     * Asynchronous factory function for creating people or events
     * @param  {string}          name     Name of the person or event
     * @param  {Date | string}   date     Exact datetime for the chart, preferably UTC date in ISO 8601 format, i.e. YYYY-MM-DDTHH:mmZ (caller must convert to UTC)
     * @param  {Point | string}  location Either an address or a lat/lng combination
     * @return {Promise<Person>}          The Person object that was created
     */
    Person.create = function (name, date, location) {
        return __awaiter(this, void 0, void 0, function () {
            var loc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // make sure a name was submitted
                        if (!name) {
                            throw new Error("No name was submitted for the person");
                        }
                        if (!(typeof location === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getLatLon(location)];
                    case 1:
                        loc = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // make sure latitude was valid
                        if (location.lat < -90 || location.lat > 90) {
                            throw new RangeError("Latitude must be between -90 and 90");
                        }
                        // make sure longitude was valid
                        if (location.lng < -180 || location.lng > 180) {
                            throw new RangeError("Longitude must be between -180 and 180");
                        }
                        loc = location;
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Person(name, date, loc)];
                }
            });
        });
    };
    /**
     * Gets a timezone given a latitude and longitude
     * @param {Point} p  Contains the latitude and longitude in decimal format
     */
    Person.getTimezone = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://maps.googleapis.com/maps/api/timezone/json", {
                            params: {
                                key: "AIzaSyAXnIdQxap1WQuzG0XxHfYlCA5O9GQyvuY",
                                location: p.lat + "," + p.lng,
                                timestamp: Math.floor(Date.now() / 1000)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.timeZoneId];
                }
            });
        });
    };
    /**
     * Get a latitude and longitude given an address
     * @param {string} address The address of the desired lat/lon
     */
    Person.getLatLon = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://maps.googleapis.com/maps/api/geocode/json", {
                            params: {
                                key: this._key,
                                address: address
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.results[0].geometry.location];
                }
            });
        });
    };
    /**
     * Google API key
     * @type {string}
     */
    Person._key = "AIzaSyAXnIdQxap1WQuzG0XxHfYlCA5O9GQyvuY";
    return Person;
}());
exports.Person = Person;
exports.default = Person;
