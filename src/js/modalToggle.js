export function modalToggle() {
  const wrapper = document.querySelector('#modal-wrapper');

  document.querySelector('#modal-open-btn').addEventListener('click', function(e) {
    e.preventDefault();

    wrapper.classList.remove('modal-fadeout');
    wrapper.classList.add('modal-fadein');
    wrapper.style.display = "block";
  });

  document.querySelectorAll('.modal-close').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      e.preventDefault();

      wrapper.classList.remove('modal-fadein');
      wrapper.classList.add('modal-fadeout');
      setTimeout(function() {
        wrapper.style.display = "none";
      }, 500);
    });
  })
}
