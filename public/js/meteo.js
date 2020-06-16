(function initElement()
{
  var clicable = document.getElementsByClassName("clicable");
  console.log(clicable);
  elem1 = document.forms[0];
  elem1.onclick = showAlert;
})();

function showAlert()
{
  alert("Evènement de click détecté");
}

