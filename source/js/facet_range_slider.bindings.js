/**
 * @file
 * Facet range slider component binding.
 */
(function ($, Drupal, once) {

  /**
   * Override facet slider behavior
   */
  Drupal.behaviors.facet_slider = {
    attach: function (context, settings) {
      if (typeof settings.facets !== 'undefined' && typeof settings.facets.sliders !== 'undefined') {
        var self = this;

        $.each(settings.facets.sliders, function (facet, settings) {
          self.addUrlFragment(facet, settings);

          if (Drupal.facets && typeof Drupal.facets.addSlider === 'function') {
            Drupal.facets.addSlider(facet, settings);
          }
        });

        this.updateCopy(context);
      }
    },

    /**
     * Add suffix to links inside modals to re-open them when the page reloads
     *
     * @param {string} facet
     *  Id of the facet that should be altered.
     * @param {object} settings
     *  Settings object that contains the URL that should be altered.
     */
    addUrlFragment: function (facet, settings) {
      settings = settings || {};
      if (!settings.url) {
        return;
      }

      var $facet = document.querySelector('[id*="' + facet + '"]');
      if (!$facet) {
        return;
      }

      var $modal = $facet.closest('.modal');
      if (!$modal) {
        return;
      }

      settings.url = settings.url.split('#')[0];
      settings.url += '#' + $modal.id;
    },

    /**
     * Update copy dynamically when the user changes the value of the slider.
     *
     * @param {HTMLElement|Document} context
     *  The DOM context within which to operate. This is typically passed by
     *  Drupal.attachBehaviors() and is either `document` or an element updated
     *  via AJAX.
     */
    updateCopy: function (context) {
      $('.facets-widget-range_slider', context).each(function () {
        const $widget = $(this);
        const $slider = $widget.find('.facet-slider');
        const $minPip = $widget.find('.pips-preview .placeholder:first-of-type');
        const $maxPip = $widget.find('.pips-preview .placeholder:last-of-type');

        // Set initial values if the slider is initialized.
        if ($slider.length && $slider.slider('instance')) {
          const values = $slider.slider('values');
          $minPip.text(values[0]);
          $maxPip.text(values[1]);
        }

        // Bind once to update values on slide.
        $(once('facet-range-slider', $slider)).on('slide', function (event, ui) {
          const $self = $(this);
          const $widget = $self.closest('.facets-widget-range_slider');
          $widget.find('.pips-preview .placeholder:first-of-type').text(ui.values[0]);
          $widget.find('.pips-preview .placeholder:last-of-type').text(ui.values[1]);
        });
      });
    }
  };

})(jQuery, Drupal, once);
