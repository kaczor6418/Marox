function createRegex(restrictedWords) {
  return new RegExp('(' + restrictedWords.join('|') + ')', 'ig');
}

function searchForVulgar(message, regex) {
  return regex.test(message);
}

function youAreVulgar(message, errors) {
  message.value = '';
  message.placeholder = 'Proszę nie użwyać wulgaryzmów';
  message.classList.add('error');
  errors.push(message.dataset.error);
  displayErrors(errors, form);
}

function checkMessage(errors) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET','http://localhost/Marox/restrictedWords/pl-pl.html');
  xhr.onload = function() {
      let restrictedWords = (xhr.responseText).split(/, */),
          regex = createRegex(restrictedWords),
          form = document.querySelector('.myForm'),
          message = form.querySelector('textarea'),
          result = searchForVulgar(message.value, regex);
      if (result === true) {
        youAreVulgar(message, errors);
      }
      else {
        form.submit();
      }
  }
  xhr.send();
}
