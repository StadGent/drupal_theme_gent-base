(function ($) {

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
    }
  };

  jsTheme.lib = {
    init: function () {
      if (typeof $.fn.matchHeight !== 'undefined') {
        $('.js-height').matchHeight();
        $('.js-equal').matchHeight(false);
      }

      if (typeof $.fn.masonry !== 'undefined') {

        var $container = $('.multi-column-items').masonry({
          itemSelector: 'article',
          columnWidth: '.island',
          isAnimated: true,
          gutter: '.gutter'
        });
        $container.imagesLoaded(function () {
          $container.masonry();
        });

      }
    }
  };

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

            $('body')
              .prepend(wrapper = $('<div>').attr('id', 'sticky-wrapper').css({
                width: '100%',
                position: 'fixed',
                top: '0px',
                left: '0px',
                'z-index': 999
              }))
              .prepend(spacer = $('<div>').attr('id', 'sticky-spacer'));
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

  jsTheme.forms = {
    init: function () {
      $('.alert-box').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.alert-box').fadeOut(300);
      });
    }
  };

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

  jsTheme.equalColumns = {
    init: function () {
      // Get all columns and set them to equal height
      var tallest = 0;
      if ($(window).width() > 480) {
        $('.equal-columns .col-equal').each(function () {
          var thisHeight = $(this).height();
          if (thisHeight > tallest) {
            tallest = thisHeight;
          }
        });
        $('.equal-columns .col-equal').height(tallest);
      }
    }
  };

  jsTheme.progressAnimator = {
    init: function () {
      // Animate the width of progress indicators
      $('.progress-indicator').each(function () {
        var targetWidth = $(this).data('percentage');
        var  duration = targetWidth * 30;
        $(this).animate({
          width: targetWidth + '%'
        }, duration, 'linear');
      });
    }
  };

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

  // Register, for backwards compatibilty with Drupal's default jQuery version,
  // $.on as alias of $.live.
  if (typeof $.fn.on === 'undefined') {
    jQuery.fn.extend({
      on: jQuery.fn.live
    });
  }

  // Initialize the theme.
  $(jsTheme.init);

  // executes after everything is loaded.
  $(document).ready(function () {
    $('.search-icon-block').click(function () {
      $('.not-front .search-widget > div').toggle([9000]);
    });

    $('.breadcrumb-wrapper').rcrumbs({
    });

    if ($('#block-gent-auth-bar-bar .picture has-profile img').length > 0) {
      $('#block-gentbe-general-gent-auth').hide();
    }

  });



  $(window).resize(function () {

  });

})(jQuery);
