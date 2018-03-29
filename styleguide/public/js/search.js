(function () {
  'use strict';
  var components = document.querySelector('#tree-components'),
    inputField = document.querySelector('#search'),
    button = document.querySelector('#search-btn'),
    autoSearch = document.querySelector('#auto-search');

  var hide = function (elem, next) {
    if (!(elem.tagName === 'LI' || elem.tagName === 'UL')) {
      next();
    }
    else {
      elem.setAttribute('hidden', 'true');
      if (elem.parentNode.querySelectorAll('li:not([hidden=true])').length === 0) {
        hide(elem.parentNode, next);
      }
      else {
        next();
      }
    }
  };

  var show = function (elem, next) {

    // if it's a collection, iterate
    if (elem.length > 0) {
      for (var i = elem.length; i--;) {
        show(elem[i], next);
      }
      return;
    }

    if (!(elem.tagName === 'LI' || elem.tagName === 'UL')) {
      next();
    }
    else {
      elem.removeAttribute('hidden');

      if (elem.parentNode.querySelectorAll('li:not([hidden=true])').length > 0) {
        show(elem.parentNode, next);
      }
      else {
        next();
      }
    }
  };

  var filter = function (e) {
    var spans = components.querySelectorAll('span'),
      value = inputField.value;

    var number = spans.length;

    var next = function () {
        number--;
        if(number === 0){
          console.warn('recursive shit done!')
        }
      };

    for (var i = spans.length; i--;) {
      if (spans[i].innerHTML.toUpperCase()
          .indexOf(value.toUpperCase()) === -1) {
        if (spans[i].parentNode.tagName === 'A') {
          hide(spans[i].parentNode.parentNode, next);
        }
        else {
          next()
        }
      }
      else {
        if (spans[i].parentNode.classList.contains('Tree-collectionLabel')) {
          var collection = spans[i].parentNode.parentNode.querySelectorAll('ul > li');
          number += collection.length - 1;
          show(collection, next);
        }
        else {
          show(spans[i].parentNode.parentNode, next);
        }
      }
    }
  };

  var addEvents = function () {
    if (!components) {
      return;
    }
    if (inputField && autoSearch) {
      inputField.addEventListener('input', function (e) {
        if (autoSearch.checked) {
          filter(e);
        }
      });
    }
    if (button) {
      button.addEventListener('click', filter);
    }
  };

  addEvents();
})();