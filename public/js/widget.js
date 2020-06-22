(function initElement() {
  const clickable = document.getElementsByClassName('clickable');
  for (const element of clickable) {
    const id = element.id;
    element.addEventListener('click', () => {
      window.location.href = window.location.href + '/' + id;
    });
  }
})();
