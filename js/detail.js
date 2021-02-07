$(function() {
    let jsonArray;
    async function getJson() {
        const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=IU_majGmfwhE3mUp_8IbeYXMZGsM-xSgesgOrQlxeRjbEWKzN7lNy_NWu5oeFUl8ERpuU1kNWNH6EBN5xJyYeLTOpHM97A3Im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC-NnOpEyNUv90qldEvbLL6Xz1GBq_6Bya6TkKlYhFQE4JamSXLtQT8AI_WHbeHRt2Oqk0FkhV_QGGaU2pP6Ntk&lib=MLUBSv-keSXYUu5ZSNCbXyjlewnNH1PVR');
        const data = await res.json();
        return data;
    }
    getJson()
        .then(data => {
            endLoading();
            jsonArray = data;
            let detailH1 = '';
            let detailMap = '';
            let detailUl = '';
            let id = location.search;
            id = id.slice(4);
            for(let h = 0; h < jsonArray.length; h++) {
                for(let i = 0; i < jsonArray[h].length; i++) {
                    if(jsonArray[h][i]['id'] == id) {
                        document.title = `「${jsonArray[h][i]['名称']}」の詳細 - いなさで暮らそうマップ`;
                        detailH1 += jsonArray[h][i]['名称'];

                        if(jsonArray[h][i]['緯度']) detailMap += `<iframe src="https://maps.google.co.jp/maps?output=embed&q=${jsonArray[h][i]['緯度']},${jsonArray[h][i]['経度']}&gestureHandling=greedy" style="width: 100%; height: 400px; border: none;"></iframe>`;

                        detailUl += `<p><b>名称</b>：${jsonArray[h][i]['名称']}</p>`;
                        if(jsonArray[h][i]['郵便番号']) detailUl += `<p><b>郵便番号</b>：${jsonArray[h][i]['郵便番号']}</p>`;
                        if(jsonArray[h][i]['住所']) detailUl += `<p><b>住所</b>：${jsonArray[h][i]['住所']}</p>`;
                        if(jsonArray[h][i]['最寄りのバス停']) detailUl += `<p><b>最寄りのバス停</b>：${jsonArray[h][i]['最寄りのバス停']}</p>`;
                        if(jsonArray[h][i]['営業時間']) detailUl += `<p><b>営業時間</b>：${jsonArray[h][i]['営業時間']}</p>`;
                        if(jsonArray[h][i]['定休日']) detailUl += `<p><b>定休日</b>：${jsonArray[h][i]['定休日']}</p>`;
                        if(jsonArray[h][i]['電話番号']) detailUl += `<p><b>電話番号</b>：${jsonArray[h][i]['電話番号']}</p>`;
                        if(jsonArray[h][i]['FAX']) detailUl += `<p><b>FAX</b>：${jsonArray[h][i]['FAX']}</p>`;
                        if(jsonArray[h][i]['URL']) detailUl += `<p><b>URL</b>：<a id="detail-url" href="${jsonArray[h][i]['URL']}" target="_blank">ホームページはこちら</a></p>`;

                        if(jsonArray[h][i]['取り扱っている商品']) detailUl += `<p><b>取り扱っている商品</b>：${jsonArray[h][i]['取り扱っている商品']}</p>`;
                        if(jsonArray[h][i]['配達サービス']) detailUl += `<p><b>配達サービス</b>：${jsonArray[h][i]['配達サービス']}</p>`;
                        if(jsonArray[h][i]['配達対応商品']) detailUl += `<p><b>配達対応商品</b>：${jsonArray[h][i]['配達対応商品']}</p>`;
                        if(jsonArray[h][i]['配達可能な範囲']) detailUl += `<p><b>配達可能な範囲</b>：${jsonArray[h][i]['配達可能な範囲']}</p>`;
                        if(jsonArray[h][i]['配達条件']) detailUl += `<p><b>配達条件</b>：${jsonArray[h][i]['配達条件']}</p>`;

                        if(jsonArray[h][i]['席数']) detailUl += `<p><b>席数</b>：${jsonArray[h][i]['席数']}</p>`;

                        if(jsonArray[h][i]['ボランティアの内容']) detailUl += `<p><b>ボランティアの内容</b>：${jsonArray[h][i]['ボランティアの内容']}</p>`;
                        if(jsonArray[h][i]['会場']) detailUl += `<p><b>会場</b>：${jsonArray[h][i]['会場']}</p>`;
                        if(jsonArray[h][i]['参加対象者']) detailUl += `<p><b>参加対象者</b>：${jsonArray[h][i]['参加対象者']}</p>`;
                        if(jsonArray[h][i]['日時']) detailUl += `<p><b>日時</b>：${jsonArray[h][i]['日時']}</p>`;
                        if(jsonArray[h][i]['募集期間']) detailUl += `<p><b>募集期間</b>：${jsonArray[h][i]['募集期間']}</p>`;
                        if(jsonArray[h][i]['運営者']) detailUl += `<p><b>運営者</b>：${jsonArray[h][i]['運営者']}</p>`;
                        if(jsonArray[h][i]['連絡先']) detailUl += `<p><b>連絡先</b>：${jsonArray[h][i]['連絡先']}</p>`;

                        if(jsonArray[h][i]['種別']) detailUl += `<p><b>種別</b>：${jsonArray[h][i]['種別']}</p>`;

                        if(jsonArray[h][i]['サービス内容']) detailUl += `<p><b>サービス内容</b>：${jsonArray[h][i]['サービス内容']}</p>`;

                        if(jsonArray[h][i]['該当地域']) detailUl += `<p><b>該当地域</b>：${jsonArray[h][i]['該当地域']}</p>`;
                        if(jsonArray[h][i]['開催回数']) detailUl += `<p><b>開催回数</b>：${jsonArray[h][i]['開催回数']}</p>`;

                        if(jsonArray[h][i]['できること']) detailUl += `<p><b>できること</b>：${jsonArray[h][i]['できること']}</p>`;
                        if(jsonArray[h][i]['備考']) detailUl += `<p><b>備考</b>：${jsonArray[h][i]['備考']}</p>`;
                    }
                }
            }
            document.getElementsByTagName('h1')[0].innerHTML = detailH1;
            document.getElementById('detail-map').innerHTML = detailMap;
            document.getElementById('detail').innerHTML = detailUl;
        })
        .catch(err => {
            console.log(err);
        })

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
});

function endLoading() {
    // 1秒かけてロゴを非表示にし、その後0.8秒かけて背景を非表示にする。
    $('#loading img, #loading p').fadeOut(500, function() {
        $('#loading').fadeOut(300);
    });
}

// function getExcel(url) {
//     let req = new XMLHttpRequest();
//     req.open("GET", url, true);
//     req.responseType = "arraybuffer";
//     req.send();

//     let jsonList = [];
//     req.onload = function() {
//         let uint8 = new Uint8Array(req.response);
//         let workbook = XLSX.read(uint8, {type: "array"});
//         let sheet_name_list = workbook.SheetNames;
//         for(let t = 0; t < sheet_name_list.length; t++) {
//             let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[t]]);
//             jsonList.push(sheet);
//         }
//     };

//     return jsonList;
// }
// let jsonArray = getExcel('./inasa-syakaishigen20201228.xlsx');