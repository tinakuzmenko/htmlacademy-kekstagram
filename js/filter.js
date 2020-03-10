'use strict';

(function () {
  var MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  var removeUsersPictures = window.gallery.removeUsersPictures;
  var addUsersPictures = window.gallery.addUsersPictures;
  var getRandomInt = window.util.getRandomInt;

  var imgFilters = document.querySelector('.img-filters');
  var defaultButton = imgFilters.querySelector('#filter-default');
  var randomButton = imgFilters.querySelector('#filter-random');
  var discussedButton = imgFilters.querySelector('#filter-discussed');

  var toggleActiveFilter = function (button) {
    var activeElement = imgFilters.querySelector('.img-filters__button--active');
    activeElement.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var showDefaultPictures = function () {
    addUsersPictures(window.data.elementsList);
  };

  var getRandomElements = function (array) {
    var arrayCopy = array.slice();
    var randomElements = [];

    for (var i = 0; i < MAX_RANDOM_ELEMENTS_AMOUNT; i++) {
      if (MAX_RANDOM_ELEMENTS_AMOUNT < arrayCopy.length) {
        var index = getRandomInt(0, arrayCopy.length - 1);
        randomElements.push(arrayCopy[index]);
        arrayCopy.splice(index, 1);
      } else {
        randomElements = arrayCopy;
      }
    }

    return randomElements;
  };

  var showRandomPictures = function () {
    var data = window.data.elementsList;
    var randomPictures = getRandomElements(data);
    addUsersPictures(randomPictures);
  };

  var showDiscussedPictures = function () {
    var elementsListCopy = window.data.elementsList.slice();
    var sortedList = elementsListCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    addUsersPictures(sortedList);
  };

  var imgFiltersClickHandler = window.debounce(function (evt) {
    toggleActiveFilter(evt.target);
    removeUsersPictures();

    switch (evt.target) {
      case defaultButton:
        showDefaultPictures();
        break;
      case randomButton:
        showRandomPictures();
        break;
      case discussedButton:
        showDiscussedPictures();
        break;
      default:
        showDefaultPictures();
    }
  });

  imgFilters.addEventListener('click', imgFiltersClickHandler);
})();
