export function endLoading() {
  const load = document.querySelector('#loading');
  load.classList.add('fadeout');
  setTimeout(function() {
    load.style.display = "none";
  }, 500);
}