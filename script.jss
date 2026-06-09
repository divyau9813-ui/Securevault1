function encryptAndStore(){

    // USER INPUTS
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let files = document.getElementById("fileUpload").files;

    let message = document.getElementById("message");

    // VALIDATION

    if(name === "" || email === ""){
        message.style.color = "red";
        message.innerHTML = "Please fill all details.";
        return;
    }

    if(password.length < 8){
        message.style.color = "red";
        message.innerHTML = "Password must contain at least 8 characters.";
        return;
    }

    if(password !== confirmPassword){
        message.style.color = "red";
        message.innerHTML = "Passwords do not match.";
        return;
    }

    if(files.length === 0){
        message.style.color = "red";
        message.innerHTML = "Please upload at least one file.";
        return;
    }

    // SIMULATED ENCRYPTION PROCESS

    message.style.color = "#38bdf8";
    message.innerHTML = "Encrypting files...";

    setTimeout(() => {

        // RANDOM ENCRYPTION KEY GENERATION
        let encryptionKey = generateEncryptionKey();

        // DISPLAY SUCCESS MESSAGE
        message.style.color = "#4ade80";

        message.innerHTML =
        `
        Files encrypted successfully! <br>
        Encryption Key: <br>
        <b>${encryptionKey}</b>
        `;

        console.log("Encrypted Files Stored Securely");

    }, 2000);
}

/* GENERATE RANDOM ENCRYPTION KEY */

function generateEncryptionKey(){

    let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

    let key = "";

    for(let i = 0; i < 32; i++){

        let randomIndex =
        Math.floor(Math.random() * chars.length);

        key += chars[randomIndex];
    }

    return key;
}