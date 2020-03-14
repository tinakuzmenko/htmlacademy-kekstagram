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
  var errorHandler = window.error.showMessage;
  var successHandler = window.success.createMessage;

  var fileUploadButton = document.querySelector('#upload-file');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var fileUploadCancel = uploadForm.querySelector('#upload-cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');

  var fileUploadButtonChangeHandler = function () {
    imageEditor.classList.remove('hidden');
    document.body.classList.add('modal-open');

    setScaleValue(SCALE_CONTROL_DEFAULT_VALUE);
    setNewScale(SCALE_IMAGE_DEFAULT_VALUE);
    hideEffectLevel();
    removePreviousEffect();
    setDefaultDepthValue();
    createEffectsHandlers();
    hashtagsInput.focus();

    fileUploadCancel.addEventListener('click', fileUploadCancelClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var closeImageEditor = function () {
    removeEffectsHandlers();
    uploadForm.reset();

    imageEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    fileUploadCancel.removeEventListener('click', fileUploadCancelClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
  };

  var fileUploadCancelClickHandler = function () {
    closeImageEditor();
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
      closeImageEditor();
    }
  };

  fileUploadButton.addEventListener('change', fileUploadButtonChangeHandler);

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.send(new FormData(uploadForm), successHandler, errorHandler);
    closeImageEditor();
  });

  window.uploadForm = {
    close: closeImageEditor
  };
})();
