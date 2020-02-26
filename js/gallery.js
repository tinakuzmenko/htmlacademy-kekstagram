'use strict';

(function () {
  var ELEMENTS_AMOUNT = 25;

  var pushElements = window.data.pushElements;

  var elementsList = [];
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

  var addToFragment = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(createPictureElement(elements[i]));
    }

    return fragment;
  };

  elementsList = pushElements(ELEMENTS_AMOUNT);
  usersPictures.appendChild(addToFragment(elementsList));

  window.gallery = {
    elementsList: elementsList
  };
})();
