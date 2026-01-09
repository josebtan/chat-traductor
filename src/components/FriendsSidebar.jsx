import { generateInvitation } from "../utils/invitations";

export default function FriendsSidebar({
  friends,
  selectedFriend,
  onSelectFriend,
}) {
  const handleInvite = () => {
    const user = JSON.parse(localStorage.getItem("chatUser"));
    const link = generateInvitation(user);
    navigator.clipboard.writeText(link);
    alert("Link de invitación copiado 📋");
  };

  return (
    <aside className="sidebar">
      <h2>Amigos</h2>

      <div className="friend-list">
        {friends.length === 0 && (
          <p className="sidebar-empty">
            No tienes amigos aún
            <br />
            Invita a alguien
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

      <button className="invite-button" onClick={handleInvite}>
        ➕ Invitar amigo
      </button>
    </aside>
  );
}
