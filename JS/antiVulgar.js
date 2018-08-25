(function () {
  var submitMessage = document.querySelector('.myForm');

  function createRegex(restrictedWords) {
    return new RegExp('(' + restrictedWords.join('|') + ')', 'ig');
  }

  function searchForVulgar(message, regex) {
    return regex.test(message);
  }

  submitMessage.addEventListener('submit', function (e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost/Marox/restrictedWords/pl-pl.html');
    xhr.onload = function(){
        let restrictedWords = (xhr.responseText).split(/, */),
            message = document.querySelector('.myForm textarea');
            regex = createRegex(restrictedWords),
            result = searchForVulgar(message.value, regex);
            console.log('result: ' + result);
        if (result === true) {
          message.value = '';
          message.placeholder = 'Proszę nie użwyać wulgaryzmów';
        }
    }
    xhr.send();
  });
})();
