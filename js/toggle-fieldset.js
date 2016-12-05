/**
 * @file
 * Sets up the fieldset toggling.
 */

(function ($) {

  /**
   * Behavior that adds a toggle action on a fieldset.
   */
  Drupal.behaviors.toggleFieldset = {
    attach: function (context) {
      $('fieldset.collapsible', context).on('collapsed', function (e) {
        var $fieldset = $(this);

        // Remove previous icons.
        $('.icon-collapsed, .icon-collapsible', $fieldset).remove();

        // Add new icon based on collapsed state.
        if (e.value) {
          $('.fieldset-legend', $fieldset)
            .append('<span class="icon-collapsed"></span>');
        }
        else {
          $('.fieldset-legend', $fieldset)
            .append('<span class="icon-collapsible"></span>');
        }
      });
    }
  };

})(jQuery);
