export function checkOpenClose() {
  document.querySelector('#check-open-close').addEventListener('click', function() {
    this.classList.toggle('check-open-close');

    this.classList.contains('check-open-close')
      ? this.textContent = '開く'
      : this.textContent = '閉じる';
  })
}
