function AJAX(config) {

    if(!(this instanceof AJAX)) {
      return new AJAX(config);
    }
 
    this._xhr = new XMLHttpRequest();
    this._config = this._extendOptions(config);
    this._assingEvents();
    this._beforeSend(); // load,assign and send json
  }
 
  // if user didn't give config parameters this function will set defaultConfig
  AJAX.prototype._defaultConfig = {
    type: "GET",
    url: window.location.href,
    data: {},
    options: {
      async: true,
      timeout: 0,
      username: null,
      password: null
    },
    headers: {}
  };
 
  AJAX.prototype._extendOptions = function(config) {
   var defaultConfig = JSON.parse(JSON.stringify(this._defaultConfig));
 
    // if user gave config parameters defaultConfig will be overrwrittne by user config
    for (let key in defaultConfig) {
      if (key in config) {
        continue;
      }
      defaultConfig[key] = config[key];
    }   
    return config;
  };
 
  // this function will load all parameters that user set if user didn't 
  // sent any parameters function will set defoult paramters
  AJAX.prototype._open = function() {
    this._xhr.open(
      this._config.type,
      this._config.url,
      this._config.options.async,
      this._config.options.username,
      this._config.options.password
    );
    this._xhr.timeout = this._config.options.timeout;
    this._xhr.setRequestHeader("X-Request-With", "XMLHttpRequest");
  };
 
  AJAX.prototype._assingEvents = function () {
    this._xhr.addEventListener("readystatechange", this._handleResponse.bind(this), false);
    this._xhr.addEventListener("error", this._handleError.bind(this), false);
    this._xhr.addEventListener("abort", this._handleError.bind(this), false);
    this._xhr.addEventListener("timeout", this._handleError.bind(this), false);
  };
 
  AJAX.prototype._beforeSend = function () {
   var isData = Object.keys(this._config.data).length > 0,
       data = null;
     if((this._config.type.toUpperCase() === "POST") && isData) {
       data = this._serializeFormData(this._config.data)
     }else if((this._config.type.toUpperCase() === "GET") && isData) {
       this._config.url += "?" + this._serializedData(this._config.data);
     }
 
     this._open(); // load Ajax object
     this._assingUserHeaders(); // load user veriables
     this._send(data); // send Ajax object
 };
 
  AJAX.prototype._send = function(data) {
    this._xhr.send(data);
  };
 
  // this function will check are user added headers if yes function will join them to Ajax object
 
  AJAX.prototype._assingUserHeaders = function () {
    if(Object.keys(this._config.headers).length){
      for (let key in this._config.headers) {
        this._xhr.setRequestHeader(key, this._config.headers[key]);
      }
    }
  };
 
  
  AJAX.prototype._handleResponse = function () {
    if (this._xhr.readyState === 4 && this._xhr.status >= 200 && this._xhr.status <400) {
      if(typeof this._config.success === "function") {
        this._config.success(this._xhr.response, this._xhr);
      }
    } else if(this._xhr.readyState === 4 && this._xhr.status >= 400) {
      this._handleError();
    }
  };
 
  AJAX.prototype._handleError = function () {
   if(typeof this._config.failure === "function"){
     this._config.failure(this._xhr);
   }
  };
 
  // add user variables to data and saving data with aed user variables
  AJAX.prototype._serializeFormData = function(data) {
    var serialized = new FormData();
   
    for(let key in data) {
      serialized.append(key, data[key]);
    }
 
    return serialized;
  };
 
  // change 
  AJAX.prototype._serializedData = function(data) {
   var serialized = "";
 
   for(let key in data) {
     serialized += key + "=" + encodeURIComponent(data[key]) + "&";
   }
 
   return serialized.slice(0, serialized.length - 1);
  }
 
 
 AJAX({
      type: "POST",
      url: "odbierz.php",
      data: {
          firstName: "Piotr",
          lastName: "Kowalski"
      }, 
      headers: {
          "X-My-Header": "123#asdf"
      },
      success: function(response, xhr) {
          console.log(response, xhr.status);
      },
      failure: function(xhr) {
          console.log(xhr.status);
      }
  });