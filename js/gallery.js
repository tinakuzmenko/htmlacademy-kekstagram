'use strict';

(function () {
  var ELEMENTS_AMOUNT = 25;

  var elementsList = [];
  var usersPictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var createPictureDescription = window.data.createPictureDescription;

  var pushElements = function (amount) {
    var elements = [];
    for (var i = 0; i < amount; i++) {
      var newElement = createPictureDescription(i + 1, 'Здесь должно быть описание');
      elements.push(newElement);
    }

    return elements;
  };

  var createPictureElement = function (picture, index) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').setAttribute('data-index', index);
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  var addToFragment = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(createPictureElement(elements[i], i));
    }

    return fragment;
  };

  elementsList = pushElements(ELEMENTS_AMOUNT);
  usersPictures.appendChild(addToFragment(elementsList));

  window.gallery = {
    elementsList: elementsList
  };
})();
