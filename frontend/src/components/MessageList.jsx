import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
