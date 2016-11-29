/**
 * @file
 * Adds the viewport class and wrapper functions.
 */

/**
 * Viewport class.
 *
 * This is a native JS class that doesn't need to be in the jQuery scope.
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
Viewport.prototype.getWidth = function () {
  return this.get('width');
};

/**
 * Retrieves the viewport's height.
 * @returns {number} - The viewport's height.
 */
Viewport.prototype.getHeight = function () {
  return this.get('height');
};

/**
 * Retrieves a viewport property. Do not use this function directly.
 *
 * @param {string} property - The viewport property to retrieve.
 * @returns {*} - The property its value.
 */
Viewport.prototype.get = function (property) {
  if (this[property] === null) {
    this.refresh();
  }
  return this[property];
};

/**
 * Refreshes the viewport properties.
 */
Viewport.prototype.refresh = function () {
  var e = window, a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  this.width = e[a + 'Width'];
  this.height = e[a + 'Height'];
};


(function ($) {

  /**
   * Make sure we have the Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  /**
   * Wrapper function to refresh the viewport data.
   */
  Drupal.gentBase.refreshViewport = function() {
    if (typeof Viewport !== 'function') {
      return;
    }
    Drupal.gentBase.viewport = new Viewport();
    Drupal.gentBase.viewport.refresh();
  };

  /**
   * Refresh the viewport on load, scroll and resize.
   */
  $(window).bind('load resize scroll', function () {
    Drupal.gentBase.refreshViewport();
  });

}(jQuery));
