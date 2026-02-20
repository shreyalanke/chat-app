import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useEffect } from "react";
export default function ChatPage({username}) {
  console.log(username);

  let [socket, setSocket] = useState(null);
  let [users, setUsers] = useState([]);
  let [messages, setMessages] = useState([]);

  const [activeChatId, setActiveChatId] = useState(null);


  useEffect(() => {
    if (socket) return;
    const ws = new WebSocket("ws://localhost:3000/");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", username }));
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if(data && data.type == "initiate"){
          console.log(data.users);
          setUsers(data.users);
        }
        if (data.type == "chatInit"){
          console.log(data.messages);
          setMessages(data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }
    socket = ws;
    setSocket(ws);
  },[])

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      <Sidebar users={users} setActiveChatId={setActiveChatId} />

      <main className="flex-1 flex flex-col">
        <MessageList socket={socket} activeChatId={activeChatId} username={username} messages={messages} />
        <MessageInput socket={socket} activeChatId={activeChatId} username={username} />
      </main>
    </div>
  );
}
