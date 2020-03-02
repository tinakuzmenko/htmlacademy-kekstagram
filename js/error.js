'use strict';

(function () {
  var Keycode = window.util.Keycode;

  var main = document.querySelector('main');

  var closeErrorMessage = function () {
    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');

    errorButton.removeEventListener('click', clickErrorButtonHandler);
    document.removeEventListener('keydown', keydownErrorMessageHandler);
    document.removeEventListener('click', clickErrorWindowHandler);

    main.removeChild(errorWindow);
  };

  var clickErrorWindowHandler = function (evt) {
    if (evt.target !== document.querySelector('.error__inner')) {
      closeErrorMessage();
    }
  };

  var clickErrorButtonHandler = function () {
    closeErrorMessage();
  };

  var keydownErrorMessageHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY) {
      closeErrorMessage();
    }
  };

  var createErrorMessage = function (errorMessage, errorButtonText) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var newError = errorTemplate.cloneNode(true);

    var errorTitle = newError.querySelector('.error__title');
    var errorButton = newError.querySelector('.error__button');
    var fragment = document.createDocumentFragment();

    errorTitle.textContent = errorMessage;
    errorButton.textContent = errorButtonText;

    fragment.appendChild(newError);
    main.appendChild(fragment);

    errorButton.addEventListener('click', clickErrorButtonHandler);
    document.addEventListener('keydown', keydownErrorMessageHandler);
    document.addEventListener('click', clickErrorWindowHandler);
  };

  var errorHandler = function (errorMessage, errorButtonText) {
    createErrorMessage(errorMessage, errorButtonText);
  };

  window.error = {
    handler: errorHandler
  };
})();
