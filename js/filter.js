'use strict';

(function () {
  var imageEditor = window.util.imageEditor;
  var effectLevel = window.filterSlider.effectLevel;
  var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');
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

  var hideEffectLevel = function () {
    effectLevel.classList.add('hidden');
  };

  var applyEffect = function (styleClass) {
    removeEffect();
    showEffectLevel();
    imageUploadPreview.classList.add(styleClass);
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
        applyEffect('effects__preview--chrome');
        break;
      case 'effect-sepia':
        applyEffect('effects__preview--sepia');
        break;
      case 'effect-marvin':
        applyEffect('effects__preview--marvin');
        break;
      case 'effect-phobos':
        applyEffect('effects__preview--phobos');
        break;
      case 'effect-heat':
        applyEffect('effects__preview--heat');
        break;
    }
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

  window.filter = {
    removeEffect: removeEffect,
    hideEffectLevel: hideEffectLevel,
    createEffectsHandlers: createEffectsHandlers,
    removeEffectsHandlers: removeEffectsHandlers
  };
})();
