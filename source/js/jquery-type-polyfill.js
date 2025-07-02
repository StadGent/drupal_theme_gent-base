/**
 * @file
 * Adds back $.type, removed in jQuery 4. Needed by legacy plugins like slider
 * pips. In our case specifically needed for Drupal Facets range slider.
 */

(function ($) {
  if (typeof window.jQuery === 'undefined') {
    // jQuery not yet available — do nothing.
    return;
  }

  if (typeof $.type !== 'function') {
    $.type = function (obj) {
      return Object.prototype.toString.call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
    };
  }
})(window.jQuery);
