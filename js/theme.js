(function($) {

	var jsTheme =
	{
		// init, something like a constructor
		init: function()
		{
			jsTheme.forms.init();
			jsTheme.searchThemes.init();
			jsTheme.equalColumns.init();
			jsTheme.progressAnimator.init();
			jsTheme.accordion.init();
			//jsTheme.sportLocationMap.init(); // Move me to subtheme?
			jsTheme.shoppingCart.init();
			//jsTheme.blockLinks.init();
			$('.js-height').matchHeight();
			$('.js-equal').matchHeight(false);
		}
	};


	jsTheme.forms =
	{
		init: function()
		{
			$('.alert-box').on('click', function(e)
			{
				e.preventDefault();
				$(this).closest('.alert-box').fadeOut(300);
			});
		}

	};

	jsTheme.searchThemes =
	{
		init: function()
		{
			// Open list of themes
			$('.search-filter-theme-title a').click(function(e) {
				e.preventDefault();
				$('.facetapi-facet-theme > ul').fadeToggle('fast');
				$(this).children('span.icon').toggleClass('icon-arrow-down icon-arrow-up');
			});

			// On Mobile open list of types and themes
			$('.search-filter-toggle-btn').click(function(e) {
				e.preventDefault();
				$('.search-filter > div').slideToggle();
			});
		},

	};

	jsTheme.equalColumns =
	{
		init: function()
		{
			// Get all columns and set them to equal height
			var tallest = 0;
			if ( $(window).width() > 480) {
				$('.equal-columns .col-equal').each(function() {
					var thisHeight = $(this).height();
					if(thisHeight > tallest) {
						tallest = thisHeight;
					}
				});
				$('.equal-columns .col-equal').height(tallest);
			}
		}
	};

	jsTheme.progressAnimator =
	{
		init: function()
		{
			// Animate the width of progress indicators
			$('.progress-indicator').each(function() {
				var targetWidth = $(this).data('percentage');
					duration = targetWidth * 30;
				$(this).animate({
					width : targetWidth + '%'
				}, duration, 'linear');
			});
		}
	};


	jsTheme.accordion =
	{
		init: function()
		{
			// Code for simple accordion animations
			$('.accordion').each(function() {

				// Close all contents except the first
				$('.accordion-item-content', this).hide();
				var activeItem = $('.accordion-item:first', this);
					activeItem.find('.accordion-item-content').show();
					activeItem.addClass('active').find('.accordion-item-title span').toggleClass('icon-arrow-down icon-arrow-up');

				// Now toggle items on click
				$('.accordion-item-title a', this).click(function(e) {
					e.preventDefault();
					var currentItem = $(this).parents('.accordion-item');
					if ( currentItem.hasClass('active') ) {

						currentItem.removeClass('active');
						currentItem.find('.accordion-item-content').slideUp('slow');
						currentItem.find('.accordion-item-title span').toggleClass('icon-arrow-up icon-arrow-down');

					} else {

						currentItem.addClass('active');
						currentItem.find('.accordion-item-content').slideDown('slow');
						currentItem.find('.accordion-item-title span').toggleClass('icon-arrow-down icon-arrow-up');

					}

				});

			});
		}
	};

	jsTheme.sportLocationMap =
	{
		init: function()
		{
			$('.sport-location-overview .map-toggle').click(function(e) {
				e.preventDefault();

				$(this).toggleClass('inactive');
				$('.sport-location-map').slideToggle();
				$('#sport-map-embed').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10034.128740075923!2d3.6846296999999937!3d51.04326050000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3718187135ad3%3A0xf6f5e697bb7805c1!2sBlaarmeersen!5e0!3m2!1snl!2sbe!4v1400157989287" width="600" height="541" frameborder="0" style="border:0"></iframe>'); // JESSE - HIER MOET EEN BETERE OPLOSSING VOOR BESTAAN...
			});
		}
	}

	jsTheme.shoppingCart =
	{
		init: function()
		{
			// Deleting an item from the shopping cart
			$('.shoppingcart-item .delete-item').click(function(e) {
				e.preventDefault();

				$(this).parents('tr').hide();

			});
		}
	}
	/*
	// Disabled for now, see if we need this. If so rewrite to behavior
	jsTheme.blockLinks =
	{
		init: function() {
			var block = $('.js-link');
			var blockLink = $('.js-source');
			var noLink = $('.js-no-link');

			block.on('click', function(e) {
				var link = $(this).find(blockLink);
				if (!link.length) {
					link = $(this).find('a');
				}
				if (link.length) {
					window.location = link..attr('href');;
				}
			});

			noLink.on('click', function(e) {
				e.stopPropagation();
			});
		}
	};
	*/
	$(jsTheme.init);

})(jQuery);
