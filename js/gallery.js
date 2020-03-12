'use strict';

(function () {
  var usersPictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.index = picture.id;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  var addUsersPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (item) {
      fragment.appendChild(createPictureElement(item));
    });

    usersPictures.appendChild(fragment);
  };

  var removeUsersPictures = function () {
    var shownPictures = usersPictures.querySelectorAll('.picture');

    shownPictures.forEach(function (item) {
      usersPictures.removeChild(item);
    });
  };

  window.gallery = {
    addUsersPictures: addUsersPictures,
    removeUsersPictures: removeUsersPictures
  };
})();
