function getInfoValueAutorized(email, password) {
    var EmailIsCorrect = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    var PasswordIsCorrect = password.toString().length > 7;
    if (EmailIsCorrect && PasswordIsCorrect) {return {Autorized: true, Reason: ""};}
    if (!EmailIsCorrect && !PasswordIsCorrect) {return {Autorized: false, Reason: "L'email e la Password non sono Corette"};}
    if (!EmailIsCorrect && PasswordIsCorrect) {return {Autorized: false, Reason: "L'email non è Coretta"};}
    if (!EmailIsCorrect && !PasswordIsCorrect) {return {Autorized: false, Reason: "La Password non è Coretta"};}
    return {Autorized: false, Reason: "Nessun Motivo Specificato"};
}

function getLoginInfoIsCorrect(UserDbInfo, email, password) {
    var EmailIsCorrect = (UserDbInfo.email == email);
    var PasswordIsCorrect = (UserDbInfo.password == password);
    if (EmailIsCorrect && PasswordIsCorrect) {return {IsCorrect: true, Reason: ""};}
    if (!EmailIsCorrect && !PasswordIsCorrect) {return {IsCorrect: false, Reason: "L'email e la Password non sono Corette"};}
    if (!EmailIsCorrect && PasswordIsCorrect) {return {IsCorrect: false, Reason: "L'email non è Corretta"};}
    if (EmailIsCorrect && !PasswordIsCorrect) {return {IsCorrect: false, Reason: "La Password non è Corretta"};}
    return {IsCorrect: false, Reason: "Nessun Motivo Specificato"};
}

export { getInfoValueAutorized, getLoginInfoIsCorrect };