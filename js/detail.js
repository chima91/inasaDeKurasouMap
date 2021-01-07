$(function() {
    $("#hamburger").click(function() {
        $(this).toggleClass("ham-open");
        if($(this).hasClass("ham-open")) {
            $("#menu-black-close").css({
                "z-index":"2",
                "opacity":".7"
            })
        } else {
            $("#menu-black-close").css({
                "z-index":"-1",
                "opacity":"0"
            })
        }
    });
    $("#menu-black-close").click(function() {
        $("#hamburger").removeClass("ham-open");
        $(this).css({
            "z-index":"-1",
            "opacity":"0"
        })
    });

    let id = location.search;
    id = id.slice(4);
    setTimeout(function() {
        let detailH1 = '';
        let detailMap = '';
        let detailUl = '';
        for(let h = 0; h < jsonArray.length; h++) {
            for(let i = 0; i < jsonArray[h].length; i++) {
                if(jsonArray[h][i]['id'] == id) {
                    document.title = `「${jsonArray[h][i]['名称']}」の詳細 - いなさで暮らそうマップ`;
                    detailH1 += jsonArray[h][i]['名称'];

                    if(jsonArray[h][i]['緯度'] != null) {detailMap += `<iframe src="https://maps.google.co.jp/maps?output=embed&q=${jsonArray[h][i]['緯度']},${jsonArray[h][i]['経度']}&gestureHandling=greedy" style="width: 100%; height: 400px; border: none;"></iframe>`;}

                    detailUl += `<p><b>名称</b>：${jsonArray[h][i]['名称']}</p>`;
                    if(jsonArray[h][i]['郵便番号'] != null) {detailUl += `<p><b>郵便番号</b>：${jsonArray[h][i]['郵便番号']}</p>`;}
                    if(jsonArray[h][i]['住所'] != null) {detailUl += `<p><b>住所</b>：${jsonArray[h][i]['住所']}</p>`;}
                    if(jsonArray[h][i]['最寄りのバス停'] != null) {detailUl += `<p><b>最寄りのバス停</b> → ${jsonArray[h][i]['最寄りのバス停']}</p>`;}
                    if(jsonArray[h][i]['営業時間'] != null) {detailUl += `<p><b>営業時間</b>：${jsonArray[h][i]['営業時間']}</p>`;}
                    if(jsonArray[h][i]['定休日'] != null) {detailUl += `<p><b>定休日</b>：${jsonArray[h][i]['定休日']}</p>`;}
                    if(jsonArray[h][i]['電話番号'] != null) {detailUl += `<p><b>電話番号</b>：${jsonArray[h][i]['電話番号']}</p>`;}
                    if(jsonArray[h][i]['FAX'] != null) {detailUl += `<p><b>FAX</b>：${jsonArray[h][i]['FAX']}</p>`;}
                    if(jsonArray[h][i]['URL'] != null) {detailUl += `<p><b>URL</b>：<a id="detail-url" href="${jsonArray[h][i]['URL']}" target="_blank">ホームページはこちら</a></p>`;}

                    if(jsonArray[h][i]['取り扱っている商品'] != null) {detailUl += `<p><b>取り扱っている商品</b>：${jsonArray[h][i]['取り扱っている商品']}</p>`;}
                    if(jsonArray[h][i]['配達サービス'] != null) {detailUl += `<p><b>配達サービス</b>：${jsonArray[h][i]['配達サービス']}</p>`;}
                    if(jsonArray[h][i]['配達対応商品'] != null) {detailUl += `<p><b>配達対応商品</b>：${jsonArray[h][i]['配達対応商品']}</p>`;}
                    if(jsonArray[h][i]['配達可能な範囲'] != null) {detailUl += `<p><b>配達可能な範囲</b>：${jsonArray[h][i]['配達可能な範囲']}</p>`;}
                    if(jsonArray[h][i]['配達条件'] != null) {detailUl += `<p><b>配達条件</b>：${jsonArray[h][i]['配達条件']}</p>`;}

                    if(jsonArray[h][i]['席数'] != null) {detailUl += `<p><b>席数</b>：${jsonArray[h][i]['席数']}</p>`;}

                    if(jsonArray[h][i]['ボランティアの内容'] != null) {detailUl += `<p><b>ボランティアの内容</b>：${jsonArray[h][i]['ボランティアの内容']}</p>`;}
                    if(jsonArray[h][i]['会場'] != null) {detailUl += `<p><b>会場</b>：${jsonArray[h][i]['会場']}</p>`;}
                    if(jsonArray[h][i]['参加対象者'] != null) {detailUl += `<p><b>参加対象者</b>：${jsonArray[h][i]['参加対象者']}</p>`;}
                    if(jsonArray[h][i]['日時'] != null) {detailUl += `<p><b>日時</b>：${jsonArray[h][i]['日時']}</p>`;}
                    if(jsonArray[h][i]['募集期間'] != null) {detailUl += `<p><b>募集期間</b>：${jsonArray[h][i]['募集期間']}</p>`;}
                    if(jsonArray[h][i]['運営者'] != null) {detailUl += `<p><b>運営者</b>：${jsonArray[h][i]['運営者']}</p>`;}
                    if(jsonArray[h][i]['連絡先'] != null) {detailUl += `<p><b>連絡先</b>：${jsonArray[h][i]['連絡先']}</p>`;}

                    if(jsonArray[h][i]['種別'] != null) {detailUl += `<p><b>種別</b>：${jsonArray[h][i]['種別']}</p>`;}

                    if(jsonArray[h][i]['サービス内容'] != null) {detailUl += `<p><b>サービス内容</b>：${jsonArray[h][i]['サービス内容']}</p>`;}

                    if(jsonArray[h][i]['該当地域'] != null) {detailUl += `<p><b>該当地域</b>：${jsonArray[h][i]['該当地域']}</p>`;}
                    if(jsonArray[h][i]['開催回数'] != null) {detailUl += `<p><b>開催回数</b>：${jsonArray[h][i]['開催回数']}</p>`;}

                    if(jsonArray[h][i]['できること'] != null) {detailUl += `<p><b>できること</b>：${jsonArray[h][i]['できること']}</p>`;}
                    if(jsonArray[h][i]['備考'] != null) {detailUl += `<p><b>備考</b>：${jsonArray[h][i]['備考']}</p>`;}
                }
            }
        }
        document.getElementsByTagName('h1')[0].innerHTML = detailH1;
        document.getElementById('detail-map').innerHTML = detailMap;
        document.getElementById('detail').innerHTML = detailUl;
    }, 200);
});

function getExcel(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.send();

    let jsonList = [];
    req.onload = function() {
        let uint8 = new Uint8Array(req.response);
        let workbook = XLSX.read(uint8, {type: "array"});
        let sheet_name_list = workbook.SheetNames;
        for(let t = 0; t < sheet_name_list.length; t++) {
            let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[t]]);
            jsonList.push(sheet);
        }
    };

    return jsonList;
}
let jsonArray = getExcel('./inasa-syakaishigen20201228.xlsx');