'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('AstroChart Person create', () => {
    it('should return Person name', async () => {
        const p = await index.Person.create('Milan', new Date('1986-01-06 01:15'), 'Negotin, Serbia');
        var result = p.name;
        expect(result).to.equal('Milan');
    });
});