import $ from "jquery";

export function subCheck() {
    $("#check7").change(function() {
        if($("#checkbox #check7").prop("checked")) {
            $("#checkbox #sub-check").css({
                "display":"block"
            })
        } else {
            $("#checkbox #sub-check").css({
                "display":"none"
            })
        }
    });
}