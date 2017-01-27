/**
 * @file
 * The Gent Base theme global javascript file.
 *
 * Any Javascript that has a general purpose belongs here.
 */

(function ($) {

  /**
   * The Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  // Register, for backwards compatibility with Drupal's default jQuery version,
  // $.on as alias of $.live.
  if (typeof $.fn.on === 'undefined') {
    jQuery.fn.extend({
      on: jQuery.fn.live
    });
  }

  /**
   * Extends the expression selector : with a position filter.
   */
  $.extend($.expr[':'], {
    absolute: function (el) {
      return $(el).css('position') === 'absolute';
    },
    relative: function (el) {
      return $(el).css('position') === 'relative';
    },
    static: function (el) {
      return $(el).css('position') === 'static';
    },
    fixed: function (el) {
      return $(el).css('position') === 'fixed';
    }
  });

})(jQuery);
