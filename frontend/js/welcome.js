(function () {
  var timeout;
  var dialogs = document.getElementsByClassName('dialog-image');
  var initAnimation = function () {
    clearTimeout(timeout);
    for (var i = 0; i < 5; i++) {
      (function (internal) {
        setTimeout(function () {
          if (internal !== 4) {
            dialogs[internal].classList.add('in');
          }
          else {
            expandBottom();
          }
        }, internal * 1000 + Math.floor(Math.random() * 800))
      })(i)
    }
  }
  window.addEventListener('load', initAnimation)
  timeout = setTimeout(initAnimation, 5000);

  var bottom = document.getElementById('bottom');
  var container = document.getElementById('container');
  var inputBox = document.getElementById('inputBox');
  var okBotton = document.getElementById('okButton');
  var noBotton = document.getElementById('noBotton');
  var queryBotton = document.getElementById('queryBotton');
  var anotherOkBotton = document.getElementById('anotherOkBotton');
  var dialogWrapper = document.getElementById('dialogWrapper');

  var stage = 0;

  var expandBottom = function () {
    if (stage === 2) {
      dialogWrapper.classList.add('go-top');
    }
    bottom.classList.add('expanded');
  }

  var hideBottom = function () {
    if (stage === 2) {
      dialogWrapper.classList.remove('go-top');
    }
    bottom.classList.remove('expanded');
  }

  var goToQuery = function () {
    window.location.href = './query.html';
  }

  var goToConfirm = function () {
    window.location.href = './confirm.html';
  }

  var goToStage2 = function () {
    dialogs[4].classList.add('in');
    for (var i = 5; i < 7; i++) {
      (function (internal) {
        setTimeout(function () {
          dialogs[internal].classList.add('in');
          if (internal === 5) {
            dialogWrapper.classList.add('go-second-top');
          }
          if (internal === 6) {
            dialogWrapper.classList.add('go-top');
            dialogWrapper.classList.remove('go-second-top');
            stage = 2;
          }
        }, (internal - 4) * 1000 + Math.floor(Math.random() * 800))
      })(i)

    }
    okBotton.classList.add('hide');
    noBotton.classList.add('hide');
    queryBotton.classList.add('hide');
    anotherOkBotton.classList.remove('hide');
  }

  inputBox.addEventListener('click', expandBottom);
  container.addEventListener('click', hideBottom);
  okBotton.addEventListener('click', goToConfirm);
  anotherOkBotton.addEventListener('click', goToConfirm);
  queryBotton.addEventListener('click', goToQuery);

  noBotton.addEventListener('click', goToStage2);
})();