import $ from "jquery";

export function checkOpenClose() {
    $("#check-open-close").click(function() {
        $(this).toggleClass("check-open-close");
        if($(this).hasClass("check-open-close")) {
            $(this).text('開く');
        } else {
            $(this).text('閉じる');
        }
    });
}
