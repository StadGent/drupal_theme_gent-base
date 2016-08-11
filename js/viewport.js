/**
 * @file
 *  Holds the Viewport class.
 */

/**
 * Viewport class.
 *
 * @constructor
 */
function Viewport() {
  this.width = null;
  this.height = null;
}

/**
 * Retrieves the viewport's width.
 * @returns {number} - The viewport's width.
 */
Viewport.prototype.getWidth = function() {
  return this.get('width');
};

/**
 * Retrieves the viewport's height.
 * @returns {number} - The viewport's height.
 */
Viewport.prototype.getHeight = function() {
  return this.get('height');
};

/**
 * Retrieves a viewport property. Do not use this function directly.
 *
 * @param {string} property - The viewport property to retrieve.
 * @returns {*} - The property its value.
 */
Viewport.prototype.get = function(property) {
  if (this[property] == null) {
    this.refresh();
  }
  return this[property];
};

/**
 * Refreshes the viewport properties.
 */
Viewport.prototype.refresh = function() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  this.width = e[a + 'Width'];
  this.height = e[a + 'Height'];
};
