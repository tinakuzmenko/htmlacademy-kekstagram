'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;
  var closeImageEditor = window.uploadForm.close;
  var showErrorMessage = window.error.show;

  var uploadInput = document.querySelector('.img-upload__input');
  var effectsPreview = imageEditor.querySelectorAll('.effects__preview');

  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageUploadPreview.src = reader.result;

        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style = 'background-image: url("' + reader.result + '");';
        }
      });

      reader.readAsDataURL(file);
    } else {
      closeImageEditor();
      showErrorMessage('Недопустимый формат. Фотография должна быть в формате gif, jpg, jpeg или png!', 'Загрузить другую фотографию');
    }
  });
})();
