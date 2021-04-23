// すべて(介護・医療サービスのサブチェック以外)のチェックを外す関数
export function checkNone() {
    for(let i = 0; i < dekirukotoList.length; i++) {
        if(i == 7 || i == 8 || i == 9 || i == 10 || i == 11 || i == 12 || i == 13) continue;
        dekirukotoList[i].checked = false;
    }
    if($("#checkbox #check7").prop("checked")) {
        $("#checkbox #sub-check").css({
            "display":"block"
        })
    } else {
        $("#checkbox #sub-check").css({
            "display":"none"
        })
    }
}