'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var imageEditor = uploadForm.querySelector('.img-upload__overlay');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  window.util = {
    uploadForm: uploadForm,
    imageEditor: imageEditor,
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement
  };
})();
