var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bloemen_van_adderwortel_%28Persicaria_bistorta%2C_synoniem%2C_Polygonum_bistorta%29_06-06-2021._%28d.j.b%29.jpg"; 
var downloadSize = 7300000;
var startTime, endTime;
var wifiSpeed;
var duration;
var bitsLoaded;
var speedBps;
var speedKbps;
var speedMbps;

function speedTest() {
    return new Promise((resolve, reject) => {
        var download = new Image();
        download.onload = function() {
            endTime = (new Date()).getTime(); 
            calculateWifiSpeed();
            resolve(wifiSpeed); 
        }
        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
    });
}

function calculateWifiSpeed() {
    duration = (endTime - startTime) / 1000;
    bitsLoaded = downloadSize * 8;
    speedBps = (bitsLoaded / duration).toFixed(2);
    speedKbps = (speedBps / 1024).toFixed(2);
    speedMbps = (speedKbps / 1024).toFixed(2);
    wifiSpeed = speedMbps;
}

function getWifiSpeed() {
    try {
        const speed = speedTest(); 
        return speed;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getWifiSpeed };
