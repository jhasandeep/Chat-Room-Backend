const express = require("express");
const {Server} = require("socket.io");
const http = require("http");

const cors= require("cors");

const app = express(); 

app.use(cors())


const server = http.createServer(app);

const io= new Server(server, {
    cors: {
        origin : "https://skjhachatapp.netlify.app",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    // console.log(socket.id);


    socket.on("joinRoom" , room=>socket.join(room));

    socket.on("newMessage", ({newMessage, room})=>{
        // console.log(newMessage, room)
        io.in(room).emit("getLatestMessage", newMessage)
    })
})

app.get("/", (req, res) =>{

    res.send("socket chat backend started ");

})

const port = process.env.PORT || 8000

server.listen(port, console.log(`App started at port ${port}`))


