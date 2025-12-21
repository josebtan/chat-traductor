export default function FriendsSidebar({ user, selectedFriend, onSelectFriend }) {
  // Amigos simulados por ahora
  const friends = user.friends || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>👥 Amigos</h3>
      </div>

      <ul className="friends-list">
        {friends.length === 0 && (
          <p className="empty-text">Aún no tienes amigos</p>
        )}

        {friends.map((friend) => (
          <li
            key={friend.userId}
            className={
              selectedFriend?.userId === friend.userId
                ? "friend-item active"
                : "friend-item"
            }
            onClick={() => onSelectFriend(friend)}
          >
            <span className="friend-name">{friend.nickname}</span>
            <span className="friend-meta">
              {friend.language.toUpperCase()} · {friend.country}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
