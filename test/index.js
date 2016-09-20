'use strict';

var assert = require('assert');
var spokenNumbers = require('../lib');

describe('spoken-numbers', function () {
  describe('spoken-numbers.toSpoken', function () {
    describe('spoken-numbers.toSpoken.parameters', function () {
      describe('passing different values for number', function () {
        it('should handle null', function () {
          var s = spokenNumbers.toSpoken(null, 'd');
          var t0 = null;
          assert(s === t0, 'Format error');
        });
        it('should handle very large numbers', function () {
          var s = spokenNumbers.toSpoken('12,345,678,901,234,567,890', 'w');
          var t0 = null;
          assert(s === t0, 'Format error');
        });
      });
    });
    describe('spoken-numbers.toSpoken.words', function () {
      describe('standard numbers', function () {
        it('should convert 0', function () {
          var s = spokenNumbers.toSpoken('0', 'w');
          var t = 'zero';
          assert(s === t, 'Format error');
        });
        it('should convert 123', function () {
          var s = spokenNumbers.toSpoken(123, 'w');
          var t = 'one hundred twenty three';
          assert(s === t, 'Format error');
        });
        it('should convert 10', function () {
          var s = spokenNumbers.toSpoken('10', 'w');
          var t = 'ten';
          assert(s === t, 'Format error');
        });
        it('should convert 100', function () {
          var s = spokenNumbers.toSpoken('100', 'w');
          var t = 'one hundred';
          assert(s === t, 'Format error');
        });
        it('should convert 20', function () {
          var s = spokenNumbers.toSpoken(20, 'w');
          var t = 'twenty';
          assert(s === t, 'Format error');
        });
        it('should convert 1415296', function () {
          var s = spokenNumbers.toSpoken(1415296, 'w');
          var t = 'one million four hundred fifteen thousand two hundred ninety six';
          assert(s === t, 'Format error');
        });
        it('should convert 2012', function () {
          var s = spokenNumbers.toSpoken('2012', 'w');
          var t = 'two thousand twelve';
          assert(s === t, 'Format error');
        });
      });
      describe('leading zeros', function () {
        it('should convert 007', function () {
          var s = spokenNumbers.toSpoken('007', 'w');
          var t = 'zero zero seven';
          assert(s === t, 'Format error');
        });
        it('should convert B07C', function () {
          var s = spokenNumbers.toSpoken('B07C', 'd');
          var t = 'B zero seven C';
          assert(s === t, 'Format error');
        });
        it('should convert C0 xyzzy', function () {
          var s = spokenNumbers.toSpoken('C0', 'w');
          var t = 'C zero';
          assert(s === t, 'Format error');
        });
      });
      describe('trailing zeros', function () {
        it('should convert 2001', function () {
          var s = spokenNumbers.toSpoken('2001', 'dd:o');
          var t = 'twenty o one';
          assert(s === t, 'Format error');
        });
        it('should convert 47F0', function () {
          var s = spokenNumbers.toSpoken('47F0', 'dd:o');
          var t = 'forty seven F zero';
          assert(s === t, 'Format error');
        });
      });
      describe('simple "O" for "zero"', function () {
        it('should convert 0', function () {
          var s = spokenNumbers.toSpoken('0)', 'w:o');
          var t = 'o';
          assert(s === t, 'Format error');
        });
        it('should convert 10', function () {
          var s = spokenNumbers.toSpoken('10', 'w:o');
          var t = 'ten';
          assert(s === t, 'Format error');
        });
        it('should convert 100', function () {
          var s = spokenNumbers.toSpoken('100', 'w:o');
          var t = 'one hundred';
          assert(s === t, 'Format error');
        });
        it('should convert 1000', function () {
          var s = spokenNumbers.toSpoken('1000', 'dd:o');
          var t = 'ten o o';
          assert(s === t, 'Format error');
        });
        it('should convert 20', function () {
          var s = spokenNumbers.toSpoken(20, 'w:o');
          var t = 'twenty';
          assert(s === t, 'Format error');
        });
        it('should convert 007', function () {
          var s = spokenNumbers.toSpoken('007', 'w:o');
          var t = 'o o seven';
          assert(s === t, 'Format error');
        });
      });
    });
    describe('spoken-numbers.toSpoken.digits', function () {
      describe('standard numbers', function () {
        it('should convert 0', function () {
          var s = spokenNumbers.toSpoken('0', 'd');
          var t = 'zero';
          assert(s === t, 'Format error');
        });
        it('should convert 123', function () {
          var s = spokenNumbers.toSpoken(123, 'd');
          var t = 'one two three';
          assert(s === t, 'Format error');
        });
        it('should convert 10', function () {
          var s = spokenNumbers.toSpoken('10', 'd');
          var t = 'one zero';
          assert(s === t, 'Format error');
        });
        it('should convert 100', function () {
          var s = spokenNumbers.toSpoken('100', 'd');
          var t = 'one zero zero';
          assert(s === t, 'Format error');
        });
        it('should convert 20', function () {
          var s = spokenNumbers.toSpoken(20, 'd');
          var t = 'two zero';
          assert(s === t, 'Format error');
        });
        it('should convert 1415296', function () {
          var s = spokenNumbers.toSpoken(1415296, 'd');
          var t = 'one four one five two nine six';
          assert(s === t, 'Format error');
        });
        it('should convert 2012', function () {
          var s = spokenNumbers.toSpoken('2012', 'd');
          var t = 'two zero one two';
          assert(s === t, 'Format error');
        });
      });
      describe('leading zeros', function () {
        it('should convert 007', function () {
          var s = spokenNumbers.toSpoken('007', 'd');
          var t = 'zero zero seven';
          assert(s === t, 'Format error');
        });
        it('should convert 00705', function () {
          var s = spokenNumbers.toSpoken('00705', 'd');
          var t = 'zero zero seven zero five';
          assert(s === t, 'Format error');
        });
      });
      describe('alphanumeric', function () {
        it('should convert AA195', function () {
          var s = spokenNumbers.toSpoken('AA195', 'd');
          var t = 'A A one nine five';
          assert(s === t, 'Format error');
        });
        it('should convert DFW', function () {
          var s = spokenNumbers.toSpoken('DFW', 'dd');
          var t = 'D F W';
          assert(s === t, 'Format error');
        });
        it('should convert FF0023', function () {
          var s = spokenNumbers.toSpoken('FF0023', 'd');
          var t = 'F F zero zero two three';
          assert(s === t, 'Format error');
        });
        it('should convert 0000AF', function () {
          var s = spokenNumbers.toSpoken('0000AF', 'd');
          var t = 'zero zero zero zero A F';
          assert(s === t, 'Format error');
        });
      });
    });
    describe('spoken-numbers.toSpoken.double-digits', function () {
      describe('standard numbers', function () {
        it('should convert 0', function () {
          var s = spokenNumbers.toSpoken('0', 'dd');
          var t = 'zero';
          assert(s === t, 'Format error');
        });
        it('should convert 123', function () {
          var s = spokenNumbers.toSpoken(123, 'dd');
          var t = 'one twenty three';
          assert(s === t, 'Format error');
        });
        it('should convert 10', function () {
          var s = spokenNumbers.toSpoken('10', 'dd');
          var t = 'ten';
          assert(s === t, 'Format error');
        });
        it('should convert 100', function () {
          var s = spokenNumbers.toSpoken('100', 'dd');
          var t = 'one zero zero';
          assert(s === t, 'Format error');
        });
        it('should convert 20', function () {
          var s = spokenNumbers.toSpoken(20, 'dd');
          var t = 'twenty';
          assert(s === t, 'Format error');
        });
        it('should convert 1415296', function () {
          var s = spokenNumbers.toSpoken(1415296, 'dd');
          var t = 'one forty one fifty two ninety six';
          assert(s === t, 'Format error');
        });
        it('should convert 2012', function () {
          var s = spokenNumbers.toSpoken('2012', 'dd');
          var t = 'twenty twelve';
          assert(s === t, 'Format error');
        });
      });
      describe('leading zeros', function () {
        it('should convert 007', function () {
          var s = spokenNumbers.toSpoken('007', 'dd');
          var t = 'zero zero seven';
          assert(s === t, 'Format error');
        });
        it('should convert 00705', function () {
          var s = spokenNumbers.toSpoken('00705', 'dd');
          var t = 'zero zero seven zero five';
          assert(s === t, 'Format error');
        });
      });
      describe('alphanumeric', function () {
        it('should convert AA195', function () {
          var s = spokenNumbers.toSpoken('AA195', 'dd');
          var t = 'A A one ninety five';
          assert(s === t, 'Format error');
        });
        it('should convert FF0023', function () {
          var s = spokenNumbers.toSpoken('FF0023', 'dd');
          var t = 'F F zero zero twenty three';
          assert(s === t, 'Format error');
        });
        it('should convert 0000AF', function () {
          var s = spokenNumbers.toSpoken('0000AF', 'dd');
          var t = 'zero zero zero zero A F';
          assert(s === t, 'Format error');
        });
      });
      describe('simple "O" for "zero"', function () {
        it('should convert 0', function () {
          var s = spokenNumbers.toSpoken('0', 'dd:o');
          var t = 'o';
          assert(s === t, 'Format error');
        });
        it('should convert 10', function () {
          var s = spokenNumbers.toSpoken('10', 'dd:o');
          var t = 'ten';
          assert(s === t, 'Format error');
        });
        it('should convert 100', function () {
          var s = spokenNumbers.toSpoken('100', 'dd:o');
          var t = 'one o o';
          assert(s === t, 'Format error');
        });
        it('should convert 20', function () {
          var s = spokenNumbers.toSpoken(20, 'dd:o');
          var t = 'twenty';
          assert(s === t, 'Format error');
        });
        it('should convert 007', function () {
          var s = spokenNumbers.toSpoken('007', 'dd:o');
          var t = 'o o seven';
          assert(s === t, 'Format error');
        });
        it('should convert AA1301', function () {
          var s = spokenNumbers.toSpoken('AA1301', 'dd:o');
          var t = 'A A thirteen zero one';
          assert(s === t, 'Format error');
        });
        it('should convert AA1301 using forced "O" notation', function () {
          var s = spokenNumbers.toSpoken('AA1301', 'dd:O');
          var t = 'A A thirteen o one';
          assert(s === t, 'Format error');
        });
        it('should convert 007010200', function () {
          var s = spokenNumbers.toSpoken('007010200', 'dd:o');
          var t = 'o o seven o one o two o o';
          assert(s === t, 'Format error');
        });
        it('should convert SOS05', function () {
          var s = spokenNumbers.toSpoken('SOS05', 'dd:o');
          var t = 'S O S zero five';
          assert(s === t, 'Format error');
        });
      });
    });
  });

  describe('spoken-numbers.toSpokenArray', function () {
    describe('spoken-numbers.toSpokenArray.parameters', function () {
      describe('passing different values for number', function () {
        it('should handle null', function () {
          var s = spokenNumbers.toSpokenArray(null, 'd');
          var t0 = null;
          assert((s.length === 1) && (s[0] === t0), 'Format error');
        });
      });
      describe('passing single format instead of format array', function () {
        it('should convert 2012', function () {
          var s = spokenNumbers.toSpokenArray('1001001SOS', 'd');
          var t0 = 'one zero zero one zero zero one S O S';
          assert((s.length === 1) && (s[0] === t0), 'Format error');
        });
      });
    });
    describe('spoken-numbers.toSpokenArray.mixed-formats', function () {
      describe('standard numbers', function () {
        it('should convert 100', function () {
          var s = spokenNumbers.toSpokenArray('100', ['w', 'd', 'd:o']);
          var t0 = 'one hundred';
          var t1 = 'one zero zero';
          var t2 = 'one o o';
          assert((s.length === 3) && (s[0] === t0) && (s[1] === t1) && (s[2] === t2), 'Format error');
        });
        it('should convert 1415296', function () {
          var s = spokenNumbers.toSpokenArray(1415296, ['w', 'd', 'dd']);
          var t0 = 'one million four hundred fifteen thousand two hundred ninety six';
          var t1 = 'one four one five two nine six';
          var t2 = 'one forty one fifty two ninety six';
          assert((s.length === 3) && (s[0] === t0) && (s[1] === t1) && (s[2] === t2), 'Format error');
        });
        it('should convert 2012', function () {
          var s = spokenNumbers.toSpokenArray('2012', ['w', 'd', 'd:o', 'dd', 'dd:o']);
          var t0 = 'two thousand twelve';
          var t1 = 'two zero one two';
          var t2 = 'two o one two';
          var t3 = 'twenty twelve';
          assert((s.length === 4) && (s[0] === t0) && (s[1] === t1) && (s[2] === t2) && (s[3] === t3), 'Format error');
        });
      });
      describe('leading zeros', function () {
        it('should convert 007', function () {
          var s = spokenNumbers.toSpokenArray('007', ['d', 'd:o']);
          var t0 = 'zero zero seven';
          var t1 = 'o o seven';
          assert((s.length === 2) && (s[0] === t0) && (s[1] === t1), 'Format error');
        });
      });
      describe('alphanumeric numbers', function () {
        it('should convert FF0023', function () {
          var s = spokenNumbers.toSpokenArray('FF0023', ['d', 'dd', 'dd:o', 'dd:O']);
          var t0 = 'F F zero zero two three';
          var t1 = 'F F zero zero twenty three';
          var t2 = 'F F o o twenty three';
          assert((s.length === 3) && (s[0] === t0) && (s[1] === t1) && (s[2] === t2), 'Format error');
        });
      });
    });
  });
});
