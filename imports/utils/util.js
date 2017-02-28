/**
 * Utility functions for common computations found throughout the app
 *
 * @constructor    Empty
 */
export default function Util() {

}

/**
 * Generates a string of 5 random alpha characters.
 *
 * @returns {string}    made up of 5 random alpha characters
 */
export const getFiveRandomChars = function() {
  var text = "";
  var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for(var i = 0; i < 5; i++) {
    text += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }

  return text;
}

/**
 * Checks if an object is defined and not null
 *
 * @param  {[object]}  obj     JavaScript object to check
 * @return {Boolean}    True if object is defined and not null, false otherwise
 */
export const isDefinedObj = function(obj) {
  return obj !== undefined && obj !== null;
}

/**
 * Returns only the first N chars of a given String. Returns the String
 * itself if there are <= N chars
 *
 * @param  {[String]} str    String to obtain first N chars from
 * @param  {[int]} n    Integer indicating the number of chars to extract
 * @return {[String]}     String made up of the first N chars
 */
export const getFirstNChars = function(str, n) {
  if (str.length > n) {
    return str.substring(0, n);
  } else {
    return str;
  }
}

/**
 * Converts academic year string to integer
 *
 * @param {string}    string of academic year in format 'AYXXXX-1/XXXX', eg. AY2014/2015
 * @return {integer} string of next academic year in format 'AYXXXX/XXXX+1' eg. AY2015/2016
*/
export const increaseAcadYearByOne = function increaseAcadYearByOne(acadYearString)  {
  let lastFourString = acadYearString.slice(acadYearString.length-4, acadYearString.length);
  const lastFourInteger = parseInt(lastFourString);
  const newLastFourInteger = lastFourInteger + 1;
  const newAcadYear = 'AY ' + lastFourInteger + '/' + newLastFourInteger;

  return newAcadYear;
};
