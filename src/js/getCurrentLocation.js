import { exportMap1 } from "./map";

export function getCurrentLocation() {
    let currentMarker;
    document.querySelector("#current-location-button").addEventListener("click", () => {
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

            if(!currentMarker) {
                currentMarker = new google.maps.Marker({
                    position: currentLatlng,
                    map: exportMap1,
                    icon: currentLocateImg,
                    label: "現在地"
                });
            }

            exportMap1.setCenter(currentLatlng);
        };

        function error() {
            alert("現在地の取得に失敗しました");
        };

        navigator.geolocation.getCurrentPosition(success, error);
    })
}