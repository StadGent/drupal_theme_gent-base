/* global ol, drupalSettings */
/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.dgMaps = Drupal.dgMaps || {};
  Drupal.dgMaps.style = Drupal.dgMaps.style || {};

  function icon(name) {
    var path = drupalSettings.path.baseUrl + drupalSettings.gent_base.dg_maps.img_base;

    if (name) {
      switch (name) {
        case 'marker':
          return new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: path + 'map-marker.svg',
            imgSize: [68, 68]
          }));
      }
    }
  }

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
    image: icon('marker')
  });

  /**
   * Creates a Spiderfier style.
   * @return {ol.style.Style} Style.
   */
  Drupal.dgMaps.style.spiderfier = function () {
    // Support for ol.StyleFunction() callback where feature to style is the
    // first argument. (set on vector layer)
    var feature;
    if (typeof arguments[0] === 'object' && typeof arguments[0].getGeometry === 'function') {
      feature = arguments[0];
    }
    // Support for ol.FeatureStyleFunction() callback where feature to style is
    // referenced with the "this" keyword. (set on feature)
    else {
      feature = this;
    }

    var geometryType = feature.getGeometry().getType();

    switch (geometryType) {
      case 'Point':
        return new ol.style.Style({
          image: icon('marker')
        });

      case 'LineString':
      case 'MultiLineString':
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [65, 151, 145, 1],
            width: 1
          })
        });
    }
  };

  /**
   * Override Cluster style.
   *
   * @param {ol.Feature|ol.render.Feature} feature Feature.
   * @param {number} resolution Resolution.
   * @return {Array.<ol.style.Style>} Style.
   */
  Drupal.dgMaps.style.cluster = function (feature, resolution) {
    // Support for ol.StyleFunction() callback where feature to style is the
    // first argument. (set on vector layer)
    if (typeof arguments[0] === 'object' && typeof arguments[0].getGeometry === 'function') {
      feature = arguments[0];
    }
    // Support for ol.FeatureStyleFunction() callback where feature to style is
    // referenced with the "this" keyword. (set on feature)
    else {
      feature = this;
    }

    var features = feature.get('features') || [];
    var size = features.length;

    var color = '0, 125, 179';
    var radius = 20 + (size.toString().length - 1) * 4;

    return [
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          stroke: new ol.style.Stroke({
            color: 'rgba(' + color + ', 0.25)',
            width: 6
          })
        })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius - 2,
          fill: new ol.style.Fill({
            color: 'rgba(' + color + ', 1)'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          }),
          font: '600 16px "Fira Sans",sans-serif',
          textAlign: 'center',
          offsetY: '2'
        })
      })
    ];
  };

  /**
   * Override Route style.
   * @return {ol.style.Style} Style.
   */
  Drupal.dgMaps.style.route = function () {
    // Support for ol.StyleFunction() callback where feature to style is the
    // first argument. (set on vector layer)
    var feature;
    if (typeof arguments[0] === 'object' && typeof arguments[0].getGeometry === 'function') {
      feature = arguments[0];
    }
    // Support for ol.FeatureStyleFunction() callback where feature to style is
    // referenced with the "this" keyword. (set on feature)
    else {
      feature = this;
    }

    var geometryType = feature.getGeometry().getType();

    switch (geometryType) {
      case 'Point':
        return new ol.style.Style({
          image: icon('marker')
        });

      case 'LineString':
      case 'MultiLineString':
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [65, 151, 145, 1],
            width: 4
          })
        });

      case 'Polygon':
      case 'MultiPolygon':
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [65, 151, 145, 1],
            width: 2
          }),
          fill: new ol.style.Fill({
            color: [65, 151, 145, 0.5]
          })
        });
    }
  };

})(jQuery, Drupal, drupalSettings);
