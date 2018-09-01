var form = document.querySelector('.myForm');
function showMessage(type, msg) {
  var element = document.querySelector('.containerForm h1'),
      messageContainer = document.createElement('div');
      message = document.createElement('label'),
      oldErrors = document.querySelector('.containerForm.errors');

  messageContainer.className = type;
  message.textContent = msg;
  messageContainer.appendChild(message);
  form.insertBefore(messageContainer, form.firstChild);
}

function sendEmail() {

  var fields = form.querySelectorAll("input, select, textarea"),
      data = {};
  [].forEach.call(fields, function(field) {
    data[field.name] = field.value;
  });
  AJAX({
    type: form.getAttribute("method"),
    url: form.getAttribute("action"),
    data: data,
    success: function(response, xhr) {
      console.log(response);
      var res = JSON.parse(response);
      console.log(res);
      if("error" in res) {
        showMessage("serverError", res.error);
      } else if("success" in res) {
        showMessage("success", res.success);
        form.removeEventListener("submit", sendEmail, false);
        form.querySelector("button").setAttribute("disabled", "disabled");
      }
    }
  });
  form.addEventListener('submit', sendEmail, false);
}
