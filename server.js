const http = require('http')
const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()

app.use(express.static(__dirname))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))
app.use(cors())



app.get('/', (req, resp) => {
    console.log(req.body);
    return resp.redirect('./html/index.html')
})


const server = http.createServer(app)

const socket = new Server(server)

console.log( socket.listeners());
socket.on("connection", (io) => {

    io.on("disconnect", (_reason) => {
        io.broadcast.emit("someone left chat")
    });

    io.on("msg", (msg) => {
        io.broadcast.emit("n_g_msg", msg)
    });

    // io.on("typing", (data) => {
    //     console.log(`${data['userName']}: ${data['messege']}`);
    //     io.broadcast.emit("usertyping", data)
    // })
});

app.get("/signinredirect", (req, resp) => {
    console.log("signing in new user..................................");
    return resp.status(200).send("./signin.html")
})

app.get("/signedinredirect", (_, resp) => {
    return resp.status(200).send("index.html");
})

server.listen(9000, () => console.log('server listening on port 9000'));