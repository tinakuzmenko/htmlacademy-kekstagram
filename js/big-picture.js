'use strict';

(function () {
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');

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

  var fillPictureInfo = function (bigPicture, pictureData) {
    var pictureBlock = bigPicture.querySelector('.big-picture__img');
    var contentBlock = bigPicture.querySelector('.big-picture__social');
    var commentsFragment = createCommentsFragment(pictureData.comments);

    pictureBlock.querySelector('img').src = pictureData.url;
    contentBlock.querySelector('.likes-count').textContent = pictureData.likes;
    contentBlock.querySelector('.comments-count').textContent = pictureData.comments.length;
    contentBlock.querySelector('.social__caption').textContent = pictureData.description;

    addComments(commentsList, commentsFragment);
  };

  window.bigPicture = {
    fillPictureInfo: fillPictureInfo
  };
})();
