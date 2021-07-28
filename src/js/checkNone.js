import { dekirukotoList } from "./dkrSearch";

// すべて(介護・医療サービスのサブチェック以外)のチェックを外す関数
export function checkNone() {
  document.querySelector('#check-none').addEventListener('click', function() {
    for(let i = 0; i < dekirukotoList.length; i++) {
      if(i >= 7 && i <= 13) continue;
      dekirukotoList[i].checked = false;
    }

    const check7 = document.querySelector('#check7');
    const subCheck = document.querySelector('#sub-check');

    check7.checked ? subCheck.style.display = 'block' : subCheck.style.display = 'none';
  });
}