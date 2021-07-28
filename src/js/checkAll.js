import { dekirukotoList } from "./dkrSearch";

// すべて(介護・医療サービスのサブチェックも)にチェックを入れる関数
export function checkAll() {
  document.querySelector('#check-all').addEventListener('click', function() {
    for(let i = 0; i < dekirukotoList.length; i++) {
      dekirukotoList[i].checked = true;
    }

    const check7 = document.querySelector('#check7');
    const subCheck = document.querySelector('#sub-check');

    check7.checked ? subCheck.style.display = 'block' : subCheck.style.display = 'none';
  });
}