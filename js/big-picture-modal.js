'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var fillPictureInfo = window.bigPicture.fillPictureInfo;

  var bigPictureTemplate = document.querySelector('.big-picture');
  var closePictureButton = bigPictureTemplate.querySelector('#picture-cancel');
  var picturesContainer = document.querySelector('.pictures');

  var showBigPicture = function (bigPicture) {
    bigPicture.classList.remove('hidden');
    return bigPicture;
  };

  var hideCounts = function (bigPicture) {
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var showPicture = function (target) {
    var activePicture = showBigPicture(bigPictureTemplate);
    var currentIndex = parseInt(target.dataset.index, 10);
    fillPictureInfo(activePicture, window.data.elementsList[currentIndex]);
    document.body.classList.add('modal-open');
    hideCounts(bigPictureTemplate);
  };

  var closePicture = function () {
    bigPictureTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var closePictureClickHandler = function () {
    closePicture();
    closePictureButton.removeEventListener('click', closePictureClickHandler);
  };

  var closePictureKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePicture();
      document.removeEventListener('keydown', closePictureKeydownHandler);
    }
  };

  var addCloseHandlers = function () {
    closePictureButton.addEventListener('click', closePictureClickHandler);
    document.addEventListener('keydown', closePictureKeydownHandler);
  };

  var showPictureClickHandler = function (evt) {
    var evtTarget = evt.target;
    if (evtTarget.classList.contains('picture__img')) {
      showPicture(evtTarget);
      addCloseHandlers();
    }
  };

  var showPictureKeydownHandler = function (evt) {
    if (evt.key === ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPicture(targetImage);
      addCloseHandlers();
    }
  };

  picturesContainer.addEventListener('click', showPictureClickHandler);
  picturesContainer.addEventListener('keydown', showPictureKeydownHandler);

  window.bigPicture = {
    showPicture: showPicture
  };
})();
