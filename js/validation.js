'use strict';

(function () {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_CHARACTERS = 20;
  var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g;

  var uploadForm = window.util.uploadForm;

  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  var createHashtags = function (inputString) {
    var hashtags = inputString.split(' ');

    return hashtags;
  };

  var removeAdditionalSpaces = function (allHashtags) {
    var notEmptyHashtags = allHashtags.filter(function (hashtag) {
      return hashtag !== '';
    });

    return notEmptyHashtags;
  };

  var pushErrorMessage = function (errorMessage, errorMessages) {
    if (errorMessages.indexOf(errorMessage) === -1) {
      errorMessages.push(errorMessage);
    }

    return errorMessages;
  };

  var validateHashtags = function (notEmptyHashtags) {
    var errorMessages = [];

    if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
      pushErrorMessage('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', errorMessages);
    }

    notEmptyHashtags.forEach(function (hashtag, index) {
      if (!hashtag.startsWith('#')) {
        pushErrorMessage('Хеш-тег должен начинаться с символа решетки (#).', errorMessages);
      } else if (hashtag.length === 1) {
        pushErrorMessage('Хеш-тег не может состоять из одного символа.', errorMessages);
      } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
        pushErrorMessage('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов.', errorMessages);
      } else if (!hashtag.match(HASHTAG_PATTERN)) {
        pushErrorMessage('Хеш-тег должен состоять только из букв и цифр.', errorMessages);
      } else if (notEmptyHashtags.indexOf(hashtag, index + 1) !== -1) {
        pushErrorMessage('Хеш-теги не должны повторяться.', errorMessages);
      }
    });

    return errorMessages;
  };

  var hashtagsKeyupHandler = function () {
    var inputValue = hashtagsInput.value.toLowerCase();
    var dirtyHashtags = createHashtags(inputValue);
    var cleanHashtags = removeAdditionalSpaces(dirtyHashtags);
    var errorMessages = validateHashtags(cleanHashtags);

    if (errorMessages.length !== 0) {
      hashtagsInput.setCustomValidity(errorMessages.join(' \n'));
      hashtagsInput.style.border = '2px solid #e90000';
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.border = '';
    }
  };

  hashtagsInput.addEventListener('keyup', hashtagsKeyupHandler);
})();
