import $ from "jquery";

export function endLoading() {
    // 0.5秒かけてロゴを非表示にし、その後0.3秒かけて背景を非表示にする。
    $('#loading img, #loading p').fadeOut(500, function() {
        $('#loading').fadeOut(300);
    });
}