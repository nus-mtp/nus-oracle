/**
 * Utility functions for common computations found throughout the app
 *
 * @constructor    Empty
 */
export default function Util() {

}

/**
 * Generates a string of 5 random alpha characters.
 * @returns {string} made up of 5 random alpha characters
 */
Util.getFiveRandomChars = function() {
  var text = "";
  var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for(var i = 0; i < 5; i++) {
    text += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }

  return text;
}
