'use strict';

(function () {
  var SCALE_CHANGE_STEP = 25;
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;

  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;

  var scaleContainer = imageEditor.querySelector('.scale');
  var scaleControlSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var scaleControlBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

  var setScaleValue = function (value) {
    scaleControlValue.value = value;
  };

  var setNewScale = function (scaleValue) {
    var newScale = scaleValue / SCALE_MAX_VALUE;

    imageUploadPreview.style.transform = 'scale(' + newScale + ')';
  };

  var getValue = function () {
    var value = parseInt(scaleControlValue.value.replace('%', ''), 10);

    return value;
  };

  var decreaseScaleValue = function (value) {
    var decreasedValue = value - SCALE_CHANGE_STEP;

    return decreasedValue;
  };

  var increaseScaleValue = function (value) {
    var increasedValue = value + SCALE_CHANGE_STEP;

    return increasedValue;
  };

  var scaleControlSmallerClickHandler = function () {
    var scaleValue = getValue();

    if (scaleValue > SCALE_MIN_VALUE) {
      var newValue = decreaseScaleValue(scaleValue);
      setNewScale(newValue);
      scaleControlValue.value = newValue + '%';
    }
  };

  var scaleControlBiggerClickHandler = function () {
    var scaleValue = getValue();

    if (scaleValue < SCALE_MAX_VALUE) {
      var newValue = increaseScaleValue(scaleValue);
      setNewScale(newValue);
      scaleControlValue.value = newValue + '%';
    }
  };

  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);

  window.scale = {
    setValue: setScaleValue,
    setNew: setNewScale
  };
})();
