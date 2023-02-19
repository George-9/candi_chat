var socket = io();

const userName = localStorage.getItem("username")
if (undefined == userName || "" == userName.toString().trim() || null == userName) {
    const client = new XMLHttpRequest();
    client.onload = () => {
        console.log(client.responseText);

        if (client.statusText === "OK" && client.status === 200) {
            console.log("found!..............");
            window.location.href = client.responseText;
        }
    }
    client.open("GET", "/signinredirect");
    client.send()
}


document.onload = () => {
    validateUser()
};

/**
 * create a new element
 */
const creator = (tag = "p") => {
    return document.createElement(tag)
}

/**
 * get element by id
 */
const getElement = (id = "") => document.getElementById(id)

const messageInput = document.getElementById("message_input")
const validateUser = () => {
    socket.on("connect", (sock) => {
        console.log("");
        socket.emit("joined", userName)
        socket.on("disconnect", (sock) => {
            console.log(`${sock} . disconnected`);
            document.write("| disconnected |")
        })
    })
}

messageInput.addEventListener("input", (ev) => {
    ev.preventDefault();
    socket.emit("typing", { "userName": localStorage.getItem("username"), "messege": messageInput.value })
})

getElement("group_messege").onclick = (event) => {
    event.preventDefault();
    console.log(messageInput.value);
    socket.emit("msg", { "userName": userName, "data": messageInput.value })
}

socket.on("n_g_msg", (msg) => {
    const card = creator('div')
    card.style.backgroundColor = "rgb(242 249 255)";
    card.style.boxShadow = "0px 2px grey";
    card.style.padding = "16px";
    card.style.borderRadius = "20px";
    card.style.margin = "10px"

    const parOwner = creator("p")
    parOwner.innerText = msg['userName']
    const parMsg = creator("p");
    parMsg.innerText = msg['data']
    const msgDiv = getElement("msg_sec");
    console.log(msg);

    card.append(parOwner);
    card.append(parMsg);

    msgDiv.append(card)
})


// socket.on("usertyping", (data) => {
//     let par = creator("p")
//     par.innerText = `${data['userName']}: ${data['messege']}`
//     document.body.append(par)
// })
