(function() {

    var form = document.querySelector(".myForm"),
        fields = form.querySelectorAll("[data-error]");
    
    function isEmpty(field) {
      return field.value !== "";
    }
    
    function isAtLeast(field, min) {
      return field.value.length > min;
    }
    
    function isEmail(field) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(field).toLowerCase());
    }
    
    function displayErrors(errors) {
      var ul = document.querySelector("ul.errors");
    
      if(!ul) {
        ul = document.createElement("ul");
        ul.classList.add("errors");
      }
    
      ul.innerHTML = "";
    
      errors.forEach(function (error) {
        let li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
      });
    
      form.parentNode.insertBefore(ul, form);
    
    }
    
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    
      let errors = [];
    
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i],
            isValid = null;
    
        switch (field.type) {
          case "text":
            isValid = isEmpty(field);
            break;
          case "email":
            isValid =  isEmail(field);
            break;
          case "select-one":
            isValid = isEmpty(field);
            break;
          case "textarea":
            isValid = isAtLeast(field, 3);
            break;
          default:
        }
    
        if (!isValid) {
          field.classList.add("error");
          errors.push(field.dataset.error);
        }else {
          field.classList.remove("error");
        }
      }
      if(errors.length) {
        displayErrors(errors);
      }else {
        form.submit();
      }
    
    console.log(errors);
    
    }, false)
    })();