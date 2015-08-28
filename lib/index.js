'use strict';

/*
 Module: spoken-numbers
 Author: Scott Beaudreau
 License: MIT
 Description: Convert numbers to spoken word formats (e.g. 1375 becomes thirteen seventy five). Various formatting options are provided to support simple digits, double digits, leading zeros, alphanumeric values, and variations on the word for 'zero' such a 'O'
 */


var largeNumberNames = [null, null, 'hundred', 'thousand', null, 'hundred', 'million', null, 'hundred', 'billion', null, 'hundred', 'trillion', null, 'hundred'];
var digitNames = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var twoDigitNames = [null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

var isString = function (obj) {
  return toString.call(obj) === '[object String]';
};
var isArray = function (obj) {
    return toString.call(obj) === '[object Array]';
  };
var isDigit = function (ch) {
  return ((ch >= '0') && (ch <= '9'));
};
var isLetter = function (ch) {
  return ((ch >= 'A') && (ch <= 'Z')) || ((ch >= 'a') && (ch <= 'z'));
};


/* function convertToWords
 * @param {String|Number} [number] Number to convert into spelled number string
 * @param {Optional Boolean} [useSimpleZero] If true, replaces 'zero' with 'o'
 * @return {String}  Returns formatted spelled number string or null if unable to convert
 */
var convertToWords = function (number, useSimpleZero) {
  //check for invalid number
  if (!number) {
    return null;
  }
  var zero = useSimpleZero ? 'o' : 'zero';

  //special case 0
  if (number === '0') {
    return zero;
  }

  //do not convert numbers larger than 15 digits
  if (number.toString().replace(/,/g, '').length > 15) {
    return null;
  }
  //replace commas if present
  number = number.toString().replace(/,/g, '');

  //remove any leading zeros by converting to a number and back to string
  //number = (+number).toString().replace(/,/g, '');

  var words = [];

  //convert to a character array and reverse order
  number = number.split('').reverse();

  //init i to end of array
  var i = number.length - 1;

  //temp integer value
  var val = 0;
  var last = null;
  var leadingZeros = number[number.length - 1] === '0';

  while (i >= 0) {
    var ch = number[i].toUpperCase();
    leadingZeros = leadingZeros && (isLetter(ch) || (ch === '0'));
    if (leadingZeros && (ch === '0')) {
      words.push(zero);
    } else if (isDigit(ch)) {
      //add the current digit to val (normally zero unless special twoDigitNames place)
      val += +ch;

      //look for twoDigitNames place
      if ((!largeNumberNames[i] && i > 0) && isDigit(number[i - 1])) {
        //if less than twenty
        if (val < 2) {
          val *= 10;
          i--; //move the index
          continue;
        } else {
          //get from twoDigitNames array and add to words array
          words.push(twoDigitNames[val]);
        }
      } else {
        //add digit to word array
        if (digitNames[val]) {
          words.push(digitNames[val]);
        } else if ((ch === '0') && isLetter(last)) {
          words.push(zero);
        }

        //add significance to word array
        if (i > 0 && val > 0) {
          words.push(largeNumberNames[i]);
        }
      }
    } else if (isLetter(ch)) {
      // Else it might be alphanumeric
      words.push(ch);
    }

    i--;  //move the index
    val = 0; //reset val to zero
    last = ch;
  }

  //join words array with spaces and return
  return words.join(' ');
};
/* function convertToWords
 * @param {String|Number} [number] Number to convert into spelled number string
 * @param {String} [format] Format specifier for the transform. Can be 'w' for verbose/wide form, 'd'
 * for single digits, and 'dd' for double digits. An optional sub-specifier is allowed with ':0' for
 * a normal 'zero', ':o' for using the letter 'o' instead of 'zero' for non-alphanumeric cases, and
 * ':O' to force the use of 'o' instead of 'zero' for all cases.
 * @return {String} Returns the number as a set of words in spoken form per the formats requested
 */
var toSpoken = function (number, format) {
  var result = null;

  var words = [];
  var group;
  var z;

  if (number === null) {
    return convertToWords(number);
  }

  var numberAsChars = number + '';
  var letterCount = 0;
  for (var i = 0; i < numberAsChars.length; i++) {
    if (isLetter(numberAsChars[i])) {
      letterCount++;
    }
  }
  var compositeFormat = (format || 'd:0');
  var baseFormat = compositeFormat.split(':')[0];
  var modifierFormat = (compositeFormat.split(':')[1] || '0');
  var useSimpleZero = (modifierFormat === 'O') || ((modifierFormat === 'o') && !letterCount);

  switch (baseFormat) {
    case 'w':
      result = convertToWords(number, useSimpleZero);
      break;

    case 'dd':
      if (numberAsChars.length % 2) {
        words.push(convertToWords(numberAsChars.slice(0, 1), useSimpleZero));
      }
      for (z = numberAsChars.length % 2; z < numberAsChars.length - 1; z += 2) {
        group = numberAsChars.slice(z, z + 2);
        while ((group.length > 0) && (group[0] === '0')) {
          words.push(useSimpleZero ? 'o' : 'zero');
          group = group.slice(1);
        }
        if (group.length > 0) {
          words.push(convertToWords(group, useSimpleZero));
        }
      }
      result = words.join(' ');
      break;

    case 'd':
    default:
      for (z = 0; z < numberAsChars.length; z++) {
        group = numberAsChars.slice(z, z + 1);
        words.push(convertToWords(group, useSimpleZero));
      }
      result = words.join(' ');
      break;
  }
  return result;
};
/* function toSpokenArray
 * @param {String|Number} [number] Number to convert into spelled number string
 * @param {Array of Strings} [formats] Array of string formats to be applied to the number
 * @return {String}  Returns unique set of numbers formatted in spoken form with variations for all formats requested
 */
var toSpokenArray = function (number, formats) {
  var results = [];
  var formatArray = isArray(formats) ? formats : (isString(formats) ? [formats] : ['d']);

  for (var z = 0; z < formatArray.length; z++) {
    var format = formatArray[z];
    var result = toSpoken(number, format);
    if (results.indexOf(result) < 0) {
      results.push(result);
    }
  }
  return results;
};

module.exports = {
  toSpoken: toSpoken,
  toSpokenArray: toSpokenArray
};
