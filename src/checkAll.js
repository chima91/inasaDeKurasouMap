// すべてにチェックを入れる関数
export function checkAll() {
    for(let i = 0; i < dekirukotoList.length; i++) {
        dekirukotoList[i].checked = true;
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