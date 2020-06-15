(function initElement()
{
  var clicable = document.getElementsByClassName("clicable");
  console.log(clicable);
  clicable.item(0).onclick = showAlert;
})();

function showAlert()
{
  alert("Evènement de click détecté");
}
