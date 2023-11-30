var userPcInformation = {System: null, IP: null, CITY: null, COUNTRY: null}

function getUserPcInformation() {
    $.getJSON("https://api.ipify.org?format=json", function(data) {userPcInformation.IP = data.ip;})
    $.ajax({url: "http://ip-api.com/json", type: 'GET', success: function(json) {userPcInformation.CITY = json.city; userPcInformation.COUNTRY = json.country}});
    userPcInformation.System = navigator.platform;
    return userPcInformation;
}

export { getUserPcInformation };