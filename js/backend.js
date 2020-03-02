'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SEND_URL = 'https://js.dump.academy/kekstagram';

  var processServerStatus = function (xhr, onLoad, onError, errorButtonText) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          switch (xhr.status) {
            case 400:
              onError('Ошибка 400: Неверный запрос', errorButtonText);
              break;
            case 403:
              onError('Ошибка 403: Доступ запрещен', errorButtonText);
              break;
            case 404:
              onError('Ошибка 404: Ничего не найдено', errorButtonText);
              break;
            case 500:
              onError('Ошибка 500: Ошибка сервера', errorButtonText);
              break;
            case 502:
              onError('Ошибка 502: Неверный ответ сервера', errorButtonText);
              break;
            case 503:
              onError('Ошибка 503: Сервер временно недоступен', errorButtonText);
              break;
            default:
              onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText, errorButtonText);
          }
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', errorButtonText);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout + 'мс', errorButtonText);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    var xhrLoad = new XMLHttpRequest();
    var errorButtonText = 'Закрыть';
    xhrLoad.open('GET', LOAD_URL);
    processServerStatus(xhrLoad, onLoad, onError, errorButtonText);
    xhrLoad.send();
  };

  var send = function (data, onLoad, onError) {
    var xhrSend = new XMLHttpRequest();
    var errorButtonText = 'Загрузить другой файл';
    xhrSend.open('POST', SEND_URL);
    processServerStatus(xhrSend, onLoad, onError, errorButtonText);
    xhrSend.send(data);
  };

  window.backend = {
    load: load,
    send: send,
  };
})();
