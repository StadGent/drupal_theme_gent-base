'use strict';

(function () {

  if (!Tabs) { // eslint-disable-line no-undef
    return;
  }

  const selected = document.querySelectorAll('.tabs');
  for (let i = selected.length; i--;) {
    new Tabs(selected[i]); // eslint-disable-line no-undef
  }

})();
