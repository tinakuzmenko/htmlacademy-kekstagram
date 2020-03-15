'use strict';

(function () {
  var MAX_COMMENTS_AMOUNT = 5;

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');

  var hideCounts = function (bigPicture) {
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');

    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var renderUserComment = function (comment) {
    var userComment = commentTemplate.cloneNode(true);
    var userImage = userComment.querySelector('img');

    userImage.src = comment.avatar;
    userImage.alt = comment.name;
    userComment.querySelector('.social__text').textContent = comment.message;

    return userComment;
  };

  var createCommentsFragment = function (commentsData) {
    var fragment = document.createDocumentFragment();

    commentsData.forEach(function (comment) {
      var newComment = renderUserComment(comment);

      fragment.appendChild(newComment);
    });

    return fragment;
  };

  var loadComments = function (commentsData) {
    var shownComments = commentsData.splice(0, MAX_COMMENTS_AMOUNT);
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
    MAX_COMMENTS_AMOUNT: MAX_COMMENTS_AMOUNT,
    fillInfo: fillPictureInfo,
    loadComments: loadComments
  };
})();
