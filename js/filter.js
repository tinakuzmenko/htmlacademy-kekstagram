'use strict';

(function () {
  var MAX_RANDOM_ELEMENTS_AMOUNT = 10;

  var removeUsersPictures = window.gallery.removeUsersPictures;
  var addUsersPictures = window.gallery.addUsersPictures;

  var imgFilters = document.querySelector('.img-filters');
  var defaultFilter = imgFilters.querySelector('#filter-default');
  var randomFilter = imgFilters.querySelector('#filter-random');
  var discussedFilter = imgFilters.querySelector('#filter-discussed');

  var toggleActiveFilter = function (selectedFilter) {
    var activeFilter = imgFilters.querySelector('.img-filters__button--active');

    activeFilter.classList.remove('img-filters__button--active');
    selectedFilter.classList.add('img-filters__button--active');
  };

  var showDefaultPictures = function () {
    addUsersPictures(window.data.picturesList);
  };

  var shuffleArray = function (array) {
    var arrayCopy = array.slice();

    arrayCopy.forEach(function (item, index) {
      var randomIndex = Math.floor(Math.random() * (index + 1));
      var currentElement = item;

      item = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;

      return;
    });

    return arrayCopy;
  };

  var showRandomPictures = function () {
    var picturesList = window.data.picturesList;
    var randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS_AMOUNT);

    addUsersPictures(randomElements);
  };

  var showDiscussedPictures = function () {
    var picturesListCopy = window.data.picturesList.slice();
    var sortedList = picturesListCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    addUsersPictures(sortedList);
  };

  var imgFiltersClickHandler = window.debounce(function (evt) {
    toggleActiveFilter(evt.target);
    removeUsersPictures();

    switch (evt.target) {
      case defaultFilter:
        showDefaultPictures();
        break;
      case randomFilter:
        showRandomPictures();
        break;
      case discussedFilter:
        showDiscussedPictures();
        break;
      default:
        showDefaultPictures();
    }
  });

  imgFilters.addEventListener('click', imgFiltersClickHandler);
})();
