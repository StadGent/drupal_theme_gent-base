/* global ol */
/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal) {
  'use strict';

  var originalPrototype = Drupal.dgMaps.ol.control.DataLayerSwitcher.prototype;

  /**
   * Override dgMaps DataLayerSwitcher
   */
  Drupal.dgMaps.ol.control.DataLayerSwitcher = function (opt_options) {
    var options = opt_options || {};

    /**
     * The categories definitions.
     * @private
     * @type {Object}
     */
    this.categories_ = typeof options.categories !== 'undefined' ? options.categories : [];

    /**
     * The url to the group layer icon.
     * @private
     * @type {string}
     */
    this.layerGroupIcon_ = typeof options.layerGroupIcon !== 'undefined' ? options.layerGroupIcon : void 0;

    /**
     * The layer legend.
     * @private
     * @type {Object}
     */
    this.legend_ = typeof options.legend !== 'undefined' ? options.legend : {};

    var element = document.createElement('div');
    element.className = 'ol-data-layer-switcher ' + ol.css.CLASS_SELECTABLE + ' ' + ol.css.CLASS_CONTROL;
    

    var title = drupalSettings.gent_base.dg_maps.legend_title;

    if (title) {
      this.title = document.createElement('h2');
      this.title.textContent = title;

      this.toggle = document.createElement('button');
      this.toggle.setAttribute('data-toggle-region', 'left');
      this.iconIcon = document.createElement('i');
      this.iconIcon.className = "icon-chevron-left";
      this.toggle.appendChild(this.iconIcon);
      this.title.appendChild(this.toggle);
      element.appendChild(this.title);
    }

    this.panel = document.createElement('div');
    this.panel.className = 'ol-panel';
    element.appendChild(this.panel);

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });

  };

  Drupal.dgMaps.ol.control.DataLayerSwitcher.prototype = originalPrototype;

})(jQuery, Drupal);

