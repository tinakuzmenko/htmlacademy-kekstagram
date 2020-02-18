'use strict';

(function () {
  var pageBody = window.util.pageBody;
  var elementsList = window.gallery.elementsList;

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var closePictureButton = bigPictureTemplate.querySelector('#picture-cancel');
  var picturesContainer = document.querySelector('.pictures');

  var showBigPicture = function (bigPictureElement) {
    bigPictureElement.classList.remove('hidden');
    return bigPictureElement;
  };

  var hideCounts = function (bigPictureElement) {
    var commentsCount = bigPictureElement.querySelector('.social__comment-count');
    var commentsLoader = bigPictureElement.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var renderUserComment = function (commentData) {
    var userComment = commentTemplate.cloneNode(true);

    userComment.querySelector('img').src = commentData.avatar;
    userComment.querySelector('img').alt = commentData.name;
    userComment.querySelector('.social__text').textContent = commentData.message;

    return userComment;
  };

  var createCommentsFragment = function (commentData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentData.length; i++) {
      var newComment = renderUserComment(commentData[i]);
      fragment.appendChild(newComment);
    }

    return fragment;
  };

  var addComments = function (commentsContainer, fragment) {
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(fragment);
  };

  var fillPictureInfo = function (bigPictureElement, pictureData) {
    var pictureBlock = bigPictureElement.querySelector('.big-picture__img');
    var contentBlock = bigPictureElement.querySelector('.big-picture__social');
    var commentsFragment = createCommentsFragment(pictureData.comments);

    pictureBlock.querySelector('img').src = pictureData.url;
    contentBlock.querySelector('.likes-count').textContent = pictureData.likes;
    contentBlock.querySelector('.comments-count').textContent = pictureData.comments.length;
    contentBlock.querySelector('.social__caption').textContent = pictureData.description;

    addComments(commentsList, commentsFragment);
    hideCounts(bigPictureElement);
  };

  var closePicture = function () {
    bigPictureTemplate.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  };

  var closePictureClickHandler = function () {
    closePicture();
    closePictureButton.removeEventListener('click', closePictureClickHandler);
  };

  var closePictureKeydownHandler = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closePicture();
      document.removeEventListener('keydown', closePictureKeydownHandler);
    }
  };

  var showPicture = function (target) {
    var activePicture = showBigPicture(bigPictureTemplate);
    pageBody.classList.add('modal-open');
    var currentIndex = parseInt(target.dataset.index, 10);
    fillPictureInfo(activePicture, elementsList[currentIndex]);
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
    if (evt.key === window.util.ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPicture(targetImage);
      addCloseHandlers();
    }
  };

  picturesContainer.addEventListener('click', showPictureClickHandler);
  picturesContainer.addEventListener('keydown', showPictureKeydownHandler);
})();
