/* global Mustache */
/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal) {
  'use strict';

  if (!Drupal.dgMaps.ol.interaction.Popup) {
    return;
  }

  /**
   * Adds a feature as popup item to the internal popup items storage.
   * @param {ol.Feature} feature The feature to add.
   * @param {string} layerId The layer id the feature is from.
   * @api
   */
  Drupal.dgMaps.ol.interaction.Popup.prototype.addFeature = function (feature, layerId) {
    var features = feature.get('features');
    if (typeof features === 'undefined') {
      features = [feature];
    }

    var template;
    var title;
    var description;

    for (var i = 0; i < features.length; i++) {
      title = this.getTitleTemplateOutput_(features[i], layerId);
      description = this.getDescriptionTemplateOutput_(features[i], layerId);

      if (!title && !description) {
        continue;
      }

      template = '<div class="ol-popup-item">';

      if (title) {
        template += '<div class="ol-popup__title">' + title + '</div>';
      }

      if (description) {
        template += '<div class="ol-popup__description">' + description + '</div>';
      }

      template += '</div>';
      this.info_.push(Mustache.render(template, features[i].getProperties()));
    }
  };

  /**
   * Shows the popup element.
   * @param {ol.Coordinate} coordinate Coordinates.
   * @private
   */
  var originalFunction = Drupal.dgMaps.ol.interaction.Popup.prototype.openPopup_;
  Drupal.dgMaps.ol.interaction.Popup.prototype.openPopup_ = function (coordinate) {
    originalFunction.apply(this, arguments); // Execute the module's function.

    // Make sure the popup isn't bigger than the map viewport
    this.popupContainer_.style.maxHeight = this.map_.viewport_.clientHeight + 'px';

    // When the bottom of the popup is not in the viewport, scroll down.
    this.popupContainer_.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  };

  /**
   * Handler for `touchmove`.
   * This stops propagation for the touch event here.
   * See https://github.com/openlayers/openlayers/issues/5242
   *
   * Touch scrolling in an overlay is prevented by ol.pointer.TouchSource.prototype.touchmove.
   * If the overlay has set the style properties max-height and overflow: auto,
   * the overlay is not scrollable on touch devices (iOS, Android, Chrome Dev Tools)
   *
   * @param {Event} inEvent The in event.
   */
  ol.pointer.TouchSource.prototype.touchmove = function (inEvent) { // eslint-disable-line no-undef
    inEvent.stopPropagation();
  };
})(jQuery, Drupal);
