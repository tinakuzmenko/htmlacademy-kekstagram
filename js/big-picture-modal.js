'use strict';

(function () {
  var Keycode = window.util.Keycode;
  var fillPictureInfo = window.bigPicture.fillInfo;
  var loadComments = window.bigPicture.loadComments;

  var picturesContainer = document.querySelector('.pictures');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var commentsLoader = bigPictureTemplate.querySelector('.comments-loader');
  var closePictureButton = bigPictureTemplate.querySelector('#picture-cancel');
  var commentsDataCopy = [];

  var loaderClickHandler = function () {
    loadComments(commentsDataCopy);

    if (commentsDataCopy.length === 0) {
      commentsLoader.removeEventListener('click', loaderClickHandler);
      commentsLoader.classList.add('hidden');
    }
  };

  var showPicture = function (selectedPicture) {
    var currentIndex = parseInt(selectedPicture.dataset.index, 10);
    var currentElement = window.data.picturesList[currentIndex];

    bigPictureTemplate.classList.remove('hidden');
    commentsDataCopy = currentElement.comments.slice();

    fillPictureInfo(bigPictureTemplate, currentElement);

    if (currentElement.comments.length > window.bigPicture.MAX_COMMENTS_AMOUNT) {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', loaderClickHandler);
    }

    loadComments(commentsDataCopy);
    document.body.classList.add('modal-open');
  };

  var closePicture = function () {
    bigPictureTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');

    closePictureButton.removeEventListener('click', closePictureClickHandler);
    document.removeEventListener('keydown', closePictureKeydownHandler);
    commentsLoader.removeEventListener('click', loaderClickHandler);
  };

  var closePictureClickHandler = function () {
    closePicture();
  };

  var closePictureKeydownHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY) {
      closePicture();
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
    if (evt.key === Keycode.ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPicture(targetImage);
      addCloseHandlers();
    }
  };

  picturesContainer.addEventListener('click', showPictureClickHandler);
  picturesContainer.addEventListener('keydown', showPictureKeydownHandler);
})();
