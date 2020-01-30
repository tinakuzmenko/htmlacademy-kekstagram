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
  min = Math.ceil(min);
  max = Math.floor(max);
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

var addToFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementsList.length; i++) {
    fragment.appendChild(createPictureElement(elementsList[i]));
  }

  return fragment;
};

elementsList = pushElements(ELEMENTS_AMOUNT);
usersPictures.appendChild(addToFragment());
