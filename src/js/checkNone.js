import $ from "jquery";
import { dekirukotoList } from "./dkrSearch";

// すべて(介護・医療サービスのサブチェック以外)のチェックを外す関数
export function checkNone() {
    $("#check-none").on("click", function() {
        for(let i = 0; i < dekirukotoList.length; i++) {
            if(i >= 7 && i <= 13) continue;
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
    })

}