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
                "z-index":"0",
                "opacity":"0"
            })
        }
    });
    $("#menu-black-close").click(function() {
        $("#hamburger").removeClass("ham-open");
        $(this).css({
            "z-index":"0",
            "opacity":"0"
        })
    });

    setTimeout(function() {
        let syakaishigenCount = 0;
        let readResultUl = '';
        for(let h = 0; h < jsonArray.length; h++) {
            readResultUl += '<ul style="margin: 0 20px 70px 20px;">';
            for(let i = 0; i < jsonArray[h].length; i++, syakaishigenCount++) {
                readResultUl += `<li><b>${jsonArray[h][i]['名称']}</b><p>${jsonArray[h][i]['住所']}</p><a href="./detail.php?id=${jsonArray[h][i]['id']}" style="color: #5341d3">詳細ページ</a></li><hr>`;
            }
            readResultUl += '</ul>';
        }
        document.getElementById('list-table').innerHTML = readResultUl;
    }, 200);

    let idTekito = "4_5";
    setTimeout(function() {
        let syousaiUl = '';
        for(let h = 0; h < jsonArray.length; h++) {
            for(let i = 0; i < jsonArray[h].length; i++) {
                if(jsonArray[h][i]['id'] == idTekito) {
                    syousaiUl += `<b>${jsonArray[h][i]['名称']}</b><p>${jsonArray[h][i]['住所']}</p>`;
                }
            }
        }
        document.getElementById('syousai').innerHTML = syousaiUl;
    }, 200);
});

function getExcel(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.send();

    let jsonList = [];
    req.onload = function() {
        let unit8 = new Uint8Array(req.response);
        let workbook = XLSX.read(unit8, {type: "array"});
        let sheet_name_list = workbook.SheetNames;
        for(let t = 0; t < sheet_name_list.length; t++) {
            let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[t]]);
            jsonList.push(sheet);
        }
    };

    return jsonList;
}
let jsonArray = getExcel('./inasa-syakaishigen.xlsm');