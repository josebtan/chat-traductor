export default function ChatWindow({ friend }) {
  if (!friend) {
    return (
      <div className="chat-window">
        <div className="chat-header">Chat</div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        {friend.name}
      </div>

      <div className="chat-messages">
        {/* mensajes */}
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Escribe un mensaje..." />
        <button>Enviar</button>
      </div>
    </div>
  );
}
