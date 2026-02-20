import e from "express";
import cors from "cors";
import http from "http";
import {WebSocketServer} from "ws";

let clients = {};

let data = [{username:"karan", password:"karan"},{username:"alice",password:"alice"}];

let chats = {"karan-alice": [
    { id: 1, sender: "karan", content: "Hey Alice!"},
    { id: 2, sender: "alice", content: "Hey Karan! How are you?"},
    { id: 3, sender: "karan", content: "I'm good, thanks! What about you?"}
]};

let app = e();
app.use(cors())

app.use(e.json()); 


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log("Body:", req.body);
    next();
})


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.get("/me", (req, res) => {
const { username } = req.query;
for (let user of data){
if(user.username === username){
return res.send({ status: true, message: "User exists" });
}
}

return res.status(404).send({ status: false, message: "User not found" })
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    let user;
    for (let index = 0; index < data.length; index++) {
        if (data[index].username === username) {
            user = data[index];
        }
    }

    if(user){
        if(user.password === password){
            return res.send({ status: true, message: "Login successful" });
        }else{
            return res.status(401).send({ status: false, message: "Invalid password" });
        }
    }
    data.push({ username, password });
    res.send({ status: true, message: "User registered successfully" });
})

const server = http.createServer(app);


const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("message",(rawData)=>{
        try {
            let stringData = rawData.toString();
            let obj = JSON.parse(stringData);
            if(obj && obj.type === "join"){
                let users = [];

                for (let user of data){
                    if (user.username !== obj.username){
                        users.push({id: user.username});
                    }
                }
                if(users){
                    console.log(users);
                    ws.send(JSON.stringify({type:"initiate",users}));
                }else {
                    ws.send(JSON.stringify({type:"initiate",users:[]}));
                }

                clients[obj.username] = ws;

                console.log("Current clients: ", Object.keys(clients));
            }

            if(obj && obj.type === "chatInit"){
                let chatId = obj.username + "-" + obj.activeChatId;
                if(!chats[chatId]){
                    chatId = obj.activeChatId + "-" + obj.username;
                }
                if(!chats[chatId]){
                    chats[chatId] = [];
                }

                let chat = chats[chatId]
                console.log(chat)
                ws.send(JSON.stringify({type:"chatInit", messages: chat}))

            }

            if(obj && obj.type === "message"){
                let chatId = obj.activeChatId + "-" + obj.username;
                if(!chats[chatId]){
                    chatId = obj.username + "-" + obj.activeChatId;
                }
                if(!chats[chatId]){
                    chats[chatId] = [];
                }

                chats[chatId].push({id: Date.now(), sender: obj.username, content: obj.content});

                let receiverSocket = clients[obj.activeChatId];

                receiverSocket.send(JSON.stringify({type:"chatInit", messages: chats[chatId]}))
            }
        } catch (error) {
            console.error(error);
        }
    })
})

server.listen(3000, () => {console.log("Server is running on port 3000"); });