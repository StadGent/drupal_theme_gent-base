/* global ol */
/**
 * @file
 * DG Maps functionality extensions.
 */
(function ($, Drupal) {
  'use strict';

  if (!Drupal.dgMaps.ol.control.BaseLayerSwitcher) {
    return;
  }

  var originalPrototype = Drupal.dgMaps.ol.control.BaseLayerSwitcher.prototype;

  /**
   * Base Layer Switcher control.
   *
   * @constructor
   * @extends {ol.control.Control}
   * @param {Object=} opt_options Control options.
   */
  Drupal.dgMaps.ol.control.BaseLayerSwitcher = function (opt_options) {
    var options = opt_options || {};

    this.hiddenClassName = 'ol-base-layer-switcher ol-unselectable ol-control';
    this.shownClassName = 'shown';

    var element = document.createElement('div');
    element.className = this.hiddenClassName;

    this.button = document.createElement('button');
    this.button.setAttribute('title', Drupal.t('Legend'));
    element.appendChild(this.button);

    this.panel = document.createElement('div');
    this.panel.className = 'selection';
    element.appendChild(this.panel);

    var this_ = this;

    this.button.onmouseover = function () {
      this_.showPanel();
    };

    this_.panel.onmouseout = function (e) {
      e = e || window.event;
      if (!this_.panel.contains(e.toElement || e.relatedTarget)) {
        this_.hidePanel();
      }
    };

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });
  };

  /**
   * Render a base layer as list item.
   * @param {ol.layer.Layer} layer Layer to be rendered.
   * @return {Element} The layer as list item.
   * @private
   */
  originalPrototype.renderLayer_ = function (layer) {
    var li = document.createElement('li');
    li.className = 'layer layer-' + layer.get('id');

    var lyrId = Drupal.dgMaps.uuid();

    var input = document.createElement('input');
    input.type = 'radio';
    input.name = 'base';
    input.id = lyrId;
    input.checked = layer.get('visible');
    input.onchange = function (e) {
      this.setVisible_(layer, e.target.checked);
      this.hidePanel();
    }.bind(this);
    li.appendChild(input);

    var label = document.createElement('label');
    label.htmlFor = lyrId;
    label.innerHTML = layer.get('title');
    label.title = layer.get('title');
    li.appendChild(label);

    return li;
  };

  Drupal.dgMaps.ol.control.BaseLayerSwitcher.prototype = originalPrototype;
})(jQuery, Drupal);
