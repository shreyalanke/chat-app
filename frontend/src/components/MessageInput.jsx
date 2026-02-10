import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <footer className="h-16 bg-white border-t flex items-center px-4 gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
      >
        Send
      </button>
    </footer>
  );
}
