'use strict';

(function () {
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');

  var hideCounts = function (bigPicture) {
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
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

  var loadComments = function (commentsData) {
    var shownComments = commentsData.splice(0, window.util.MAX_COMMENTS_AMOUNT);
    var commentsFragment = createCommentsFragment(shownComments);
    commentsList.appendChild(commentsFragment);
  };

  var fillPictureInfo = function (bigPicture, pictureData) {
    var pictureBlock = bigPicture.querySelector('.big-picture__img');
    var contentBlock = bigPicture.querySelector('.big-picture__social');

    commentsList.innerHTML = '';
    hideCounts(bigPicture);

    pictureBlock.querySelector('img').src = pictureData.url;
    contentBlock.querySelector('.likes-count').textContent = pictureData.likes;
    contentBlock.querySelector('.comments-count').textContent = pictureData.comments.length;
    contentBlock.querySelector('.social__caption').textContent = pictureData.description;
  };

  window.bigPicture = {
    fillInfo: fillPictureInfo,
    loadComments: loadComments
  };
})();
