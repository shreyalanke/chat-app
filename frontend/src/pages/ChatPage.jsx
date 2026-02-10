import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function ChatPage() {

    

  const [chats, setChats] = useState([
    {
      id: "alice",
      name: "Alice",
      messages: [
        { id: 1, sender: "alice", text: "Hey!" },
        { id: 2, sender: "me", text: "Hi Alice 👋" },
      ],
    },
    {
      id: "bob",
      name: "Bob",
      messages: [{ id: 1, sender: "bob", text: "Yo!" }],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState("alice");

  let chat;
  for (let index = 0; index < chats.length; index++) {
    const element = chats[index];
    if (element.id == activeChatId) {
      chat = element;
    }
  }
  
  const sendMessage = (text) => {
    let newChats=[...chats];
    for (let index = 0; index < newChats.length; index++) {
      const element = newChats[index];
        if(element.id==activeChatId){
           element.messages.push({id:Date.now(), sender:"me", text})
        }      
    }

    setChats(newChats);
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      <Sidebar allChats={chats} setActiveChatId={setActiveChatId} />

      <main className="flex-1 flex flex-col">
        <ChatHeader name={activeChatId} />
        <MessageList messages={chat.messages} />
        <MessageInput onSend={sendMessage} />
      </main>
    </div>
  );
}
