/**
 * @file
 * Breadcrumb handling.
 */

(function ($) {

  /**
   * Behavior that adds a mobile breadcrumb.
   *
   * The mobile breadcrumb is a select with the normal parts as option.
   */
  Drupal.behaviors.mobileBreadcrumb = {
    attach: function (context) {
      $('ul.nav--breadcrumb', context).once('mobile-breadcrumb', function () {
        var $breadcrumb = $(this);
        var $mobile_breadcrumb = $('<select />').addClass('nav nav--mobile-breadcrumb');
        $mobile_breadcrumb.change(function () {
          window.location = $(this).val();
        });
        var $items = $('li', $breadcrumb);
        $.each($items, function (index, value) {
          var link = $('a', value).attr('href');
          var prefix = new Array(index + 1).join('-');
          var text = prefix ? (prefix + ' ' + $(value).text()) : $(value).text();
          var last_item = (index + 1 === $items.length);
          if (typeof link === 'undefined' && last_item) {
            link = window.location.href.replace(/^(?:\/\/|[^\/]+)*\//, '/');
            $mobile_breadcrumb.append($('<option />').val(link).text(text));
          }
          else if (typeof link === 'undefined' && !last_item) {
            $mobile_breadcrumb.append($('<option />').attr('disabled', 'disabled').text(text));
          }
          else {
            $mobile_breadcrumb.append($('<option />').val(link).text(text));
          }
        });

        $mobile_breadcrumb.find('option:last').attr('selected', 'selected');
        $breadcrumb.after($mobile_breadcrumb);
      });
    }
  };

})(jQuery);
