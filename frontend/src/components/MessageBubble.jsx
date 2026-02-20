export default function MessageBubble({ message,activeChatId }) {
  const isMe = message.sender != activeChatId;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg shadow max-w-xs ${
          isMe
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
