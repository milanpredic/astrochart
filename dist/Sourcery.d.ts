import { Point } from './Types';
import Planet from './Planet';
export default class Sourcery {
    private static houseMethod;
    static setHouseMethod(hsys: string): void;
    static setEphemeridesPath(path?: string | null): void;
    static getPlanets(date: Date): Array<Planet>;
    static getHouses(date: Date, point: Point): any;
    static toJulianUTCDate(date: Date): any;
    static toGregorianUTCDate(julianDate: number): any;
}
