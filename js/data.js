'use strict';

(function () {
  var errorHandler = window.error.showMessage;
  var addUsersPictures = window.gallery.addUsersPictures;

  var imgFilters = document.querySelector('.img-filters');
  var picturesList = [];

  var createPictureObject = function (picture, index) {
    var pictureObject = {
      url: picture.url,
      description: picture.description,
      likes: picture.likes,
      comments: picture.comments,
      id: index
    };

    return pictureObject;
  };

  var createPicturesArray = function (data) {
    var pictures = data.map(function (item, index) {
      var newPicture = createPictureObject(item, index);
      return newPicture;
    });

    return pictures;
  };

  var loadSuccessHandler = function (data) {
    picturesList = createPicturesArray(data);
    addUsersPictures(picturesList);
    imgFilters.classList.remove('img-filters--inactive');

    window.data = {
      picturesList: picturesList,
    };
  };

  window.backend.load(loadSuccessHandler, errorHandler, 'Закрыть');
})();
