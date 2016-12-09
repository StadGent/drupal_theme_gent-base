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
   * Alert box behavior.
   */
  Drupal.behaviors.gentBaseAlertBox = {
    attach: function (context) {
      $('.alert-box', context).once('alertBox').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.alert-box').fadeOut(300);
      });
    }
  };

  /**
   *
   * @type {{init: jsTheme.init}}
   */
  var jsTheme = {
    init: function () {
      jsTheme.searchThemes.init();
      jsTheme.progressAnimator.init();
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

  // Initialize the theme.
  $(jsTheme.init);

  /**
   * Add actions on ready event.
   */
  $(document).ready(function () {
    stikyWidth();
    categorieAction();
    positionCategorieDropdown();
  });

  /**
   * Add actions on resize event.
   */
  $(window).resize(function () {
    stikyWidth();
    categorieAction();
    positionCategorieDropdown();
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
