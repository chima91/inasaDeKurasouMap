import { jsonArray, markers } from './map';

let dkrList = document.form1.dekirukoto;
export let dekirukotoList = dkrList;
// チェックボックスで検索する関数
export function dkrSearch() {
    document.querySelector("#search-button").addEventListener("click", () => {
        let dkrSearchCount = 0;
        let visibleCount = 0;
        let checkResultUl = '';
        for(let h = 0; h < jsonArray.length; h++) {
            for(let i = 0; i < jsonArray[h].length; i++, dkrSearchCount++) {
                if(markers[dkrSearchCount]) {
                        if(((jsonArray[h][i]['できること'].includes('買い物')) && (dkrList[0].checked)) || ((jsonArray[h][i]['できること'].includes('集う')) && (dkrList[1].checked)) || ((jsonArray[h][i]['できること'].includes('気分転換')) && (dkrList[2].checked)) || ((jsonArray[h][i]['できること'].includes('体を動かす')) && (dkrList[3].checked)) || ((jsonArray[h][i]['できること'].includes('刺激を受ける')) && (dkrList[4].checked)) || ((jsonArray[h][i]['できること'].includes('食事')) && (dkrList[5].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['id'].includes('2_')) && (dkrList[6].checked) && (dkrList[7].checked)) || ((jsonArray[h][i]['できること'].includes('出かける')) && (dkrList[14].checked)) || ((jsonArray[h][i]['できること'].includes('ボランティア')) && (dkrList[15].checked))) {
                            markers[dkrSearchCount].setVisible(true);
                        } else if((jsonArray[h][i]['種別']) && (((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('デイサービス')) && (dkrList[6].checked) && (dkrList[8].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ヘルパー')) && (dkrList[6].checked) && (dkrList[9].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('ショートステイ')) && (dkrList[6].checked) && (dkrList[10].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('入所施設')) && (dkrList[6].checked) && (dkrList[11].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('就労支援')) && (dkrList[6].checked) && (dkrList[12].checked)) || ((jsonArray[h][i]['できること'].includes('介護・医療サービスを利用する')) && (jsonArray[h][i]['種別'].includes('相談窓口')) && (dkrList[6].checked) && (dkrList[13].checked)))) {
                            markers[dkrSearchCount].setVisible(true);
                        } else {
                            markers[dkrSearchCount].setVisible(false);
                        }

                    if(markers[dkrSearchCount].getVisible()) {
                        visibleCount++;
                        checkResultUl += `<li><b>${jsonArray[h][i]['名称']}（<a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #ccccee">詳細ページ</a>）</b>`;
                        if(jsonArray[h][i]['住所']) checkResultUl += `<p>${jsonArray[h][i]['住所']}</p>`;
                        if(jsonArray[h][0]['社会資源の種類'] == '介護サービス事業所') checkResultUl += '<img src="./img/dkrSearch-icon/koureisya.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                        if(jsonArray[h][0]['社会資源の種類'] == '障害サービス事業所') checkResultUl += '<img src="./img/dkrSearch-icon/syougaisya.png" style="display: inline-block; width: 40px; height: 40px; margin: 3px 15px 0 3px">';
                        if(jsonArray[h][i]['種別']) {
                            if(jsonArray[h][i]['種別'].includes('デイサービス')) checkResultUl += '<img src="./img/dkrSearch-icon/day.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                            if(jsonArray[h][i]['種別'].includes('ヘルパー')) checkResultUl += '<img src="./img/dkrSearch-icon/helper.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                            if(jsonArray[h][i]['種別'].includes('ショートステイ')) checkResultUl += '<img src="./img/dkrSearch-icon/short.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                            if(jsonArray[h][i]['種別'].includes('入所施設')) checkResultUl += '<img src="./img/dkrSearch-icon/nyuusyo.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                            if(jsonArray[h][i]['種別'].includes('就労支援')) checkResultUl += '<img src="./img/dkrSearch-icon/syuurou.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                            if(jsonArray[h][i]['種別'].includes('相談窓口')) checkResultUl += '<img src="./img/dkrSearch-icon/soudan.png" style="display: inline-block; width: 45px; height: 40px; margin: 3px 5px 0 0">';
                        }
                        checkResultUl += '</li><hr>'
                    }
                }
            }
        }
        document.getElementById('hit-count').textContent = `${visibleCount}件の社会資源がヒットしました`;
        document.getElementById('check-result').innerHTML = checkResultUl;
    })
}