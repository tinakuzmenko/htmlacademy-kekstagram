'use strict';

(function () {

  var errorHandler = window.error.show;
  var addUsersPictures = window.gallery.addUsersPictures;

  var imgFilters = document.querySelector('.img-filters');
  var elementsList = [];

  var createPictureObject = function (element, index) {
    var pictureObject = {
      url: element.url,
      description: element.description,
      likes: element.likes,
      comments: element.comments,
      id: index
    };

    return pictureObject;
  };

  var pushElements = function (data) {
    var elements = data.map(function (item, index) {
      var newElement = createPictureObject(item, index);
      return newElement;
    });

    return elements;
  };

  var loadSuccessHandler = function (data) {
    elementsList = pushElements(data);
    addUsersPictures(elementsList);
    imgFilters.classList.remove('img-filters--inactive');

    window.data = {
      elementsList: elementsList,
    };
  };

  window.backend.load(loadSuccessHandler, errorHandler, 'Закрыть');
})();
