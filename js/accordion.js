/**
 * @file
 * Simple accordion animation.
 */

(function ($) {

  /**
   * Behavior for the accordion.
   */
  Drupal.behaviors.accordion = {
    attach: function (context) {
      $('.accordion', context).each(function () {
        // Close all contents except the first.
        $('.accordion-item-content', this).hide();
        var $activeItem = $('.accordion-item:first', this);
        $activeItem.find('.accordion-item-content').show();
        $activeItem.addClass('active')
          .find('.accordion-item-title span')
          .toggleClass('icon-arrow-down icon-arrow-up');

        // Now toggle items on click.
        $('.accordion-item-title a', this).click(function (e) {
          e.preventDefault();
          var $currentItem = $(this).parents('.accordion-item');

          if ($currentItem.hasClass('active')) {
            $currentItem.removeClass('active');
            $currentItem.find('.accordion-item-content').slideUp('slow');
            $currentItem.find('.accordion-item-title span')
              .toggleClass('icon-arrow-up icon-arrow-down');
          }
          else {
            $currentItem.addClass('active');
            $currentItem.find('.accordion-item-content').slideDown('slow');
            $currentItem.find('.accordion-item-title span')
              .toggleClass('icon-arrow-down icon-arrow-up');
          }
        });
      });
    }
  };

});
