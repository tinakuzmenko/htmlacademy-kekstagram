'use strict';

(function () {
  var Keycode = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var imageEditor = uploadForm.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getValueRange = function (value, min, max) {
    return value * (max - min) + min;
  };

  window.util = {
    Keycode: Keycode,
    uploadForm: uploadForm,
    imageEditor: imageEditor,
    imageUploadPreview: imageUploadPreview,
    getRandomInt: getRandomInt,
    getValueRange: getValueRange
  };
})();
