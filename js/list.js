$(function() {
    let jsonArray;
    async function getJson() {
        const res = await fetch('https://script.google.com/macros/s/AKfycbwGujh3rbX9fIS_wDCZQMlBuI_IhJQQJK5WMYiqik7QQcsIwj4yLIoU/exec');
        const data = await res.json();
        return data;
    }
    getJson()
        .then(data => {
            endLoading();
            jsonArray = data;
            let readResultUl = '';
            for(let h = 0; h < jsonArray.length; h++) {
                // readResultUl += `<h2>${sheet_name_list[h]}</h2><ul style="margin: 0 20px 70px 20px;">`;
                readResultUl += `<h2>${jsonArray[h][0]['社会資源の種類']}</h2><ul style="margin: 0 20px 70px 20px;">`;
                for(let i = 0; i < jsonArray[h].length; i++) {
                    readResultUl += `<li><b>${jsonArray[h][i]['名称']}</b>`;
                    if(jsonArray[h][i]['住所']) readResultUl += `<p>住所：${jsonArray[h][i]['住所']}</p>`;
                    readResultUl += `<p>できること：${jsonArray[h][i]['できること']}</p>`;
                    if(jsonArray[h][i]['配達サービス'] == 'あり') readResultUl += '<p>配達サービス：あり</p>';
                    readResultUl += `<a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #5341d3">詳細ページ</a></li><hr>`;
                }
                readResultUl += '</ul>';
            }
            document.getElementById('list-table').innerHTML = readResultUl;
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
//         sheet_name_list = workbook.SheetNames; // グローバル変数
//         for(let t = 0; t < sheet_name_list.length; t++) {
//             let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[t]]);
//             jsonList.push(sheet);
//         }
//     };

//     return jsonList;
// }
// let jsonArray = getExcel('./inasa-syakaishigen20201228.xlsx');