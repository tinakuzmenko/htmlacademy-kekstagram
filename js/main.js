'use strict';

var NAMES = [
  'Тирион Ланнистер',
  'Дейенерис Таргариен',
  'Джон Сноу',
  'Арья Старк',
  'Ходор',
  'Теон Грейджой'
];

var ALL_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ELEMENTS_AMOUNT = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var usersPictures = document.querySelector('.pictures');
var elementsList = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

var createUsersComment = function () {
  var usersComment = {
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    message: getRandomArrayElement(ALL_COMMENTS),
    name: getRandomArrayElement(NAMES)
  };

  return usersComment;
};

var createCommentsArray = function () {
  var commentsAmount = getRandomInt(1, 10);
  var comments = [];
  for (var i = 0; i <= commentsAmount; i++) {
    comments.push(createUsersComment());
  }

  return comments;
};

var createPictureDescription = function (photoIndex, description) {
  var pictureDescription = {
    url: 'photos/' + photoIndex + '.jpg',
    description: description,
    likes: getRandomInt(15, 200),
    comments: createCommentsArray()
  };

  return pictureDescription;
};

var pushElements = function (amount) {
  var elements = [];
  for (var i = 0; i < amount; i++) {
    var newElement = createPictureDescription(i + 1, 'Здесь должно быть описание');
    elements.push(newElement);
  }

  return elements;
};

var createPictureElement = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var addToFragment = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(createPictureElement(elements[i]));
  }

  return fragment;
};

elementsList = pushElements(ELEMENTS_AMOUNT);
usersPictures.appendChild(addToFragment(elementsList));

var commentsList = document.querySelector('.social__comments');
var commentTemplate = commentsList.querySelector('.social__comment');
var bigPictureTemplate = document.querySelector('.big-picture');

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

var activePicture = showBigPicture(bigPictureTemplate);
var pageBody = document.querySelector('body');
pageBody.classList.add('modal-open');
fillPictureInfo(activePicture, elementsList[0]);
