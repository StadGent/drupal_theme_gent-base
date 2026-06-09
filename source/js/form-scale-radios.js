/**
 * @file
 * Form scale radios on mobile.
 */

'use strict';

(function ($, Drupal, once) {

  Drupal.behaviors.feedback_form_scale = {
    attach: function (context) {
      once('form-scale-wrapper', '.webform-scale--wrapper', context).forEach(function (wrapper) {
        const container = wrapper.querySelector('.webform-scale-options');
        const inner = wrapper.querySelector('.js-webform-webform-scale');

        if (!container) {
          return;
        }

        const nav = document.createElement('div');
        nav.className = 'scale-nav';

        nav.innerHTML = `
        <button type="button" class="scale-prev">←</button>
        <button type="button" class="scale-next">→</button>`;

        inner.prepend(nav);

        const prev = nav.querySelector('.scale-prev');
        const next = nav.querySelector('.scale-next');

        prev.addEventListener('click', () => {
          container.scrollBy({
            left: -container.clientWidth,
            behavior: 'smooth'
          });
        });

        next.addEventListener('click', () => {
          container.scrollBy({
            left: container.clientWidth,
            behavior: 'smooth'
          });
        });
      });
    }
  };

// eslint-disable-next-line no-undef
})(jQuery, Drupal, once);
