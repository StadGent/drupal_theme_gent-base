/**
 * @file
 * Contains mobile-friendly search widget.
 */
(function ($) {

  /**
   * Mobile-friendly search widget class.
   *
   * @param {Object} selector
   *   The DOM element where to apply the search widget too.
   */
  function SearchWidget(selector) {
    this.selector = selector;
    this.form = null;
    this.input = null;
    this.button = null;
    this.openHandler = null;
    this.closeHandler = null;
  }

  /**
   * Initialises the search widget.
   */
  SearchWidget.prototype.init = function () {
    var widget = this;

    this.form = $(this.selector);
    this.input = $('.search-widget__input', this.selector);
    this.button = $('.search-widget__submit', this.selector);

    // Prevent submitting the form twice.
    this.button.click(function () {
      widget.button.attr('disabled', 'disabled');
      widget.form.submit();
    });

    this.openHandler = $('.search-widget__open_handle', this.selector);
    this.openHandler.click(function () {
      widget.open();
    });

    this.closeHandler = $('.search-widget__close_handle', this.selector);
    this.closeHandler.click(function () {
      widget.close();
    });
  };

  /**
   * Opens the search widget.
   */
  SearchWidget.prototype.open = function () {
    this.form.addClass('is-open');
    this.openHandler.hide();
    this.closeHandler.show();
    this.input.show();
    this.button.show();
  };

  /**
   * Closes the opened search widget.
   */
  SearchWidget.prototype.close = function () {
    this.form.removeClass('is-open');
    this.closeHandler.hide();
    this.input.hide();
    this.button.hide();
    this.openHandler.show();
  };

  /**
   * Adds mobile behavior for search widget in header.
   */
  Drupal.behaviors.GentBaseMobileSearch = {
    attach: function (context) {
      $('.small-header .search-widget', context).once('mobile', function () {
        var widget = new SearchWidget(this);
        widget.init();
      });
    }
  };

}(jQuery));
