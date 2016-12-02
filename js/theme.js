/**
 * @file
 * The Gent Base theme global javascript file.
 */

(function ($) {

  /**
   * The Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  // Register, for backwards compatibility with Drupal's default jQuery version,
  // $.on as alias of $.live.
  if (typeof $.fn.on === 'undefined') {
    jQuery.fn.extend({
      on: jQuery.fn.live
    });
  }

  /**
   *
   */
  Drupal.behaviors.gentBaseBehavior = {
    attach: function (context) {
      $('.ajax-new-content', context).once('gent-base', function () {
        //webformDescriptionRight();
        //webformStickyBottom();
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.init}}
   */
  var jsTheme = {
    init: function () {
      jsTheme.lib.init();
      jsTheme.sticky.init();
      jsTheme.forms.init();
      jsTheme.searchThemes.init();
      jsTheme.equalColumns.init();
      jsTheme.progressAnimator.init();
      jsTheme.accordion.init();
      jsTheme.toggleFieldset.init();
      jsTheme.addMobileBreadcrumb.init();
      jsTheme.stickyNav.init();
    }
  };

  /**
   *
   * @type {{init: jsTheme.lib.init}}
   */
  jsTheme.lib = {
    init: function () {
      if (typeof $.fn.matchHeight !== 'undefined') {
        $('.js-height').matchHeight();
        $('.js-equal').matchHeight(false);
      }
    }
  };

  /**
   *
   * @type {{init: jsTheme.sticky.init}}
   */
  jsTheme.sticky = {
    init: function () {
      var selector = 'body > .sticky, body > #admin-menu';

      var callback = function () {
        var elements = $(selector);
        var wrapper = $('#sticky-wrapper');
        var spacer = $('#sticky-spacer');
        var height = 0;

        if (elements.length) {
          // Add the wrapper and spacer if missing.
          if (!wrapper.length) {
            wrapper = $('<div>')
              .attr('id', 'sticky-wrapper')
              .css({
                width: '100%',
                position: 'fixed',
                top: '0px',
                left: '0px',
                'z-index': 999
              });

            spacer = $('<div>')
              .attr('id', 'sticky-spacer');

            $('body')
              .prepend(wrapper)
              .prepend(spacer);
          }

          // Move the new elements.
          wrapper.append(
            elements
              .clone()
              .css('position', 'static')
          );
          elements.remove();

          // Resort the content.
          wrapper.append(
            wrapper.children().sort(function (a, b) {
              a = a.className.match(/sticky-(\d+)/) || [0];
              a = parseInt(a[a.length - 1], 10);

              b = b.className.match(/sticky-(\d+)/) || [0];
              b = parseInt(b[b.length - 1], 10);

              return a - b;
            })
          );
        }

        if (!wrapper.children().length) {
          // No wrapper children left, remove our divs.
          wrapper.remove();
          spacer.remove();
        }
        else {
          // Calculate and set the height.
          wrapper.children().each(function () {
            height += $(this).outerHeight();
          });

          spacer.css('height', height + 'px');
        }
      };

      $(selector + ', #sticky-wrapper > *').livequery(callback, callback);
      callback();
    }
  };

  /**
   *
   * @type {{init: jsTheme.forms.init}}
   */
  jsTheme.forms = {
    init: function () {
      $('.alert-box').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.alert-box').fadeOut(300);
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.searchThemes.init}}
   */
  jsTheme.searchThemes = {
    init: function () {
      // Open list of themes
      $('.search-filter-theme-title a').click(function (e) {
        e.preventDefault();
        $('.facetapi-facet-theme > ul').fadeToggle('fast');
        $(this).children('span.icon').toggleClass('icon-arrow-down icon-arrow-up');
      });

      // On Mobile open list of types and themes
      $('.search-filter-toggle-btn').click(function (e) {
        e.preventDefault();
        $('.search-filter > div').slideToggle();
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.equalColumns.init}}
   */
  jsTheme.equalColumns = {
    init: function () {
      // Get all columns and set them to equal height
      var tallest = 0;
      if ($(window).width() > 480) {
        var columns = $('.equal-columns .col-equal');
        columns.each(function () {
          var thisHeight = $(this).height();
          if (thisHeight > tallest) {
            tallest = thisHeight;
          }
        });
        columns.height(tallest);
      }
    }
  };

  /**
   *
   * @type {{init: jsTheme.progressAnimator.init}}
   */
  jsTheme.progressAnimator = {
    init: function () {
      // Animate the width of progress indicators
      $('.progress-indicator').each(function () {
        var targetWidth = $(this).data('percentage');
        var duration = targetWidth * 30;
        $(this).animate({
          width: targetWidth + '%'
        }, duration, 'linear');
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.accordion.init}}
   */
  jsTheme.accordion = {
    init: function () {
      // Code for simple accordion animations
      $('.accordion').each(function () {
        // Close all contents except the first
        $('.accordion-item-content', this).hide();
        var activeItem = $('.accordion-item:first', this);
        activeItem.find('.accordion-item-content').show();
        activeItem.addClass('active').find('.accordion-item-title span').toggleClass('icon-arrow-down icon-arrow-up');

        // Now toggle items on click
        $('.accordion-item-title a', this).click(function (e) {
          e.preventDefault();
          var currentItem = $(this).parents('.accordion-item');

          if (currentItem.hasClass('active')) {
            currentItem.removeClass('active');
            currentItem.find('.accordion-item-content').slideUp('slow');
            currentItem.find('.accordion-item-title span').toggleClass('icon-arrow-up icon-arrow-down');
          }
          else {
            currentItem.addClass('active');
            currentItem.find('.accordion-item-content').slideDown('slow');
            currentItem.find('.accordion-item-title span').toggleClass('icon-arrow-down icon-arrow-up');
          }
        });
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.toggleFieldset.init}}
   */
  jsTheme.toggleFieldset = {
    init: function () {
      $('fieldset.collapsible').on('collapsed', function (e) {
        var $fieldset = $(this);

        // Remove previous icons.
        $('.icon-collapsed, .icon-collapsible', $fieldset).remove();

        // Add new icon based on collapsed state.
        if (e.value) {
          $('.fieldset-legend', $fieldset).append('<span class="icon-collapsed"></span>');
        }
        else {
          $('.fieldset-legend', $fieldset).append('<span class="icon-collapsible"></span>');
        }
      });
    }
  };

  /**
   * Creates a mobile breadcrumb as a <select> with <option>s via javascript, based on the printed breadcrumb.
   *   - Dashes will be added per depth level.
   *   - The last option will have current url.
   *   - Each crumb which have no link will be added as disabled option.
   *
   * @type {{init: jsTheme.addMobileBreadcrumb.init}}
   */
  jsTheme.addMobileBreadcrumb = {
    init: function () {

      var breadcrumb = $('ul.nav--breadcrumb');
      breadcrumb.once('mobile-breadcrumb', function () {
        var mobile_breadcrumb = $('<select class="nav nav--mobile-breadcrumb" onchange="window.location=this.value;" />');

        var items = $('li', this);
        $.each(items, function (index, value) {
          var link = $('a', value).attr('href');
          var prefix = new Array(index + 1).join('-');
          var text = prefix ? (prefix + ' ' + $(value).text()) : $(value).text();

          var last_item = (index + 1 === items.length);
          if (typeof link === 'undefined' && last_item) {
            link = window.location.href.replace(/^(?:\/\/|[^\/]+)*\//, '/');
            mobile_breadcrumb.append('<option value="' + link + '">' + text + '</option>');
          }
          else if (typeof link === 'undefined' && !last_item) {
            mobile_breadcrumb.append('<option disabled="disabled">' + text + '</option>');
          }
          else {
            mobile_breadcrumb.append('<option value="' + link + '">' + text + '</option>');
          }
        });

        mobile_breadcrumb.find('option:last').attr('selected', 'selected');
        breadcrumb.after(mobile_breadcrumb);
      });
    }
  };

  /**
   * Makes all elements with "sticky-nav" class sticky so they will be attached to the viewport top when scrolling down.
   */
  jsTheme.stickyNav = {};
  jsTheme.stickyNav.defaults = { topSpacing: 20 };
  jsTheme.stickyNav.init = function () {
    if ($('.sticky-nav').length > 0) {
      $('.sticky-nav').once('sticky-nav', function () {
        $(this).sticky(jsTheme.stickyNav.defaults);
      });
    }
  };

  /**
   *
   */
  function stikyWidth() {
    if (Drupal.gentBase.isDesktop()) {
      var old_width = $('#block-system-main .view-mode-full .l-secondary').width();
      $('.field-group-accordion').width(old_width);
    }
    else {
      $('.field-group-accordion').width('auto');
    }
  }

  /**
   *
   */
  function positionCategorieDropdown() {
    var page_title = $('#page-title');
    var current = $('.current', page_title);
    var selector = $('.selector', current);
    var list = selector.children('ul');
    var title_span = $('.title-span', page_title);

    var left_margin =  list.width() / 2;
    var free_width = page_title.width() - title_span.width();

    if (free_width >= left_margin) {
      list.css('margin-left', '-' + left_margin + 'px');
    }
    else {
      var dropdown_position = (left_margin * 2) - free_width;
      list.css('margin-left', '-' + dropdown_position + 'px');
    }
  }

  /**
   *
   */
  function categorieAction() {
    var current = $('#page-title .current');
    var selector = $('.selector', current);
    var list = selector.children('ul');

    if (!Drupal.gentBase.isMobile()) {
      selector.addClass('initial');
      current.unbind().click(function () {
        selector.removeClass('initial');
        // Show or hide dropdown.
        list.toggle();
        if (selector.hasClass('close')) {
          selector.removeClass('close').addClass('open');
        }
        else {
          selector.removeClass('open').addClass('close');
        }
      });
    }
    // On mobile, remove click event & open/close states.
    else {
      current.unbind();
      selector.removeClass('close open');
      list.hide();
    }

    if (selector.hasClass('close') && !Drupal.gentBase.isMobile()) {
      list.show();
    }
  }

  /**
   *
   */
  function progressbarStickyWidth() {
    var webform = $('.webform-client-form');
    if (webform.length) {
      var webform_left = $('.node-type-webform .webform-left');
      var sticky_nav = $('.sticky-nav', webform_left);

      // On desktop: Disable the stickiness & set width.
      if (Drupal.gentBase.isDesktop()) {
        sticky_nav.width(webform_left.width());
        sticky_nav.once('sticky-nav').sticky(jsTheme.stickyNav.defaults);

      }
      // On mobile: Re-enable the stickiness & reset widths..
      else {
        sticky_nav.width('auto');
        $('.node-type-webform .webform-left .sticky-wrapper').height('auto');

        // Re-enable the stickiness.
        sticky_nav.removeClass('sticky-nav-processed').unstick();
      }
    }
  }

  /**
   *
   */
  function webformDescriptionRight() {
    var webform = $('.webform-client-form');
    if (webform.length) {
      var webform_right = $('.node-type-webform .webform-right');
      var description_width = webform_right.width() * 0.75;
      var description = $('.description', webform_right);
      var webform_components = $('.webform-component', webform_right);

      // On desktop.
      if (Drupal.gentBase.isDesktop()) {
        description.width(description_width);
        webform_components.each(function () {
          var webform_description_height = $(this).find('.description').height();
          var label_height = $(this).find('label').outerHeight();
          var webform_component_height =  webform_description_height + label_height;
          $(this).css('min-height', webform_component_height);
        });
      }
      // On mobile.
      else {
        description.width('auto');
        webform_components.css('min-height', 'auto');
      }
    }
  }

  /**
   *
   */
  function webformStickyBottom() {
    if (Drupal.gentBase.isDesktop()) {
      var webform = $('.webform-client-form');
      if (webform.length) {
        var sticky_nav = $('.sticky-nav.sticky-nav-processed', webform);
        if (sticky_nav.length) {
          var progress_bar = $('.webform-component-progressbar-pages');
          var document = $(document);
          var bottom_sticky_to_bottom_screen = document.height() - progress_bar.offset().top - progress_bar.height();
          var bottom_webform_to_bottom_screen = document.height() - webform.offset().top - webform.height();
          if (bottom_sticky_to_bottom_screen <=  bottom_webform_to_bottom_screen) {
            sticky_nav.css('bottom', bottom_webform_to_bottom_screen);
            sticky_nav.css('top', 'auto');
          }
        }
      }
    }
  }

  // Initialize the theme.
  $(jsTheme.init);

  /**
   * Add actions on ready event.
   */
  $(document).ready(function () {
    stikyWidth();
    progressbarStickyWidth();
    webformDescriptionRight();
    webformStickyBottom();
    categorieAction();
    positionCategorieDropdown();
  });

  /**
   * Add actions on resize event.
   */
  $(window).resize(function () {
    stikyWidth();
    progressbarStickyWidth();
    webformDescriptionRight();
    webformStickyBottom();
    categorieAction();
    positionCategorieDropdown();
  });




  /**
   * Add actions on scroll event.
   */
  $(window).scroll(function () {
    webformStickyBottom();
  });


  /**
   * Extends the expression selector : with a position filter.
   */
  $.extend($.expr[':'], {
    absolute: function (el) {
      return $(el).css('position') === 'absolute';
    },
    relative: function (el) {
      return $(el).css('position') === 'relative';
    },
    static: function (el) {
      return $(el).css('position') === 'static';
    },
    fixed: function (el) {
      return $(el).css('position') === 'fixed';
    }
  });

})(jQuery);
