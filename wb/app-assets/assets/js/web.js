import { RegisterProfile, LoginProfile, GetUserInformation, GetLoginInformation } from "../../db/db.js";
import { getInfoValueAutorized } from "../../db/accessInfo.js";
import { getUserPcInformation } from "./getUserPcInformation.js"
import { getWifiSpeed } from "./speedTest.js";
let profileInformationContainerDivIsVisible = false;
let menuOptionShow = false;
let showPassword = false;
let showDashboard = true;
let showSpeedTest = false;
let timeAnimSpeedTest = 0;
const progressSpeedTest = new ProgressBar.Circle("#progressSpeedTest", {
    color: "rgb(138, 43, 227)",
    trailColor: "#4a4a4a",
    strokeWidth: 10,
    trailWidth: 10,
    duration: 250,
    easing: "easeInOut",
});

document.getElementById("startSpeedTest").addEventListener("click", () => {
    const animate = setInterval(() => {
        timeAnimSpeedTest = timeAnimSpeedTest + 10;
        document.getElementById("speedTestResult").innerText = timeAnimSpeedTest + "%";
        progressSpeedTest.animate(timeAnimSpeedTest / 100);
        if (timeAnimSpeedTest >= 100) {
            clearInterval(animate);
            timeAnimSpeedTest = 0;
            getWifiSpeed().then(speed => {
                document.getElementById("speedTestResult").innerHTML = speed + "<span class='textMb'>Mb/s</span>";
            }).catch(error => {
                console.error("Errore nel recuperare la velocità WiFi:", error);
                document.getElementById("speedTestResult").innerText = "Errore";
            });
        }
    }, 1000);
})

function fetchActionWithLoading(url, loadingLabel, notifyLabel) {
    fetch(url, {
        method: 'GET',
    })
    .then(createLoading(5000, loadingLabel, notifyLabel));
}


function createLoading(seconds, label, labelNotify) {
    const loadingContainer = document.getElementById("loadingContainer");
    const loadingContainerText = document.getElementById("loadingContainerText");
    const notifyText = document.getElementById("notifyText");
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    loadingContainer.style.display = "block";
    loadingContainerText.innerText = label;
    const timeOut = setTimeout(() => {
        loadingContainer.style.display = "none";
        toastBootstrap.show();
        notifyText.innerHTML = labelNotify;
        clearTimeout(timeOut);
    }, seconds);
}

function UpdateInnerText() {
    var UserInformation = GetUserInformation();
    var UserPcInformation = getUserPcInformation();
    document.getElementById("userName").innerText = UserInformation.nome;
    document.getElementById("userName2").innerText = UserInformation.nome;
    document.getElementById("profileEmail").innerText = UserInformation.email;
    document.getElementById("profileImg").setAttribute("src", UserInformation.imagineLink);
    document.getElementById("profileImg2").setAttribute("src", UserInformation.imagineLink);
    document.getElementById("IpText").innerText = UserPcInformation.IP;
    document.getElementById("CityText").innerText = UserPcInformation.CITY;
    document.getElementById("CountryText").innerText = UserPcInformation.COUNTRY;
    document.getElementById("SOText").innerText = UserPcInformation.System;
}

window.addEventListener("load", updateClock);
function updateClock() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').innerText = formattedTime;
    setInterval(updateClock, 1000);
}

document.getElementById('eliminaFileTemporanei').addEventListener('click', () => {fetchActionWithLoading('http://localhost:3000/elimina-temporanei', "Eliminando i File Temp di Windows...", "I File Temp di Windows sono Stati Eliminati Correttamente");});
document.getElementById('ottimizzazionecomvari').addEventListener('click', () => {fetchActionWithLoading('http://localhost:3000/ottimizzazione-com-vari', "Ottimizando Windows...", "Windows è Stato Ottimizzato Correttamente");});
document.getElementById('verificafile').addEventListener('click', () => {fetchActionWithLoading('http://localhost:3000/verificafile', "Verificando e Riparando i File di Sistema...", "Il Sistema è Stato Verificato e Riparato");});
document.getElementById('puliziacomponenti').addEventListener('click', () => {fetchActionWithLoading('http://localhost:3000/puliziacomponenti', "Scansionando e Riparando Componenti del Sistema...", "I Componenti sono Stati Verificati e Riparati");});
document.getElementById("showpassword").addEventListener("click", () => {
    var UserInformation = GetUserInformation();
    if (showPassword) {
        showPassword = false;
        document.getElementById("showpassword").className = "fa-solid fa-eye fa-bounce";
        document.getElementById("passwordText").innerText = "********";
    } else {
        showPassword = true;
        document.getElementById("showpassword").className = "fa-solid fa-eye-slash fa-bounce";
        document.getElementById("passwordText").innerText = UserInformation.password;
    }
})

document.getElementById("btnDashboard").addEventListener("click", () => {
    const dashboardDiv = document.getElementById("dashboardDiv");
    if (showDashboard) {
        showDashboard = false;
        dashboardDiv.style.display = "none";
    } else {
        showDashboard = true;
        dashboardDiv.style.display = "block";
    }
});

document.getElementById("btnSpeedTest").addEventListener("click", () => {
    const speedTestDiv = document.getElementById("speedTestDiv");
    if (showSpeedTest) {
        showSpeedTest = false;
        speedTestDiv.style.display = "none";
    } else {
        showSpeedTest = true;
        speedTestDiv.style.display = "block";
    }
});

document.getElementById("profileContainer").addEventListener("click", () => {
    const profileInformationDiv = document.getElementById("profileInformationContainer");
    if (profileInformationContainerDivIsVisible) {
        profileInformationContainerDivIsVisible = false;
        profileInformationDiv.style.display = "none";
    } else {
        profileInformationContainerDivIsVisible = true;
        profileInformationDiv.style.display = "block";
    }
});

document.getElementById("btnRegister").addEventListener("click", () => {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
})

document.getElementById("btnAccesso").addEventListener("click", () => {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("registerContainer").style.display = "none";
})

document.getElementById("btnCreateAccount").addEventListener("click", () => {
    const nome = document.getElementById("exampleInputEmail12").value;
    const email = document.getElementById("exampleInputEmail122").value;
    const password = document.getElementById("exampleInputPassword12").value;
    const fileInput = document.getElementById("inputGroupFile04");
    var accountAuto = getInfoValueAutorized(email, password);
    if (accountAuto.Autorized) {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const imagineLink = event.target.result;
                RegisterProfile(nome, email, password, imagineLink);
                document.getElementById("loginContainer").style.display = "block";
                document.getElementById("registerContainer").style.display = "none";
            };
            reader.readAsDataURL(file);
        } else {
            RegisterProfile(nome, email, password, 'assets/img/nodisp.png');
            document.getElementById("loginContainer").style.display = "block";
            document.getElementById("registerContainer").style.display = "none";
        }
    } else {
        alert(accountAuto.Reason);
    }
});

document.getElementById("btnLogin").addEventListener("click", () => {
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    LoginProfile(email, password);
    const wait = setTimeout(() => {
        var responseLogin = GetLoginInformation();
        if (responseLogin.IsCorrect) {
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("registerContainer").style.display = "none";
            document.getElementById("appContent").style.display = "block";
            UpdateInnerText();
        } else {
            alert(responseLogin.Reason);
        }
        clearTimeout(wait);
    }, 1000);
})

document.getElementById("btnMenu").addEventListener("click", () => {
    if (menuOptionShow) {
        menuOptionShow = false;
        document.getElementById("menuOption").style.display = "none";
    } else {
        menuOptionShow = true;
        document.getElementById("menuOption").style.display = "block";
    }
});
