export default function ChatHeader({ name }) {
  return (
    <header className="h-16 bg-white border-b flex items-center px-6 font-semibold">
      {name}
    </header>
  );
}
