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
   * Mobile breakpoint in pixels.
   * @type {number}
   */
  Object.defineProperty(Drupal.gentBase, 'BREAKPOINT_MOBILE', {
    value: 640,
    writable: false,
    enumerable: true,
    configurable: true
  });

  /**
   * Tablet breakpoint in pixels.
   * @type {number}
   */
  Object.defineProperty(Drupal.gentBase, 'BREAKPOINT_TABLET', {
    value: 960,
    writable: false,
    enumerable: true,
    configurable: true
  });

  /**
   * Wrapper function to refresh the viewport data.
   */
  Drupal.gentBase.refreshViewport = function() {
    if (typeof Viewport !== 'function') {
      return;
    }
    this.viewport = new Viewport();
    this.viewport.refresh();
  };

  /**
   * Detect if we are in the mobile state.
   * @returns {Boolean} Is this the mobile state?
   */
  Drupal.gentBase.isMobile = function() {
    return this.viewport.get('width') < this.BREAKPOINT_MOBILE;
  };

  /**
   * Detect if we are in the tablet state.
   * @returns {Boolean} Is this the tablet state?
   */
  Drupal.gentBase.isTablet = function() {
    var width = this.viewport.get('width');
    return width >= this.BREAKPOINT_MOBILE && width < this.BREAKPOINT_TABLET;
  };

  /**
   * Detect if we are in the desktop state.
   * @returns {Boolean} Is this the desktop state?
   */
  Drupal.gentBase.isDesktop = function() {
    return this.viewport.get('width') >= this.BREAKPOINT_TABLET;
  };

  /**
   * Refresh the viewport.
   */
  Drupal.behaviors.initViewport = {
    attach: function () {
      Drupal.gentBase.refreshViewport();
    }
  };

  /**
   * Refresh the viewport on scroll and resize.
   */
  $(window).bind('resize scroll', function () {
    Drupal.gentBase.refreshViewport();
  });

}(jQuery));
