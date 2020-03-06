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
    for (var i = 0; i < pictureEffects.length; i++) {
      pictureEffects[i].addEventListener('click', effectClickHandler);
    }
  };

  var removeEffectsHandlers = function () {
    for (var i = 0; i < pictureEffects.length; i++) {
      pictureEffects[i].removeEventListener('click', effectClickHandler);
    }
  };

  window.effect = {
    remove: removePreviousEffect,
    hideLevel: hideEffectLevel,
    createHandlers: createEffectsHandlers,
    removeHandlers: removeEffectsHandlers
  };
})();
