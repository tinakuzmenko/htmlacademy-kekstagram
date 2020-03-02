'use strict';

(function () {
  var SCALE_CONTROL_DEFAULT_VALUE = '100%';
  var SCALE_IMAGE_DEFAULT_VALUE = 100;

  var Keycode = window.util.Keycode;
  var uploadForm = window.util.uploadForm;
  var imageEditor = window.util.imageEditor;
  var setScaleValue = window.scale.setValue;
  var setNewScale = window.scale.setNew;
  var removePreviousEffect = window.effect.remove;
  var hideEffectLevel = window.effect.hideLevel;
  var createEffectsHandlers = window.effect.createHandlers;
  var removeEffectsHandlers = window.effect.removeHandlers;
  var setDefaultDepthValue = window.effectSlider.setDefaultDepthValue;
  var errorHandler = window.error.handler;
  var successHandler = window.success.handler;

  var fileUploadButton = document.querySelector('#upload-file');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var fileUploadCancel = uploadForm.querySelector('#upload-cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');

  var uploadButtonChangeHandler = function () {
    imageEditor.classList.remove('hidden');
    document.body.classList.add('modal-open');
    setScaleValue(SCALE_CONTROL_DEFAULT_VALUE);
    setNewScale(SCALE_IMAGE_DEFAULT_VALUE);
    hideEffectLevel();
    removePreviousEffect();
    setDefaultDepthValue();
    createEffectsHandlers();
    fileUploadCancel.addEventListener('click', cancelButtonClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  };

  var closeImageEditor = function () {
    removeEffectsHandlers();
    uploadForm.reset();

    imageEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    fileUploadCancel.removeEventListener('click', cancelButtonClickHandler);
    document.removeEventListener('keydown', closeKeydownHandler);
  };

  var cancelButtonClickHandler = function () {
    closeImageEditor();
  };

  var closeKeydownHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
      closeImageEditor();
    }
  };

  fileUploadButton.addEventListener('change', uploadButtonChangeHandler);

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(uploadForm), successHandler, errorHandler);
    evt.preventDefault();
    closeImageEditor();
  });
})();
