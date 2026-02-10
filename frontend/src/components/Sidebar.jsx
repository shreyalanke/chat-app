export default function Sidebar({ allChats, setActiveChatId }) {
  return (
    <aside className="w-1/4 bg-white border-r">
      <div className="p-4 font-bold text-lg border-b">Chats</div>
      {allChats.map((item) => {
        return (
          <div
            className="p-4 hover:bg-gray-100 cursor-pointer"
            key={item.id}
            onClick={() => {
              setActiveChatId(item.id);
            }}
          >
            <p className="font-medium">{item.name}</p>
            <span className="text-sm text-gray-500">Hey 👋</span>
          </div>
        );
      })}
    </aside>
  );
}
