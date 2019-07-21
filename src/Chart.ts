import Planet from './Planet'
import Aspect from './Aspect';
import Person from './Person';
import { ChartDataArray, ChartType, ChartData, Point } from './Types'
import Sourcery from './Sourcery';

export class Chart {
    _planets1: Array<Planet>;
    _planets2: Array<Planet> = [];
    _aspects: Array<Aspect> = [];
    _ascendant: number;
    _houses: Array<number>;
    _debug: boolean = true;

    _signs = [
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

    constructor(public p1: Person, cdata: ChartDataArray, public p2: Person | null = null, public type: ChartType = ChartType.Basic) {
        let pdata: ChartData;
        switch (type) {
            case ChartType.Combined:
                pdata = this.calculateCombinedPlanets(cdata);
                this._planets1 = pdata.planets;
                this._ascendant = pdata.ascendant;
                this._houses = pdata.houses;
                break;
            case ChartType.CombinedTransits:
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
    calculateAspects(): void {
        this._aspects = [];
        if (!this._planets2.length) {
            // calculate aspects within the _planets1 array
            for (let i in this._planets1) {
                for (let j in this._planets1) {
                    if (i !== j && j > i) {
                        try {
                            this._aspects.push(new Aspect(this._planets1[i], this._planets1[j]));
                        } catch (err) {
                            if (this._debug) console.error(err);
                        }
                    }
                }
            }
        }
        else {
            // calculate aspects between the _planets1 and _planets2 arrays
            for (let i in this._planets1) {
                for (let j in this._planets2) {
                    try {
                        this._aspects.push(new Aspect(this._planets1[i], this._planets2[j]));
                    } catch (err) {
                        if (this._debug) console.error(err);
                    }
                }
            }
        }
    }

    /**
     * Calculates longitudes for a combined chart
     * @param {ChartData} p1 Planet data from person one
     * @param {ChartData} p2 Planet data from person two
     */
    calculateCombinedPlanets(cdata: ChartDataArray): ChartData {
        let cd: ChartData = {
            houses: [],
            planets: [],
            ascendant: 0,
            mc: 0
        };
        for (let p in cdata[0].planets) {
            cd.planets[p].name = p;
            cd.planets[p].longitude = this.getLonMidpoint(cdata[0].planets[p].longitude, cdata[1].planets[p].longitude);
            cd.planets[p].latitude = (cdata[0].planets[p].latitude + cdata[1].planets[p].latitude) / 2;
            cd.planets[p].speed = (cdata[0].planets[p].speed + cdata[1].planets[p].speed) / 2;
        }
        for (let h in cdata[0].houses) {
            cd.houses[h] = this.getLonMidpoint(cdata[0].houses[h], cdata[1].houses[h]);
        }
        cd.ascendant = this.getLonMidpoint(cdata[0].ascendant, cdata[1].ascendant);
        cd.mc = this.getLonMidpoint(cdata[0].mc, cdata[1].mc);
        return cd;
    }

    /**
     * Finds the midpoint between two planets on the "short" side
     * @param  {number} l1 Longitude of planet one
     * @param  {number} l2 Longitude of planet two
     * @return {number}    Longitude of the midpoint
     */
    getLonMidpoint(l1: number, l2: number): number {
        let mp: number, high: number, low: number;

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
    }

    /**
     * Gets chart data from the online ephemeris
     * @param {Date} date A UTC datetime string in ISO 8601 format
     * @param {Point}  p    An object with numeric lat and lng properties
     * @return {ChartData}  A JSON object with the data needed to implement a chart
     */
    static getChartData(date: Date, p: Point):ChartData {
        const planets = Sourcery.getPlanets(date);
        const houses = Sourcery.getHouses(date, p);
        return {
            planets: planets,
            houses: houses.house,
            ascendant: houses.ascendant,
            mc: houses.mc
        }
    }

    /**
     * Refresh or set the transits to a new time
     * @param {string} date (Optional) Target datetime for transits in ISO 8601 format; defaults to now()
     */
    async refreshTransits(date: Date | null) {
        if (ChartType.Synastry === this.type) {
            throw new Error("You cannot refresh transits on a synastry chart");
        }
        if (null === date) {
            date = new Date();
        }
        let cdata = await Chart.getChartData(date, this.p1.location);
        this._planets2 = cdata.planets;
        this.calculateAspects();
    }

    get houses(): Array<number> { return this._houses; }
    get aspects(): Array<Aspect> { return this._aspects; }
    get ascendant(): number { return this._ascendant; }
    get innerPlanets(): Array<Planet> { return this._planets2 ? this._planets1 : []; }
    get outerPlanets(): Array<Planet> { return this._planets2 ? this._planets2 : this._planets1; }
}

export default Chart