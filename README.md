# spoken-numbers
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
- - -
> Convert numbers to spoken word formats (e.g. 1375 becomes thirteen seventy five). Various formatting options are provided to support simple digits, c


## Install with npm

```bash
$ npm install --save spoken-numbers
```

## Usage

```js
var spokenNumbers = require('spoken-numbers');

var words1 = spokenNumbers.toSpoken(1724, 'dd'); // => 'seventeen twenty four'
var words2 = spokenNumbers.toSpoken(1701, 'dd:o'); // => 'seventeen o one'
var words3 = spokenNumbers.toSpoken(1000, 'dd:o'); // => 'ten zero zero'
var words4 = spokenNumbers.toSpoken('AA1901', 'dd:o'); // => 'A A nineteen o one'
var words5 = spokenNumbers.toSpoken('AA1901', 'd'); // => 'A A one nine zero one'
```

## Formats
- `d` - Formats all numbers as individual digits. Example: `14,302,033` becomes `one four three zero two zero three three`
- `dd` - Formats all numbers as individual digits. Example: `14,30,20,33` becomes `fourteen thirty twenty thirty three`
- `w` - Formats all numbers in a verbose form, including named units. Example: `14,302,033` becomes `fourteen million three hundred and two thousand thirty three`
- `d:o` - Formats all numbers as individual digits but replaces `zero` with `0`. Example: `14,302,033` becomes `one four three o two o three three`

## License
This code is licensed under the MIT license for [Scott Beaudreau](). For more
information, please refer to the [LICENSE](/LICENSE) file.


[npm-image]: https://badge.fury.io/js/spoken-numbers.svg
[npm-url]: https://npmjs.org/package/spoken-numbers
[travis-image]: https://travis-ci.org/scottbea/spoken-numbers.svg?branch=master
[travis-url]: https://travis-ci.org/scottbea/spoken-numbers
[daviddm-image]: https://david-dm.org/scottbea/spoken-numbers.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/scottbea/spoken-numbers
[coveralls-image]: https://coveralls.io/repos/scottbea/spoken-numbers/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/r/scottbea/spoken-numbers?branch=master
