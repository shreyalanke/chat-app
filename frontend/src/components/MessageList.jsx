import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import { useEffect } from "react";

export default function MessageList({ socket, activeChatId, username, messages}) {
    useEffect(() => {
      if (!socket) return;
      socket.send(JSON.stringify({ type:"chatInit", activeChatId, username }))
    },[activeChatId])
  return (

    <>
        <ChatHeader name={activeChatId} />
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages ? messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} activeChatId={activeChatId} />
          )) : null}
        </div>
    </>
  );
}
