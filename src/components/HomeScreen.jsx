export default function HomeScreen({ user }) {
  const handleCopyInvite = () => {
    const inviteLink = `${window.location.origin}/invite/${user.userId}`;
    navigator.clipboard.writeText(inviteLink);
    alert("Link de invitación copiado");
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="user-info">
          <h2>{user.nickname}</h2>
          <p>
            {user.language.toUpperCase()} · {user.country}
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="home-main">
        <h3>💬 Tus salas</h3>

        <div className="empty-state">
          <p>Aún no tienes conversaciones</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <button onClick={handleCopyInvite}>
          ➕ Generar link de invitación
        </button>
      </footer>
    </div>
  );
}
