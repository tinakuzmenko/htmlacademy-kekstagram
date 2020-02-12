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
var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g;
var ESC_KEY = 'Escape';
var SCALE_CHANGE_STEP = 25;
var SCALE_MIN_VALUE = 25;
var SCALE_MAX_VALUE = 100;
var SCALE_CONTROL_DEFAULT_VALUE = '100%';
var SCALE_IMAGE_DEFAULT_VALUE = 100;

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

// Закомментировано временно, чтобы не мешать работать с формой редактирования изображения:

// var activePicture = showBigPicture(bigPictureTemplate);
// pageBody.classList.add('modal-open');
// fillPictureInfo(activePicture, elementsList[0]);

// Открытие и закрытие окна редактирования фотографии

var uploadForm = document.querySelector('.img-upload__form');
var fileUploadButton = document.querySelector('#upload-file');
var imageEditor = uploadForm.querySelector('.img-upload__overlay');
var fileUploadCancel = uploadForm.querySelector('#upload-cancel');
var hashtagsInput = uploadForm.querySelector('.text__hashtags');
var descriptionInput = uploadForm.querySelector('.text__description');
var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');

var setScaleValue = function (value) {
  scaleControlValue.value = value;
};

var setImageScale = function (scaleValue) {
  var newScale = scaleValue / 100;
  imageUploadPreview.setAttribute('style', 'transform: scale(' + newScale + ');');
};

var hideEffectLevel = function () {
  effectLevel.classList.add('hidden');
};

var uploadButtonChangeHandler = function () {
  imageEditor.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  setScaleValue(SCALE_CONTROL_DEFAULT_VALUE);
  setImageScale(SCALE_IMAGE_DEFAULT_VALUE);
  hideEffectLevel();
  removeEffect();
  fileUploadCancel.addEventListener('click', cancelButtonClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);
};

var cancelButtonClickHandler = function () {
  imageEditor.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
  fileUploadCancel.removeEventListener('click', cancelButtonClickHandler);
};

var closeKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
    uploadForm.reset();
    cancelButtonClickHandler();
  }
};

fileUploadButton.addEventListener('change', uploadButtonChangeHandler);

// Изменение масштаба изображения

var scaleContainer = imageEditor.querySelector('.scale');
var buttonScaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
var buttonScaleBigger = scaleContainer.querySelector('.scale__control--bigger');
var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

var getValue = function () {
  var value = parseInt(scaleControlValue.value.replace('%', ''), 10);

  return value;
};

var decreaseScaleValue = function () {
  var scaleValue = getValue();
  if (scaleValue > SCALE_MIN_VALUE) {
    scaleValue = scaleValue - SCALE_CHANGE_STEP;
  }

  return scaleValue;
};

var increaseScaleValue = function () {
  var scaleValue = getValue();
  if (scaleValue < SCALE_MAX_VALUE) {
    scaleValue = scaleValue + SCALE_CHANGE_STEP;
  }

  return scaleValue;
};

var scaleSmallerClickHandler = function () {
  var newValue = decreaseScaleValue();
  setImageScale(newValue);
  scaleControlValue.value = newValue + '%';
};

var scaleBiggerClickHandler = function () {
  var newValue = increaseScaleValue();
  setImageScale(newValue);
  scaleControlValue.value = newValue + '%';
};

buttonScaleSmaller.addEventListener('click', scaleSmallerClickHandler);
buttonScaleBigger.addEventListener('click', scaleBiggerClickHandler);

// Изменение глубины фильтра

var effectLevel = imageEditor.querySelector('.effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var levelLineWidth = effectLevelLine.offsetWidth;
  var startCoords = evt.clientX;

  var effectPinMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var pinCoordX = effectLevelPin.offsetLeft - shift;

    startCoords = moveEvt.clientX;

    if (!(pinCoordX < 0 || pinCoordX > levelLineWidth)) {
      var pinPoint = pinCoordX / effectLevelLine.offsetWidth;

      effectLevelPin.style.left = pinCoordX + 'px';
      effectLevelValue.value = Math.round(pinPoint * 100);
      effectLevelDepth.style.width = pinPoint * 100 + '%';
    }
  };

  var effectPinMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', effectPinMouseMoveHandler);
    document.removeEventListener('mouseup', effectPinMouseUpHandler);
  };

  document.addEventListener('mousemove', effectPinMouseMoveHandler);
  document.addEventListener('mouseup', effectPinMouseUpHandler);
});

// Применение эффектов на изображение

var pictureEffects = imageEditor.querySelectorAll('.effects__radio');

var removeEffect = function () {
  var classes = Array.from(imageUploadPreview.classList);
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].match('effects__preview--')) {
      imageUploadPreview.classList.remove(classes[i]);
    }
  }
};

var showEffectLevel = function () {
  if (effectLevel.classList.contains('hidden')) {
    effectLevel.classList.remove('hidden');
  }
};

var effectClickHandler = function (evt) {
  var evtTarget = evt.target;

  switch (evtTarget.id) {
    case 'effect-none':
      removeEffect();
      hideEffectLevel();
      imageUploadPreview.classList.add('effects__preview--none');
      break;
    case 'effect-chrome':
      removeEffect();
      showEffectLevel();
      imageUploadPreview.classList.add('effects__preview--chrome');
      break;
    case 'effect-sepia':
      removeEffect();
      showEffectLevel();
      imageUploadPreview.classList.add('effects__preview--sepia');
      break;
    case 'effect-marvin':
      removeEffect();
      showEffectLevel();
      imageUploadPreview.classList.add('effects__preview--marvin');
      break;
    case 'effect-phobos':
      removeEffect();
      showEffectLevel();
      imageUploadPreview.classList.add('effects__preview--phobos');
      break;
    case 'effect-heat':
      removeEffect();
      showEffectLevel();
      imageUploadPreview.classList.add('effects__preview--heat');
      break;
  }
};

for (var i = 0; i < pictureEffects.length; i++) {
  pictureEffects[i].addEventListener('click', effectClickHandler);
}

// Валидация хештегов

var createHashtags = function (inputString) {
  var hashtags = inputString.split(' ');
  return hashtags;
};

var removeAdditionalSpaces = function (allHashtags) {
  var notEmptyHashtags = [];
  for (var j = 0; j < allHashtags.length; j++) {
    if (allHashtags[j] !== '') {
      notEmptyHashtags.push(allHashtags[j]);
    }
  }
  return notEmptyHashtags;
};

var pushErrorMessage = function (message, errorMessages) {
  if (errorMessages.indexOf(message) === -1) {
    errorMessages.push(message);
  }

  return errorMessages;
};

var createValidityMessages = function (notEmptyHashtags) {
  var validityMessages = [];

  if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
    pushErrorMessage('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', validityMessages);
  }

  for (var j = 0; j < notEmptyHashtags.length; j++) {
    var hashtag = notEmptyHashtags[j];
    if (!hashtag.startsWith('#')) {
      pushErrorMessage('Хеш-тег должен начинаться с символа решетки (#).', validityMessages);
    } else if (hashtag.length === 1) {
      pushErrorMessage('Хеш-тег не может состоять из одного символа.', validityMessages);
    } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
      pushErrorMessage('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов.', validityMessages);
    } else if (!hashtag.match(HASHTAG_PATTERN)) {
      pushErrorMessage('Хеш-тег должен состоять только из букв и цифр.', validityMessages);
    } else if (notEmptyHashtags.indexOf(hashtag) !== notEmptyHashtags.lastIndexOf(hashtag)) {
      pushErrorMessage('Хеш-теги не должны повторяться.', validityMessages);
    }
  }

  return validityMessages;
};

var hashtagsKeyupHandler = function () {
  var inputValue = hashtagsInput.value.toLowerCase();
  var dirtyHashtags = createHashtags(inputValue);
  var cleanHashtags = removeAdditionalSpaces(dirtyHashtags);
  var errors = createValidityMessages(cleanHashtags);

  if (errors.length !== 0) {
    hashtagsInput.setCustomValidity(errors.join(' \n'));
  } else {
    hashtagsInput.setCustomValidity('');
  }
};

hashtagsInput.addEventListener('keyup', hashtagsKeyupHandler);
