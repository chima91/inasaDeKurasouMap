// チェックボックスで検索する関数
export function dkrSearch() {
    let dkrSearchCount = 0;
    let visibleCount = 0;
    let checkResultUl = '';
    for(let h = 0; h < jsonArray.length; h++) {
        for(let i = 0; i < jsonArray[h].length; i++, dkrSearchCount++) {
            if(markers[dkrSearchCount]) {
                    if(((jsonArray[h][i]['できること'].includes('買い物')) && (dekirukotoList[0].checked)) || ((jsonArray[h][i]['できること'].includes('集う')) && (dekirukotoList[1].checked)) || ((jsonArray[h][i]['できること'].includes('気分転換')) && (dekirukotoList[2].checked)) || ((jsonArray[h][i]['できること'].includes('体を動かす')) && (dekirukotoList[3].checked)) || ((jsonArray[h][i]['できること'].includes('刺激を受ける')) && (dekirukotoList[4].checked)) || ((jsonArray[h][i]['できること'].includes('食事')) && (dekirukotoList[5].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['id'].includes('2_')) && (dekirukotoList[6].checked) && (dekirukotoList[7].checked)) || ((jsonArray[h][i]['できること'].includes('出かける')) && (dekirukotoList[14].checked)) || ((jsonArray[h][i]['できること'].includes('ボランティア')) && (dekirukotoList[15].checked))) {
                        markers[dkrSearchCount].setVisible(true);
                    } else if((jsonArray[h][i]['種別']) && (((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('デイサービス')) && (dekirukotoList[6].checked) && (dekirukotoList[8].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ヘルパー')) && (dekirukotoList[6].checked) && (dekirukotoList[9].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ショートステイ')) && (dekirukotoList[6].checked) && (dekirukotoList[10].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('入所施設')) && (dekirukotoList[6].checked) && (dekirukotoList[11].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('就労支援')) && (dekirukotoList[6].checked) && (dekirukotoList[12].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('相談窓口')) && (dekirukotoList[6].checked) && (dekirukotoList[13].checked)))) {
                        markers[dkrSearchCount].setVisible(true);
                    } else {
                        markers[dkrSearchCount].setVisible(false);
                    }

                if(markers[dkrSearchCount].getVisible()) {
                    visibleCount++;
                    checkResultUl += `<li><b>${jsonArray[h][i]['名称']}（<a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #ccccee">詳細ページ</a>）</b>`;
                    if(jsonArray[h][i]['住所']) checkResultUl += `<p>${jsonArray[h][i]['住所']}</p>`;
                    if(jsonArray[h][0]['社会資源の種類'] == '介護サービス事業所') checkResultUl += '<img src="./img/koureisya-icon.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                    if(jsonArray[h][0]['社会資源の種類'] == '障害サービス事業所') checkResultUl += '<img src="./img/syougaisya-icon.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                    if(jsonArray[h][i]['種別']) {
                        if(jsonArray[h][i]['種別'].includes('デイサービス')) checkResultUl += '<img src="./img/icon-day.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        if(jsonArray[h][i]['種別'].includes('ヘルパー')) checkResultUl += '<img src="./img/icon-helper.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        if(jsonArray[h][i]['種別'].includes('ショートステイ')) checkResultUl += '<img src="./img/icon-short.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        if(jsonArray[h][i]['種別'].includes('入所施設')) checkResultUl += '<img src="./img/icon-nyuusyo.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        if(jsonArray[h][i]['種別'].includes('就労支援')) checkResultUl += '<img src="./img/icon-syuurou.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        if(jsonArray[h][i]['種別'].includes('相談窓口')) checkResultUl += '<img src="./img/icon-soudan.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                    }
                    checkResultUl += '</li><hr>'
                }
            }
        }
    }
    document.getElementById('hit-count').textContent = `${visibleCount}件の社会資源がヒットしました`;
    document.getElementById('check-result').innerHTML = checkResultUl;
}