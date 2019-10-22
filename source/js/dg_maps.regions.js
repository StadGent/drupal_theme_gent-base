/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal) {
  'use strict';

  var _initRegion = Drupal.dgMaps.initRegions;

  /**
   * Performs region initialisation.
   * @param {Object} map - The map.
   * @param {jQuery} mapElement - The map container element.
   */
  Drupal.dgMaps.initRegions = function (map, mapElement) {
    _initRegion(map, mapElement);

    if (!window.matchMedia('(min-width: 769px)').matches) {
      // Close the legend by default
      var mapContainer = mapElement.parents('.map-container');
      var legendToggle = mapContainer.find('button[data-toggle-region="left"]');

      legendToggle
        .on('click', function () {
          var region = $('.' + this.getAttribute('aria-controls'));
          legendToggle.attr('aria-expanded', region.is(':visible'));
        })
        .first().click();
    }
  };
})(jQuery, Drupal);
