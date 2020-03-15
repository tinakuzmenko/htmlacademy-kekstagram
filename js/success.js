'use strict';

(function () {
  var Keycode = window.util.Keycode;

  var main = document.querySelector('main');

  var closeSuccessWindow = function () {
    var successWindow = document.querySelector('.success');
    var successCloseButton = successWindow.querySelector('.success__button');

    successCloseButton.removeEventListener('click', successCloseButtonClickHandler);
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);

    main.removeChild(successWindow);
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY) {
      closeSuccessWindow();
    }
  };

  var documentClickHandler = function (evt) {
    var successInner = document.querySelector('.success__inner');

    if (evt.target !== successInner) {
      closeSuccessWindow();
    }
  };

  var successCloseButtonClickHandler = function () {
    closeSuccessWindow();
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');

    var newSuccessMessage = successTemplate.cloneNode(true);
    var successCloseButton = newSuccessMessage.querySelector('.success__button');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(newSuccessMessage);
    main.appendChild(fragment);

    successCloseButton.addEventListener('click', successCloseButtonClickHandler);
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  window.success = {
    createMessage: createSuccessMessage
  };
})();
