export default function FriendsSidebar({
  friends,
  selectedFriend,
  onSelectFriend,
}) {
  return (
    <aside className="sidebar">
      <h2>Amigos</h2>

      <div className="friend-list">
        {friends.length === 0 && (
          <p className="sidebar-empty">
            No tienes amigos aún
            <br />
            Usa una invitación para empezar
          </p>
        )}

        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`friend-item ${
              selectedFriend?.id === friend.id ? "active" : ""
            }`}
            onClick={() => onSelectFriend(friend)}
          >
            {friend.name}
          </div>
        ))}
      </div>

      <button className="invite-button">
        ➕ Invitar amigo
      </button>
    </aside>
  );
}
