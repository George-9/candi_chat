const saveButton = document.getElementById("signinbutton")

saveButton.onclick = function () {
    const nameInput = document.getElementById("nameInput")
    userName = nameInput.value
    if (userName.toString().trim() === "" || null === userName || undefined === userName) {
        return alert("enter name to continue");
    }

    localStorage.setItem("username", userName.trim());
    homeRedirect();
}

function homeRedirect() {
    const client = new XMLHttpRequest();
    client.open("GET", "/signedinredirect");
    client.send()
    client.onload = () => {
        if (client.statusText === "OK" && client.status === 200) {
            window.location.href = client.responseText;
        }

    }
}