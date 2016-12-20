/**
 * @file
 * Javascript for alert messages.
 */

(function ($) {

  /**
   * Alert box behavior.
   *
   * Closes the previous alert block on click.
   */
  Drupal.behaviors.alertBox = {
    attach: function (context) {
      $('.alert-box', context).once('alertBox').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.alert-box').fadeOut(300);
      });
    }
  };

})(jQuery);
