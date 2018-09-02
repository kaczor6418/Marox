var uploadProgress;
function showMessage(type, msg) {
  displayErrors();
  let messageParrent = document.querySelector('.containerForm .status'),
      existingMessage = document.querySelector('.containerForm .status .serverError');
  if (messageParrent.hasChildNodes()) {
    while (messageParrent.firstChild) {
      messageParrent.removeChild(messageParrent.firstChild);
    }
  }
  if(existingMessage){
    existingMessage.textContent = msg;
  } else {
      let messageContainer = document.createElement('div'),
          message = document.createElement('label');

      messageContainer.className = type;
      message.textContent = msg;
      messageContainer.appendChild(message);
      messageParrent.appendChild(messageContainer);
  }
}

function progressAnimation() {
  let sendMsgProg = document.createElement('progress'),
      progressContainer = document.querySelector('.containerForm .status');
      att = [];

      att[0] = document.createAttribute('class');
      att[1] = document.createAttribute('max');
      att[2] = document.createAttribute('value');
      att[0].value = 'upload';
      att[1].value = '100';
      att[2].value = '0';
      att.forEach(function (num) {
        sendMsgProg.setAttributeNode(num);
      });
      progressContainer.appendChild(sendMsgProg);
      uploadProgress = progressContainer.querySelector('upload');
}

function sendEmail() {
  progressAnimation();
  var form = document.querySelector('.myForm'),
      fields = form.querySelectorAll("input, select, textarea"),
      data = {};
  [].forEach.call(fields, function(field) {
    data[field.name] = field.value;
  });
  AJAX({
    type: form.getAttribute("method"),
    url: form.getAttribute("action"),
    data: data,
    success: function(response, xhr) {
      var res = JSON.parse(response);
      if("error" in res) {
        showMessage("serverError", res.error);
      } else if("success" in res) {
        showMessage("serverSuccess", res.success);
        form.removeEventListener("submit", sendEmail, false);
        form.querySelector("button").setAttribute("disabled", "disabled");
      }
    }
  });
  form.addEventListener('submit', sendEmail, false);
}
