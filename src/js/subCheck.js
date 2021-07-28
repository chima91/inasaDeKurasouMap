export function subCheck() {
  const check7 = document.querySelector('#check7');
  const subCheck = document.querySelector('#sub-check');

  check7.addEventListener('change', function() {
    check7.checked
      ? subCheck.style.display = 'block'
      : subCheck.style.display = 'none';
  })
}