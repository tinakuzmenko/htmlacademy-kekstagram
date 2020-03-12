'use strict';

(function () {
  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;
  var effectLevel = window.effectSlider.level;
  var setDefaultDepthValue = window.effectSlider.setDefaultDepthValue;

  var pictureEffects = imageEditor.querySelectorAll('.effects__radio');

  var effectMap = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  var removePreviousEffect = function () {
    var classes = Array.from(imageUploadPreview.classList);
    classes.some(function (item) {
      if (item.match('effects__preview--')) {
        imageUploadPreview.classList.remove(item);
      }
    });
  };

  var showEffectLevel = function () {
    if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
    }
  };

  var hideEffectLevel = function () {
    effectLevel.classList.add('hidden');
  };

  var applyNewEffect = function (styleClass) {
    if (styleClass.match('effects__preview--none')) {
      hideEffectLevel();
    } else {
      showEffectLevel();
    }

    setDefaultDepthValue();
    imageUploadPreview.classList.add(styleClass);
  };

  var effectClickHandler = function (evt) {
    removePreviousEffect();
    applyNewEffect(effectMap[evt.target.id]);
  };

  var createEffectsHandlers = function () {
    pictureEffects.forEach(function (item) {
      item.addEventListener('click', effectClickHandler);
    });
  };

  var removeEffectsHandlers = function () {
    pictureEffects.forEach(function (item) {
      item.removeEventListener('click', effectClickHandler);
    });
  };

  window.effect = {
    remove: removePreviousEffect,
    hideLevel: hideEffectLevel,
    createHandlers: createEffectsHandlers,
    removeHandlers: removeEffectsHandlers
  };
})();
