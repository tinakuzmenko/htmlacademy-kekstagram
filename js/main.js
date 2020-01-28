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

var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var ELEMENTS_AMOUNT = 25;
var ELEMENTS_LIST = [];
var fragment = document.createDocumentFragment();
var usersPictures = document.querySelector('.pictures');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  var randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
};

var createUsersComment = function (comments, names) {
  var usersComment = {
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names)
  };

  return usersComment;
};

var createCommentsArray = function (comments) {
  var commentsAmount = getRandomInt(1, 10);
  var commentsArray = [];
  for (var i = 0; i <= commentsAmount; i++) {
    commentsArray.push(getRandomArrayElement(comments));
  }

  return commentsArray;
};

var createPictureDescription = function (photoIndex, description, comments) {
  var pictureDescription = {
    url: 'photos/' + photoIndex + '.jpg',
    description: description,
    likes: getRandomInt(15, 200),
    comments: createCommentsArray(comments)
  };

  return pictureDescription;
};

var pushElements = function (amount, commentsArray, namesArray, elementsArray) {
  for (var i = 0; i < amount; i++) {
    createUsersComment(commentsArray, namesArray);
    createCommentsArray(commentsArray);
    var newElement = createPictureDescription(i + 1, 'Здесь должно быть описание', commentsArray);
    elementsArray.push(newElement);
  }
};

var createPictureElement = function (picture) {
  var pictureElement = PICTURE_TEMPLATE.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var addToFragment = function (picturesArray) {
  for (var i = 0; i < picturesArray.length; i++) {
    fragment.appendChild(createPictureElement(picturesArray[i]));
  }
};

pushElements(ELEMENTS_AMOUNT, ALL_COMMENTS, NAMES, ELEMENTS_LIST);
addToFragment(ELEMENTS_LIST);
usersPictures.appendChild(fragment);
