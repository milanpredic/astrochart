import Swisseph from 'swisseph';
import { SourceryPlanetData, Point } from './Types';
import Planet from './Planet';

const HOUSE_METHOD_PLACIDUS = 'P';
const HOUSE_METHOD_KOCH = 'K';
const HOUSE_METHOD_REGIOMONTANUS = 'R';
const HOUSE_METHOD_EQUAL = 'E';

export default class Sourcery {

    private static houseMethod:string = 'P';

    static setHouseMethod(hsys:string) {
        this.houseMethod = hsys;
    }

    static setEphemeridesPath(path: string | null = null) {
        if (path) {
            Swisseph.swe_set_ephe_path(path);
        }
    }

    static getPlanets(date: Date):Array<Planet> {
        const julianDate = this.toJulianUTCDate(date);
        const flags = Swisseph.SEFLG_SPEED;
        let data:Array<Planet> = [];
        [
            Swisseph.SE_SUN, 
            Swisseph.SE_MOON,
            Swisseph.SE_MERCURY,
            Swisseph.SE_MARS,
            Swisseph.SE_VENUS,
            Swisseph.SE_JUPITER,
            Swisseph.SE_SATURN,
            Swisseph.SE_URANUS,
            Swisseph.SE_NEPTUNE,
            Swisseph.SE_PLUTO,
            Swisseph.SE_MEAN_NODE,
            Swisseph.SE_TRUE_NODE,
        ].map(planet => {
            const d:SourceryPlanetData = Swisseph.swe_calc_ut(julianDate, planet, flags);
            data[planet] = new Planet(Planet.names[planet], d.longitude, d.latitude, d.longitudeSpeed);
        });
        return data;
    }

    static getHouses(date: Date, point: Point) {
        return Swisseph.swe_houses(this.toJulianUTCDate(date), point.lat, point.lng, this.houseMethod);
    }

    static toJulianUTCDate(date: Date) {
        const julianDay = Swisseph.swe_utc_to_jd(
             date.getUTCFullYear(), 
             date.getUTCMonth() + 1, 
             date.getUTCDate(), 
             date.getUTCHours(), 
             date.getUTCMinutes(), 
             0,
             Swisseph.SE_GREG_CAL
         );
         return julianDay.julianDayUT;
     }

    static toGregorianUTCDate(julianDate:number):any {
        return Swisseph.swe_jdut1_to_utc(julianDate, Swisseph.SE_GREG_CAL);
    }

}