'use strict';

(function () {
  var Keycode = window.util.Keycode;

  var main = document.querySelector('main');

  var closeErrorMessage = function () {
    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');

    errorButton.removeEventListener('click', errorButtonClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);

    main.removeChild(errorWindow);
  };

  var documentClickHandler = function (evt) {
    var errorInner = document.querySelector('.error__inner');

    if (evt.target !== errorInner) {
      closeErrorMessage();
    }
  };

  var errorButtonClickHandler = function () {
    closeErrorMessage();
  };

  var documentKeydownHandler = function (evt) {
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
    errorTitle.style = 'line-height: 1.5;';
    errorButton.textContent = errorButtonText;

    fragment.appendChild(newError);
    main.appendChild(fragment);

    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  var showErrorMessage = function (errorMessage, errorButtonText) {
    createErrorMessage(errorMessage, errorButtonText);
  };

  window.error = {
    showMessage: showErrorMessage
  };
})();
