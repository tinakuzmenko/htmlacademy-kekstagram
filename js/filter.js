'use strict';

(function () {
  var MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  var removeUsersPictures = window.gallery.removeUsersPictures;
  var addUsersPictures = window.gallery.addUsersPictures;

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

  var shuffleElements = function (array) {
    var arrayCopy = array.slice();

    arrayCopy.sort(function () {
      return Math.random() - 0.5;
    });

    return arrayCopy;
  };

  var showRandomPictures = function () {
    var data = window.data.elementsList;
    var randomElements = shuffleElements(data).slice(0, MAX_RANDOM_ELEMENTS_AMOUNT);
    addUsersPictures(randomElements);
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
