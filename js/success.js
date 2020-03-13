'use strict';

(function () {
  var Keycode = window.util.Keycode;

  var main = document.querySelector('main');

  var closeSuccessWindow = function () {
    var successWindow = document.querySelector('.success');
    var successCloseButton = successWindow.querySelector('.success__button');

    successCloseButton.removeEventListener('click', clickSuccessButtonHandler);
    document.removeEventListener('click', clickSuccessWindowHandler);
    document.removeEventListener('keydown', keydownSuccessMessageHandler);

    main.removeChild(successWindow);
  };

  var keydownSuccessMessageHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY) {
      closeSuccessWindow();
    }
  };

  var clickSuccessWindowHandler = function (evt) {
    var successInner = document.querySelector('.success__inner');

    if (evt.target !== successInner) {
      closeSuccessWindow();
    }
  };

  var clickSuccessButtonHandler = function () {
    closeSuccessWindow();
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');

    var newSuccessMessage = successTemplate.cloneNode(true);
    var successCloseButton = newSuccessMessage.querySelector('.success__button');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(newSuccessMessage);
    main.appendChild(fragment);

    successCloseButton.addEventListener('click', clickSuccessButtonHandler);
    document.addEventListener('click', clickSuccessWindowHandler);
    document.addEventListener('keydown', keydownSuccessMessageHandler);
  };

  window.success = {
    createMessage: createSuccessMessage
  };
})();
