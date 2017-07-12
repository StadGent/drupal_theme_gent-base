/**
 * @file
 * Sticky bar & nav for for Gent base.
 */

(function ($) {

  /**
   * Make sure we have the Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  // Initialize an object for our settings.
  Drupal.gentBase.stickyNav = {};
  Drupal.gentBase.stickyNav.defaults = { topSpacing: 20 };

  /**
   * Behavior for the "Sticky nav".
   *
   * Makes all elements with the "sticky-nav" class sticky so they will be
   * attached to the viewport top when scrolling down.
   */
  Drupal.behaviors.initStickyNav = {
    attach: function (context) {
      $('.sticky-nav', context).once('sticky-nav', function () {
        $(this).sticky(Drupal.gentBase.stickyNav.defaults);
      });
    }
  };

  /**
   * Adds a sticky wrapper containing the admin bar and other elements.
   *
   * This avoids overlap between the admin_menu bar and another sticky bar. In
   * some extending themes a blue bar with secondary links is used and
   * positioned beneath the admin menu bar.
   */
  $(document).ready(function () {
    var selector = 'body > .sticky, body > #admin-menu';

    var callback = function () {
      var elements = $(selector);
      var wrapper = $('#sticky-wrapper-admin');
      var spacer = $('#sticky-spacer');
      var height = 0;

      if (elements.length) {
        // Add the wrapper and spacer if missing.
        if (!wrapper.length) {
          wrapper = $('<div>')
            .attr('id', 'sticky-wrapper-admin')
            .css({
              width: '100%',
              position: 'fixed',
              top: '0px',
              left: '0px',
              'z-index': 999
            });

          spacer = $('<div>')
            .attr('id', 'sticky-spacer');

          $('body')
            .prepend(wrapper)
            .prepend(spacer);
        }

        // Move the new elements.
        wrapper.append(
          elements
            .clone()
            .css('position', 'static')
        );
        elements.remove();

        // Resort the content.
        wrapper.append(
          wrapper.children().sort(function (a, b) {
            a = a.className.match(/sticky-(\d+)/) || [0];
            a = parseInt(a[a.length - 1], 10);

            b = b.className.match(/sticky-(\d+)/) || [0];
            b = parseInt(b[b.length - 1], 10);

            return a - b;
          })
        );
      }

      if (!wrapper.children().length) {
        // No wrapper children left, remove our divs.
        wrapper.remove();
        spacer.remove();
      }
      else {
        // Calculate and set the height.
        wrapper.children().each(function () {
          height += $(this).outerHeight();
        });

        spacer.css('height', height + 'px');
      }
    };

    $(selector + ', #sticky-wrapper > *').livequery(callback, callback);
    callback();
  });

}(jQuery));
