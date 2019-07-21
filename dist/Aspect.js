"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an aspect between two planets
 */
var Aspect = /** @class */ (function () {
    /**
     * Creates a new Aspect or throws an error if no aspect exists
     * between the planets
     * @param {Planet} public p1 First planet in the relationship
     * @param {Planet} public p2 Second planet in the relationship
     */
    function Aspect(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        /**
         * A label naming the aspect type, e.g. trine
         * @type {string}
         */
        this._type = '';
        /**
         * Number of degrees away from being perfectly in aspect
         * @type {number}
         */
        this._orb = 0;
        /**
         * Is the aspect applying or separating
         * @type {boolean}
         */
        this._applying = false;
        /**
         * Catalog of all of the aspect types available in our system
         * @type {AspectTypeArray}
         */
        this._types = {
            "conjunct": { major: true, angle: 0, orb: 6 },
            "semisextile": { major: false, angle: 30, orb: 3 },
            "decile": { major: false, angle: 36, orb: 1.5 },
            "novile": { major: false, angle: 40, orb: 1.9 },
            "semisquare": { major: false, angle: 45, orb: 3 },
            "septile": { major: false, angle: 51.417, orb: 2 },
            "sextile": { major: true, angle: 60, orb: 6 },
            "quintile": { major: false, angle: 72, orb: 2 },
            "bilin": { major: false, angle: 75, orb: 0.9 },
            "binovile": { major: false, angle: 80, orb: 2 },
            "square": { major: true, angle: 90, orb: 6 },
            "biseptile": { major: false, angle: 102.851, orb: 2 },
            "tredecile": { major: false, angle: 108, orb: 2 },
            "trine": { major: true, angle: 120, orb: 6 },
            "sesquiquadrate": { major: false, angle: 135, orb: 3 },
            "biquintile": { major: false, angle: 144, orb: 2 },
            "inconjunct": { major: false, angle: 150, orb: 3 },
            "treseptile": { major: false, angle: 154.284, orb: 1.1 },
            "tetranovile": { major: false, angle: 160, orb: 3 },
            "tao": { major: false, angle: 165, orb: 1.5 },
            "opposition": { major: true, angle: 180, orb: 6 }
        };
        // get key properties of the planets
        var l1 = p1.longitude, l2 = p2.longitude, ng = Math.abs(l1 - l2), r1 = p1.retrograde, r2 = p2.retrograde, s1 = Math.abs(p1.speed), s2 = Math.abs(p2.speed), ct = false; // corrected?
        // correct for cases where the angle > 180 + the orb of opposition
        if (ng > 180 + this._types["opposition"].orb) {
            ng = l1 > l2 ? 360 - l1 + l2 : 360 - l2 + l1;
            ct = true;
        }
        // determine the aspect type
        for (var type in this._types) {
            var t = this._types[type];
            if (ng >= t.angle - t.orb && ng <= t.angle + t.orb) {
                this._type = type;
            }
        }
        // bail out if there is no in-orb aspect between these two planets
        if (typeof this._type === "undefined") {
            throw new Error("There is no aspect between these two planets.");
        }
        // determine the orb
        this._orb = Number((ng % 1).toFixed(6));
        /*
        // determine if it is applying or not; use speed magnitude (i.e. absolute value)
        let orb = ng - this._types[this._type].angle;
        // planets are in aspect across 0° Aries
        if (( ( (orb < 0 && !ct && l2 > l1) || (orb > 0 && !ct && l1 > l2) ||
                (orb < 0 &&  ct && l1 > l2) || (orb > 0 &&  ct && l2 > l1) ) &&
                ( (!r1 && !r2 && s2 > s1) || (r1 && r2 && s1 > s2) || (r1 && !r2) ) ||
            ( ( (orb > 0 && !ct && l2 > l1) || (orb < 0 && !ct && l1 > l2) ||
                (orb > 0 &&  ct && l1 > l2) || (orb < 0 &&  ct && l2 > l1) ) &&
                ( (!r1 && !r2 && s1 > s2) || (r1 && r2 && s2 > s1) || (!r1 && r2) ) ) )
        ) {
            this._applying = true;
        } else {
            this._applying = false;
        }
        */
    }
    Object.defineProperty(Aspect.prototype, "type", {
        /**
         * Get the type assigned to this aspect
         * @return {string} One of the aspect type names
         */
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Aspect.prototype, "orb", {
        /**
         * Get the number of degrees away from being in perfect aspect
         * @return {number} The number of degrees (absolute value)
         */
        get: function () { return this._orb; },
        enumerable: true,
        configurable: true
    });
    /**
     * Is the aspect applying or separating?
     * @return {boolean} True if the aspect is applying
     */
    Aspect.prototype.isApplying = function () { return this._applying; };
    /**
     * Is this a "major" aspect? i.e. one of those you usually
     * hear about in astrological forecasts
     * @return {boolean} True if this is a "major" aspect
     */
    Aspect.prototype.isMajor = function () { return this._types[this._type].major; };
    return Aspect;
}());
exports.Aspect = Aspect;
exports.default = Aspect;
