# spoken-numbers [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Convert numbers to spoken word formats (e.g. 1375 becomes thirteen seventy five). Various formatting options are provided to support simple digits, c


## Install

```sh
$ npm install --save spoken-numbers
```


## Usage

```js
var spokenNumbers = require('spoken-numbers');

var words1 = spokenNumbers.toSpoken(1724, 'dd');	// seventeen twenty four
var words2 = spokenNumbers.toSpoken(1701, 'dd:o');	// seventeen o one
var words3 = spokenNumbers.toSpoken('AA1901', 'dd:o');  // A A nineteen o one
var words4 = spokenNumbers.toSpoken('AA1901', 'd');     // A A one nine zero one
```

## License

MIT © [Scott Beaudreau]()


[npm-image]: https://badge.fury.io/js/spoken-numbers.svg
[npm-url]: https://npmjs.org/package/spoken-numbers
[travis-image]: https://travis-ci.org/scottbea/spoken-numbers.svg?branch=master
[travis-url]: https://travis-ci.org/scottbea/spoken-numbers
[daviddm-image]: https://david-dm.org/scottbea/spoken-numbers.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/scottbea/spoken-numbers
[coveralls-image]: https://coveralls.io/repos/scottbea/spoken-numbers/badge.svg
[coveralls-url]: https://coveralls.io/r/scottbea/spoken-numbers
