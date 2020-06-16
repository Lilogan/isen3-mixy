(function initElement() {
  const clicable = document.getElementsByClassName('clicable');
  for (const element of clicable) {
    const name = element.getAttribute('name');
    element.addEventListener('click', () => {
      window.location.href = window.location.href + name;
    });
  }
})();
