# astrochart

AstroChart
=======================================
Core astrological chart functionalities


* * *
A NodeJs package that provide core functionality for including astrological charts in projects.
It is based on swiss ephemerides.

### List of features

*    Basic,
*    Transits,
*    Synastry,
*    Combined,
*    Davison,
*    CombinedTransits,
*    DavisonTransits

### Code Demo

```javascript We will use markdown for the Syntax Highlighting

(async () => {
    let p = await Person.create('Milan', new Date('1986-01-06 01:15'), 'Negotin, Serbia');
    let c = ChartFactory.create(p);
    console.log(c.aspects);
})();

```

### Download & Installation

```shell 
$ npm i astrochart 
```

### Contributing

Keep it simple. Keep it minimal. Don't put every single feature just because you can.

### Authors or Acknowledgments

*   Milan Predic
*   Thanks to Morgan Benton on project https://github.com/morphatic/astrologyjs

### License

This project is licensed under the MIT License