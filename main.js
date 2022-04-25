function Validator(options) {

  console.log(options.erS)

  function validate(inputElement, rule){
    var eMes = rule.test(inputElement.value);
    var errorForm = inputElement.parentElement.querySelector(options.erS);

    if (eMes) {
     errorForm.innerText = eMes;
     inputElement.parentElement.classList.add('invalid')
    
    }else {
      errorForm.innerText = '';
      inputElement.parentElement.classList.remove('invalid')
    }

  }
function delEmes(inputElement){

    var errorForm = inputElement.parentElement.querySelector(options.erS);
    errorForm.innerText = '';
    inputElement.parentElement.classList.remove('invalid')
  }
var formElement = document.querySelector(options.form)
  
  if (formElement) {
    options.rules.forEach(function (rule){
      
      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        inputElement.onblur = function () {
            
          validate(inputElement, rule);
           
        }
        inputElement.oninput = function() {
          delEmes(inputElement);
        }
      }
    });
  }

}

Validator.isRequired = function(selector) {
  return { selector: selector,
            test: function(value){
              return value.trim() ? undefined : " Invalid"
            }};

}
Validator.isEmail = function(selector) {
  return { selector: selector,
    test: function(value){
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(value) ? undefined : "Email Invalid"
  
    }};
}
Validator.minLength = function(selector, min) {
  return { selector: selector,
            test: function(value){
              return value.length >= min  ? undefined : `At least ${min}} chars`
            }};

}


