let markers = [];
let infoWindows = [];

// コールバック関数
function initMap() {
    setTimeout(function() {
        map1 = new google.maps.Map(document.getElementById('inasa-map'), { // あえてlet, const, varをつけずにグローバル変数にした。
            center: { lat: 34.851887, lng: 137.673219 },
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'greedy' // 地図を指1本で操作できるように。
        });

        // マーカーおよび情報ウィンドウの配列を生成するforループ
        let iconInfo;
        let count = 0;
        for(let h = 0; h < jsonArray.length; h++) {
            if(sheet_name_list[h] == 'サロン') {
                iconInfo = {
                    url: "./img/pin-icon/saron.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == '介護サービス事業所') {
                iconInfo = {
                    url: "./img/pin-icon/kaigo.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == '障害サービス事業所') {
                iconInfo = {
                    url: "./img/pin-icon/syougai.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == 'ボランティア') {
                iconInfo = {
                    url: "./img/pin-icon/volunteer.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == '喫茶店・カフェ・カラオケ') {
                iconInfo = {
                    url: "./img/pin-icon/kissa.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == '商店') {
                iconInfo = {
                    url: "./img/pin-icon/syouten.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            } else if(sheet_name_list[h] == '薬局') {
                iconInfo = {
                    url: "./img/pin-icon/yakkyoku.png",
                    scaledSize: new google.maps.Size(35, 35)
                }
            }
            for(let i = 0; i < jsonArray[h].length; i++, count++) {
                markers[count] = new google.maps.Marker({
                    position: new google.maps.LatLng(jsonArray[h][i]['緯度'], jsonArray[h][i]['経度']),
                    map: map1,
                    icon: iconInfo
                    // label: jsonArray[h][i]['ラベル']
                });
                infoWindows[count] = new google.maps.InfoWindow({
                    content: `<b>${jsonArray[h][i]['名称']}</b><p>${jsonArray[h][i]['住所']}</p><a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #5341d3">詳細ページ</a>`,
                    // disableAutoPan: true
                });
                markerEvent(count);
            }
        }

        let currentInfoWindow = null;
        // マーカーをクリックしたら情報ウィンドウを表示する関数
        // (既に情報ウィンドウが出ていた場合はそれを消してから新しい情報ウィンドウを表示する)
        function markerEvent(arrayIndex) {
            markers[arrayIndex].addListener('click', function() {
                if(currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindows[arrayIndex].open(map1, markers[arrayIndex]);
                currentInfoWindow = infoWindows[arrayIndex];
            });
        }

        document.getElementById('hit-count').textContent = `引佐町には${markers.length}件の社会資源があります！`;
    }, 200)
}

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

    $("#check-close").click(function() {
        $(this).toggleClass("check-close");
        if($(this).hasClass("check-close")) {
            $(this).attr("value", "開く");
        } else {
            $(this).attr("value", "閉じる");
        }
    });

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
});

// Excelシートを読み込んでJSONに変換する関数
function getExcel(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.send();

    let jsonList = [];
    req.onload = function() {
        let unit8 = new Uint8Array(req.response);
        let workbook = XLSX.read(unit8, {type: "array"});
        sheet_name_list = workbook.SheetNames; // グローバル変数
        for(let t = 0; t < sheet_name_list.length; t++) {
            let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[t]]);
            jsonList.push(sheet);
        }
    };
    return jsonList;
}
let jsonArray = getExcel('./inasa-syakaishigen20201225.xlsx');

// function getCsv(url) {
//     //CSVファイルを文字列で取得。
//     var txt = new XMLHttpRequest();
//     txt.open('get', url, false);
//     txt.send();

//     //改行ごとに配列化
//     var arr = txt.responseText.split('\n');

//     //1次元配列を2次元配列に変換
//     var res = [];
//     for(var i = 0; i < arr.length; i++){
//         //空白行が出てきた時点で終了
//         if(arr[i] == '') break;

//         //","ごとに配列化
//         res[i] = arr[i].split(',');
//     }

//     return res;
// }
// let yakkyokuCsv = getCsv('./csv/20201112薬局.csv');
// let yakkyokuArray = [];
// for(let x = 3; x < yakkyokuCsv.length; x++) {
//     yakkyokuArray.push({
//         lat: yakkyokuCsv[x][9],
//         lng: yakkyokuCsv[x][10],
//         content: `<b>${yakkyokuCsv[x][0]}</b><p>${yakkyokuCsv[x][2]}</p><a href="./syousai.html" style="color: #5341d3">詳細ページ</a>`,
//         dekirukotoArray: yakkyokuCsv[x][11].split('、')
//     })
// }

const dekirukotoList = document.form1.dekirukoto;

// チェックボックスで検索する関数
function dkrSearch() {
    let dkrSearchCount = 0;
    let visibleCount = 0;
    let checkResultUl = '';
    for(let h = 0; h < jsonArray.length; h++) {
        for(let i = 0; i < jsonArray[h].length; i++, dkrSearchCount++) {
            if(markers[dkrSearchCount] != null) {
                    if(((jsonArray[h][i]['できること'].includes('買い物')) && (dekirukotoList[0].checked)) || ((jsonArray[h][i]['できること'].includes('集う')) && (dekirukotoList[1].checked)) || ((jsonArray[h][i]['できること'].includes('気分転換')) && (dekirukotoList[2].checked)) || ((jsonArray[h][i]['できること'].includes('体を動かす')) && (dekirukotoList[3].checked)) || ((jsonArray[h][i]['できること'].includes('刺激を受ける')) && (dekirukotoList[4].checked)) || ((jsonArray[h][i]['できること'].includes('食事')) && (dekirukotoList[5].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['id'].includes('2_')) && (dekirukotoList[6].checked) && (dekirukotoList[7].checked)) || ((jsonArray[h][i]['できること'].includes('出かける')) && (dekirukotoList[14].checked)) || ((jsonArray[h][i]['できること'].includes('ボランティア')) && (dekirukotoList[15].checked)) || ((jsonArray[h][i]['できること'].includes('相談する')) && (dekirukotoList[16].checked))) {
                        markers[dkrSearchCount].setVisible(true);
                    } else if((jsonArray[h][i]['種別'] != null) && (((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('デイサービス')) && (dekirukotoList[6].checked) && (dekirukotoList[8].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ヘルパー')) && (dekirukotoList[6].checked) && (dekirukotoList[9].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ショートステイ')) && (dekirukotoList[6].checked) && (dekirukotoList[10].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('入所施設')) && (dekirukotoList[6].checked) && (dekirukotoList[11].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('就労支援')) && (dekirukotoList[6].checked) && (dekirukotoList[12].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('相談窓口')) && (dekirukotoList[6].checked) && (dekirukotoList[13].checked)))) {
                        markers[dkrSearchCount].setVisible(true);
                    } else {
                        markers[dkrSearchCount].setVisible(false);
                    }

                if(markers[dkrSearchCount].getVisible()) {
                    visibleCount++;
                    checkResultUl += `<li><b>${jsonArray[h][i]['名称']}（<a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #ccccee">詳細ページ</a>）</b>`;
                    if(jsonArray[h][i]['住所'] != null) {
                        checkResultUl += `<p>${jsonArray[h][i]['住所']}</p>`;
                    }
                    if(sheet_name_list[h] == '介護サービス事業所') {
                        checkResultUl += '<img src="./img/koureisya-icon.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                    }
                    if(sheet_name_list[h] == '障害サービス事業所') {
                        checkResultUl += '<img src="./img/syougaisya-icon.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                    }
                    if(jsonArray[h][i]['種別'] != null) {
                        if(jsonArray[h][i]['種別'].includes('デイサービス')) {
                            checkResultUl += '<img src="./img/icon-day.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        if(jsonArray[h][i]['種別'].includes('ヘルパー')) {
                            checkResultUl += '<img src="./img/icon-helper.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        if(jsonArray[h][i]['種別'].includes('ショートステイ')) {
                            checkResultUl += '<img src="./img/icon-short.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        if(jsonArray[h][i]['種別'].includes('入所施設')) {
                            checkResultUl += '<img src="./img/icon-nyuusyo.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        if(jsonArray[h][i]['種別'].includes('就労支援')) {
                            checkResultUl += '<img src="./img/icon-syuurou.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        if(jsonArray[h][i]['種別'].includes('相談窓口')) {
                            checkResultUl += '<img src="./img/icon-soudan.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                    }
                    checkResultUl += '</li><hr>'
                }
            }
        }
    }
    document.getElementById('hit-count').textContent = `${visibleCount}件の社会資源がヒットしました`;
    document.getElementById('check-result').innerHTML = checkResultUl;
}

// すべてにチェックを入れる関数
function checkAll() {
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

// すべてのチェックを外す関数
function checkNone() {
    for(let i = 0; i < dekirukotoList.length; i++) {
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

// 現在地を取得してマーカーを描画する関数
let currentMarker;
function getCurrentLocation() {
    if(!navigator.geolocation) return;

    let currentLocateImg = {
        url: "./img/pin-icon/current-location.png",
        scaledSize: new google.maps.Size(50, 50),
        labelOrigin: new google.maps.Point(24, 60)
    }

    function success(position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        let currentLatlng = new google.maps.LatLng(currentLatitude, currentLongitude);

        if(currentMarker == null) {
            currentMarker = new google.maps.Marker({
                position: currentLatlng,
                map: map1,
                icon: currentLocateImg,
                label: "現在地"
            });
        }

        map1.setCenter(currentLatlng);
    };

    function error() {
        alert("現在地の取得に失敗しました");
    };

    navigator.geolocation.getCurrentPosition(success, error);
}