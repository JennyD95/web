
startform= document.getElementById("startform");

var csrfToken = getCookie('csrftoken');
var csrfInput = document.createElement('input');
csrfInput.type = 'hidden';
csrfInput.name = 'csrfmiddlewaretoken';
csrfInput.value = csrfToken;
startform.appendChild(csrfInput);

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
