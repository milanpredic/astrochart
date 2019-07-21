declare module 'swisseph' { 

    // planets
    export const SE_ECL_NUT = -1
    export const SE_SUN = 0 
    export const SE_MOON = 1 
    export const SE_MERCURY = 2 
    export const SE_VENUS = 3 
    export const SE_MARS = 4 
    export const SE_JUPITER = 5 
    export const SE_SATURN = 6 
    export const SE_URANUS = 7 
    export const SE_NEPTUNE = 8  
    export const SE_PLUTO = 9 
    export const SE_MEAN_NODE = 10
    export const SE_TRUE_NODE = 11
    
    export const SE_MEAN_APOG = 12
    export const SE_OSCU_APOG = 13   
    export const SE_EARTH = 14
    export const SE_CHIRON = 15
    export const SE_PHOLUS = 16
    export const SE_CERES = 17
    export const SE_PALLAS = 18
    export const SE_JUNO = 19
    export const SE_VESTA = 20
    export const SE_INTP_APOG = 21
    export const SE_INTP_PERG = 22
    export const SE_NPLANETS = 23

    // flags
    export const SE_GREG_CAL = 1;

    export const SEFLG_SPEED = 256;

    export const SEFLG_JPLEPH = 1;
    export const SEFLG_SWIEPH = 2;
    export const SEFLG_MOSEPH = 4;

    // functions
    export function swe_set_ephe_path(path:string):void;
    export function swe_calc_ut(julianDate: number, bodyId: any, flags:any):any;
    export function swe_houses(julianDate: number, latitude: number, longitude: number, houseMethod: string):any;

    export function swe_julday(year: number, month: number, day: number, hour: number, type: number):any;
    export function swe_utc_to_jd(year: number, month: number, day: number, hours: number, minutes: number, seconds: number, type: number):any;
    export function swe_jdut1_to_utc(t: number, type: number):any;

}