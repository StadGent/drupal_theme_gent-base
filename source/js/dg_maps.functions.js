/* global ol, drupalSettings */
/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal) {
  'use strict';

  var originalPrototype = Drupal.dgMaps.ol.control.DataLayerSwitcher.prototype;

  /**
   * Override dgMaps DataLayerSwitcher
   *
   * @param {Object} opt_options
   *  An object with options for the data layer switcher.
   */
  Drupal.dgMaps.ol.control.DataLayerSwitcher = function (opt_options) {
    var options = opt_options || {};

    /**
     * The categories definitions.
     *
     * @private
     * @type {Object}
     */
    this.categories_ = typeof options.categories !== 'undefined' ? options.categories : [];

    /**
     * The url to the group layer icon.
     *
     * @private
     * @type {string}
     */
    this.layerGroupIcon_ = typeof options.layerGroupIcon !== 'undefined' ? options.layerGroupIcon : void 0;

    /**
     * The layer legend.
     *
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
      this.iconIcon.className = 'icon-chevron-left';
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

  /**
   * Renders a data layer as list item.
   *
   * @param {ol.layer.Layer} layer Layer to be rendered.
   * @return {Element} The layer as list item.
   * @private
   */
  originalPrototype.renderLayer_ = function (layer) {
    var layerId = layer.get('id');

    var li = document.createElement('li');
    li.className = 'layer layer-' + layerId;

    var lyrId = Drupal.dgMaps.uuid();

    var inputWrapper = document.createElement('div');
    inputWrapper.className = 'checkbox';

    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = lyrId;
    input.checked = layer.get('visible');
    input.onchange = function (e) {
      this.setVisible_(layer, e.target.checked);
    }.bind(this);
    input.setAttribute('data-layer-id', layerId);
    inputWrapper.appendChild(input);

    // TODO grey out layers which are not in range (not visible in extent).
    // TODO also add event to check if changes.

    var label = document.createElement('label');
    label.htmlFor = lyrId;
    label.innerHTML = layer.get('title');
    inputWrapper.appendChild(label);

    li.appendChild(inputWrapper);

    // Add layer legend icon(s).
    // If more than one, add group icon + icon list.
    // If single, add icon to layer label & skip icon description.
    var legendData = this.getLegend(layerId);
    if (legendData.length > 0) {
      // Always use the group legend item icon to prepend it to the layer label.
      var layerIcon = (legendData.length === 1) ? legendData[0] : this.layerGroupIcon_;

      var legendIcon = document.createElement('img');
      legendIcon.className = 'layer__icon';
      legendIcon.src = layerIcon.url;
      legendIcon.alt = layerIcon.label ? layerIcon.label : '';
      label.insertBefore(legendIcon, label.firstChild);

      // Add the rest of the legend items to a child container.
      if (legendData.length > 1) {
        var legendContainer = document.createElement('div');
        legendContainer.className = 'legend';

        for (var j = 0; j < legendData.length; j++) {
          var legendItemContainer = document.createElement('div');
          legendItemContainer.className = 'legend__item';
          legendContainer.appendChild(legendItemContainer);

          var legendItemIcon = document.createElement('img');
          legendItemIcon.className = 'legend__item__icon';
          legendItemIcon.src = legendData[j].url;
          legendItemIcon.alt = legendData[j].label ? legendData[j].label : '';
          legendItemContainer.appendChild(legendItemIcon);

          var legendItemLabel = document.createElement('span');
          legendItemIcon.className = 'legend__item__label';
          legendItemLabel.innerHTML = legendData[j].label ? legendData[j].label : '';
          legendItemContainer.appendChild(legendItemLabel);
        }

        li.appendChild(legendContainer);
      }
    }

    return li;
  };

  Drupal.dgMaps.ol.control.DataLayerSwitcher.prototype = originalPrototype;

  var _initRegion = Drupal.dgMaps.initRegions;

  /**
   * Performs region initialisation.
   * @param {Object} map - The map.
   * @param {jQuery} mapElement - The map container element.
   */
  Drupal.dgMaps.initRegions = function (map, mapElement) {
    _initRegion(map, mapElement);

    // Close the legend by default
    var mapContainer = mapElement.parents('.map-container');
    mapContainer.find('button[data-toggle-region="left"]').first().click();
  };


  /**
   * Override Icon style.
   */
  Drupal.dgMaps.style.icon = new ol.style.Style({
    geometry: function (feature) {
      var geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        return feature.getGeometry();
      }

      var center = ol.extent.getCenter(feature.getGeometry().getExtent());
      return new ol.geom.Point(center);
    },
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: drupalSettings.path.baseUrl + drupalSettings.gent_base.dg_maps.img_base + 'map-marker.svg',
      size: [44, 44],
      imgSize: [44, 44],
      scale: .9
    }))
  });

})(jQuery, Drupal);
