"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Planet = /** @class */ (function () {
    /**
     * Instantiate a new planet object.
     * @param {string} name The planet's name
     * @param {number} lon  The planet's longitude
     * @param {number} lat  The planet's latitude
     * @param {number} spd  The planet's speed relative to earth
     */
    function Planet(name, lon, lat, spd) {
        this.name = name;
        this.longitude = lon;
        this.latitude = lat;
        this.speed = spd;
    }
    Object.defineProperty(Planet.prototype, "retrograde", {
        /**
         * A planet is retrograde when it's speed relative
         * to earth is less than zero
         * @return {boolean} Whether or not the planet is retrograde
         */
        get: function () {
            return this.speed < 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planet.prototype, "house", {
        get: function () {
            return Math.floor(this.longitude / 30);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planet.prototype, "position", {
        get: function () {
            var value = this.longitude - this.house * 30;
            var hour = Math.floor(value);
            var minFrac = (value - hour) * 60;
            var min = Math.floor(minFrac);
            var sec = Math.floor((minFrac - min) * 60);
            return hour + ' ' + min + ' ' + sec;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Is this one of the major planets typically included in a chart?
     * @return {boolean} Returns true if it is a major planet
     */
    Planet.prototype.isMajor = function () {
        return ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn",
            "uranus", "neptune", "pluto", "north node", "south node"]
            .indexOf(this.name.toLowerCase()) > -1;
    };
    Planet.names = [
        'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Staturn', 'Uranus', 'Neptune',
        'Pluto', 'Mean node', 'True node'
    ];
    return Planet;
}());
exports.Planet = Planet;
exports.default = Planet;
