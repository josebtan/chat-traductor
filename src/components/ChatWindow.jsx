export default function ChatWindow({ user, friend }) {
  if (!friend) {
    return (
      <section className="chat-window empty">
        <p>👈 Selecciona un amigo para comenzar a chatear</p>
      </section>
    );
  }

  return (
    <section className="chat-window">
      <header className="chat-header">
        <h3>{friend.nickname}</h3>
        <small>
          Idioma: {friend.language.toUpperCase()} · País: {friend.country}
        </small>
      </header>

      <div className="chat-messages">
        {/* Mensajes mock por ahora */}
        <div className="message received">
          <p>Hola 👋</p>
          <small>Original</small>
        </div>

        <div className="message translated">
          <p>Hello 👋</p>
          <small>Traducción</small>
        </div>
      </div>

      <form className="chat-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          disabled
        />
        <button disabled>Enviar</button>
      </form>
    </section>
  );
}
