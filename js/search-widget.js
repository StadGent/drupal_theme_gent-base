/**
 * @file
 * Contains mobile-friendly search widget.
 */
(function ($) {
  /**
   * Mobile breakpoint in pixels.
   * @type {number}
   */
  var GENT_BASE_BP_MOBILE = 640;

  /**
   * Viewport class to extract viewport's width and/or height.
   * @type {Viewport}
   */
  var viewport = new Viewport();

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

  // Clearable input
  function tog(v){
    return v?'addClass':'removeClass';
  }
  $(document).on('input', '.search-widget__input', function(){
    $(this)[tog(this.value)]('x');
  }).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
  }).on('touchstart click', '.onX', function( ev ){
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
  });

  /**
   * Initialises the search widget.
   */
  SearchWidget.prototype.init = function () {
    var widget = this;

    this.form = $(this.selector);
    this.input = $('.search-widget__input', this.selector);
    this.button = $('.search-widget__submit', this.selector);

    // Prevent submitting the form twice.
    this.button.removeAttr('disabled').click(function () {
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
    $('body').addClass('search-widget--is-open');

    this.openHandler.hide();
    this.closeHandler.show();
    this.input.show();
    this.input.focus();
    this.button.show();
  };

  /**
   * Closes the opened search widget.
   */
  SearchWidget.prototype.close = function () {
    this.form.removeClass('is-open');
    $('body').removeClass('search-widget--is-open');

    this.closeHandler.css('display', '');
    this.input.css('display', '');
    this.input.blur();
    this.button.css('display', '');
    this.openHandler.css('display', '');
  };

  /**
   * Adds mobile behavior for search widget in header.
   */
  Drupal.behaviors.GentBaseMobileSearch = {
    attach: function (context) {
      $('.small-header .search-widget', context).once('mobile', function () {
        var searchWidget = this;
        var widget = new SearchWidget(searchWidget);
        widget.init();

        $(window).resize(function() {
          viewport.refresh();

          if($(searchWidget).hasClass('is-open') && viewport.get('width') >= GENT_BASE_BP_MOBILE) {
            widget.close();
          }
        });
      });
    }
  };

}(jQuery));
