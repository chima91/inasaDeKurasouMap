let markers = [];
let infoWindows = [];

// コールバック関数
function initMap() {
    map1 = new google.maps.Map(document.getElementById('inasa-map'), {  // あえてlet, const, varをつけずにグローバル変数にした。
        center: { lat: 34.861887, lng: 137.673219 },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false
    });

    // マーカーおよび情報ウィンドウの配列を生成するforループ
    let count = 0;
    for(let h = 0; h < arrayList.length; h++) {
        for(let i = 0; i < arrayList[h].length; i++, count++) {
            markers[count] = new google.maps.Marker({
                position: new google.maps.LatLng(arrayList[h][i].lat, arrayList[h][i].lng),
                map: map1,
                // label: arrayList[h][i].label
            });
            infoWindows[count] = new google.maps.InfoWindow({
                content: arrayList[h][i].content,
                // disableAutoPan: true
            });
            console.log(markers.length);
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

    $("#check-close").click(function() {
        $(this).toggleClass("check-open");
        if($(this).hasClass("check-open")) {
            $(this).attr("value", "開く");
        } else {
            $(this).attr("value", "閉じる");
        }
    });
});

function getCsv(url) {
    //CSVファイルを文字列で取得。
    var txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();

    //改行ごとに配列化
    var arr = txt.responseText.split('\n');

    //1次元配列を2次元配列に変換
    var res = [];
    for(var i = 0; i < arr.length; i++){
        //空白行が出てきた時点で終了
        if(arr[i] == '') break;

        //","ごとに配列化
        res[i] = arr[i].split(',');
    }

    return res;
}

let yakkyokuCsv = getCsv('./csv/20201112薬局.csv');
let yakkyokuArray = [];
for(let x = 3; x < yakkyokuCsv.length; x++) {
    yakkyokuArray.push({
        lat: yakkyokuCsv[x][9],
        lng: yakkyokuCsv[x][10],
        content: `<b>${yakkyokuCsv[x][0]}</b><p>${yakkyokuCsv[x][2]}</p><a href="./detail.html" style="color: #5341d3">詳細ページ</a>`,
        dekirukotoArray: yakkyokuCsv[x][11].split('、')
    })
}

let shoutenCsv = getCsv('./csv/20201116商店.csv');
let shoutenArray = [];
for(let x = 3; x < shoutenCsv.length; x++) {
    shoutenArray.push({
        lat: shoutenCsv[x][14],
        lng: shoutenCsv[x][15],
        content: `<b>${shoutenCsv[x][0]}</b><p>${shoutenCsv[x][2]}</p><a href="./detail.html" style="color: #5341d3">詳細ページ</a>`,
        dekirukotoArray: shoutenCsv[x][16].split('、')
    })
}

const arrayList = [yakkyokuArray, shoutenArray];
const dekirukotoList = document.form1.dekirukoto;

// チェックボックスで検索する関数
function dkrSearch() {
    let dkrSearchCount = 0;
    let visibleCount = 0;
    let checkResultUl = '';
    for(let h = 0; h < arrayList.length; h++) {
        for(let i = 0; i < arrayList[h].length; i++, dkrSearchCount++) {
            if(((arrayList[h][i].dekirukotoArray.includes('買い物')) && (dekirukotoList[0].checked)) || ((arrayList[h][i].dekirukotoArray.includes('集う')) && (dekirukotoList[1].checked)) || ((arrayList[h][i].dekirukotoArray.includes('気分転換')) && (dekirukotoList[2].checked)) || ((arrayList[h][i].dekirukotoArray.includes('体を動かす')) && (dekirukotoList[3].checked)) || ((arrayList[h][i].dekirukotoArray.includes('刺激を受ける')) && (dekirukotoList[4].checked)) || ((arrayList[h][i].dekirukotoArray.includes('食事')) && (dekirukotoList[5].checked)) || ((arrayList[h][i].dekirukotoArray.includes('介護・医療サービスを利用する')) && (dekirukotoList[6].checked)) || ((arrayList[h][i].dekirukotoArray.includes('出かける')) && (dekirukotoList[7].checked)) || ((arrayList[h][i].dekirukotoArray.includes('ボランティア')) && (dekirukotoList[8].checked)) || ((arrayList[h][i].dekirukotoArray.includes('相談する')) && (dekirukotoList[9].checked))) {
                markers[dkrSearchCount].setVisible(true);
            } else {
                markers[dkrSearchCount].setVisible(false);
            }

            if(markers[dkrSearchCount].getVisible()) {
                visibleCount++;
                checkResultUl += `<li>${arrayList[h][i].content}</li><hr>`;
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
}

// すべてのチェックを外す関数
function checkNone() {
    for(let i = 0; i < dekirukotoList.length; i++) {
        dekirukotoList[i].checked = false;
    }
}

// 現在地を取得してマーカーを描画する関数
function getCurrentLocation() {
    if(!navigator.geolocation) return;

    var currentLocateImg = {
        url: "./img/current-location.png",
        labelOrigin: new google.maps.Point(24, 60)
    }

    function success(position) {
        var currentLatitude  = position.coords.latitude;
        var currentLongitude = position.coords.longitude;
        var currentLatlng = new google.maps.LatLng(currentLatitude, currentLongitude);

        new google.maps.Marker({
            position: currentLatlng,
            map: map1,
            icon: currentLocateImg,
            label: "現在地"
        });
    };

    function error() {
        alert("現在地の取得に失敗しました");
    };

    navigator.geolocation.getCurrentPosition(success, error);
}