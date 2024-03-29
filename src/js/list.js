// import "core-js/stable";
// import "regenerator-runtime/runtime";
import { endLoading } from "./endLoading";
import { slideToggle } from "./slideToggle";
import { hamburger } from "./hamburger";
import "../scss/list.scss";

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
        let readResultUl = '';
        for(let h = 0; h < jsonArray.length; h++) {
            readResultUl += `<h2 class="ac-title">${jsonArray[h][0]['社会資源の種類']}</h2><div class="ac-content"><ul>`;
            for(let i = 0; i < jsonArray[h].length; i++) {
                readResultUl += `<li><b>${jsonArray[h][i]['名称']}</b>`;
                if(jsonArray[h][i]['住所']) readResultUl += `<p>住所：${jsonArray[h][i]['住所']}</p>`;
                readResultUl += `<p>できること：${jsonArray[h][i]['できること']}</p>`;
                if(jsonArray[h][i]['配達サービス'] == 'あり') readResultUl += '<p>配達サービス：あり</p>';
                readResultUl += `<a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #5341d3">詳細ページ</a></li><hr>`;
            }
            readResultUl += '</ul></div>';
        }
        document.querySelector('#ac-container').innerHTML = readResultUl;

        document.querySelectorAll('.ac-title').forEach(title => {
            title.addEventListener('click', function() {
                slideToggle(this.nextElementSibling, 600);
                this.classList.toggle('open');
            })
        });
    })
    .catch(err => {
        console.log(err);
    })

hamburger();