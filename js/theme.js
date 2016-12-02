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
      jsTheme.forms.init();
      jsTheme.searchThemes.init();
      jsTheme.progressAnimator.init();
      jsTheme.accordion.init();
      jsTheme.toggleFieldset.init();
      jsTheme.addMobileBreadcrumb.init();
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
