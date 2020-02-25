'use strict';

(function () {
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

  var getRandomInt = window.util.getRandomInt;
  var getRandomArrayElement = window.util.getRandomArrayElement;

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

  var createPictureDescription = function (photoIndex) {
    var pictureDescription = {
      url: 'photos/' + photoIndex + '.jpg',
      description: 'Описание к картинке',
      likes: getRandomInt(15, 200),
      comments: createCommentsArray()
    };

    return pictureDescription;
  };

  var pushElements = function (amount) {
    var elements = [];
    for (var i = 0; i < amount; i++) {
      var newElement = createPictureDescription(i + 1);
      elements.push(newElement);
    }

    return elements;
  };

  window.data = {
    pushElements: pushElements
  };
})();
