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
var MAX_HASHTAGS_AMOUNT = 5;
var MAX_HASHTAG_CHARACTERS = 20;
var HASHTAG_REGEXP = /^([#]{1})([0-9a-zа-я]{1,19})$/g;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var usersPictures = document.querySelector('.pictures');
var elementsList = [];

// Поиск рандомного элемента в промежутке от min до max и поиск рандомного элемента массива

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

// Создание массива объектов с пользовательскими комментариями

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

// Создание и отрисовка массива с объектами выводимых фотографий

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

// Показ большого фото и подстановка сгенерированной информации

var commentsList = document.querySelector('.social__comments');
var commentTemplate = commentsList.querySelector('.social__comment');
var bigPictureTemplate = document.querySelector('.big-picture');
var pageBody = document.querySelector('body');

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

// Закомментировано, чтобы не мешать работать с формой редактирования изображения:

// var activePicture = showBigPicture(bigPictureTemplate);
// pageBody.classList.add('modal-open');
// fillPictureInfo(activePicture, elementsList[0]);

// Открытие и закрытие окна редактирования фотографии

var fileUploadChangeHandler = document.querySelector('#upload-file');
var imageEditor = document.querySelector('.img-upload__overlay');
var fileUploadCancelHandler = document.querySelector('#upload-cancel');

var openImageEditor = function () {
  imageEditor.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  fileUploadCancelHandler.addEventListener('click', closeImageEditor);
};

var closeImageEditor = function () {
  imageEditor.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  fileUploadChangeHandler.value = '';
  fileUploadCancelHandler.removeEventListener('click', closeImageEditor);
};

fileUploadChangeHandler.addEventListener('change', openImageEditor);

// Валидация хештегов

var hashTagsInput = imageEditor.querySelector('.text__hashtags');

var createHashtags = function (inputString) {
  var hashtags = inputString.split(' ');
  return hashtags;
};

var removeAdditionalSpaces = function (allHashtags) {
  var notEmptyHashtags = [];
  for (var i = 0; i < allHashtags.length; i++) {
    if (allHashtags[i] !== '') {
      notEmptyHashtags.push(allHashtags[i]);
    }
  }
  return notEmptyHashtags;
};

var checkValitadionRules = function (notEmptyHashtags, input) {
  if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
    input.setCustomValidity('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + '!');
  } else {
    for (var i = 0; i < notEmptyHashtags.length; i++) {
      var hashtag = notEmptyHashtags[i];
      if (!hashtag.startsWith('#')) {
        input.setCustomValidity('Хеш-тег должен начинаться с символа решетки (#)!');
      } else if (hashtag.length === 1) {
        input.setCustomValidity('Хеш-тег не может состоять из одного символа!');
      } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
        input.setCustomValidity('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов!');
      } else if (!hashtag.match(HASHTAG_REGEXP)) {
        input.setCustomValidity('Хеш-тег должен начинаться с символа решетки (#) и состоять только из букв и цифр!');
      } else {
        input.setCustomValidity('');
      }
    }
  }
};

var validateHashtags = function () {
  var inputValue = hashTagsInput.value.toLowerCase();
  var dirtyHashtags = createHashtags(inputValue);
  var cleanHashtags = removeAdditionalSpaces(dirtyHashtags);
  checkValitadionRules(cleanHashtags, hashTagsInput);
};

hashTagsInput.addEventListener('change', validateHashtags);

// #cat #котик #cute #котик2020 #милота:3 cat #котик=^_^= #красивый котик #самыйлучшийкотикнаэтойпланетеземляпотомучтоонрыженькийаялюблюрыженькихкотиков
