import { Point, GoogleTimezoneResult, GoogleGeocodeResult } from './Types'
import axios from 'axios'
/**
 * Represents a person or event for whom a chart will be created
 */
export class Person {

    /**
     * Google API key
     * @type {string}
     */
    private static _key: string = "AIzaSyAXnIdQxap1WQuzG0XxHfYlCA5O9GQyvuY";

    /**
     * Creates a Person object
     * @param {string} public name Name of the person or event
     * @param {string} public date UTC date in ISO 8601 format, i.e. YYYY-MM-DDTHH:mmZ (caller must convert to UTC)
     * @param {Point} location The [lat: number, lon: number] of the event or person's birthplace
     */
    constructor(public name: string, public date: Date, public location: Point) {}

    /**
     * Asynchronous factory function for creating people or events
     * @param  {string}          name     Name of the person or event
     * @param  {Date | string}   date     Exact datetime for the chart, preferably UTC date in ISO 8601 format, i.e. YYYY-MM-DDTHH:mmZ (caller must convert to UTC)
     * @param  {Point | string}  location Either an address or a lat/lng combination
     * @return {Promise<Person>}          The Person object that was created
     */
    static async create(name: string, date: Date, location: Point | string): Promise<Person> {

        let loc: Point;

        // make sure a name was submitted
        if (!name) {
            throw new Error("No name was submitted for the person");
        }

        // deal with the type of location submitted
        if (typeof location === "string") {
            loc = await this.getLatLon(location);
        } else {
            // make sure latitude was valid
            if (location.lat < -90 || location.lat > 90) {
                throw new RangeError("Latitude must be between -90 and 90");
            }
            // make sure longitude was valid
            if (location.lng < -180 || location.lng > 180) {
                throw new RangeError("Longitude must be between -180 and 180");
            }
            loc = location;
        }

        return new Person(name, date, loc);
    }

    /**
     * Gets a timezone given a latitude and longitude
     * @param {Point} p  Contains the latitude and longitude in decimal format
     */
    static async getTimezone(p: Point): Promise<string> {
        const response = await axios.get("https://maps.googleapis.com/maps/api/timezone/json", {
            params: {
                key: "AIzaSyAXnIdQxap1WQuzG0XxHfYlCA5O9GQyvuY",
                location: `${p.lat},${p.lng}`,
                timestamp: Math.floor(Date.now() / 1000)
            }
        });
        return response.data.timeZoneId;
    }

    /**
     * Get a latitude and longitude given an address
     * @param {string} address The address of the desired lat/lon
     */
    static async getLatLon(address: string): Promise<Point> {
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json", 
            {
                params: {
                    key: this._key,
                    address: address
                }
            }
        );
        return response.data.results[0].geometry.location;
    }
}

export default Person