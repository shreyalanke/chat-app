export default function MessageBubble({ message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg shadow max-w-xs ${
          isMe
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
