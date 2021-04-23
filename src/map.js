import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
import { hamburger } from "./hamburger";
import { modalToggle } from "./modalToggle";
import { subCheck } from "./subCheck";
import { endLoading } from "./endLoading";
import { initMap } from "./initMap";

import { checkNone } from "./checkNone";
import { dkrSearch } from "./dkrSearch";
import { getCurrentLocation } from "./getCurrentLocation";

$(function() {
    hamburger();
    modalToggle();
    subCheck();

    checkNone();
});

let jsonArray;
async function getJson() {
    const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=IU_majGmfwhE3mUp_8IbeYXMZGsM-xSgesgOrQlxeRjbEWKzN7lNy_NWu5oeFUl8ERpuU1kNWNH6EBN5xJyYeLTOpHM97A3Im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC-NnOpEyNUv90qldEvbLL6Xz1GBq_6Bya6TkKlYhFQE4JamSXLtQT8AI_WHbeHRt2Oqk0FkhV_QGGaU2pP6Ntk&lib=MLUBSv-keSXYUu5ZSNCbXyjlewnNH1PVR');
    const data = await res.json();
    return data;
}
getJson()
    .then(data => {
        jsonArray = data;
        endLoading();
        initMap();
    })
    .catch(err => {
        console.log(err);
    })

// initMap() 用の変数
let markers = [];
let infoWindows = [];
initMap();

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

// getCurrentLocation() 用の変数
let currentMarker;