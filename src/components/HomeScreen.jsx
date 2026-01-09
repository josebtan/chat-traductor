import { useState } from "react";
import FriendsSidebar from "./FriendsSidebar";
import ChatWindow from "./ChatWindow";

export default function HomeScreen({ user }) {
  // ✅ Inicialización correcta desde localStorage
  const [friends, setFriends] = useState(() => {
    return JSON.parse(localStorage.getItem("chatFriends")) || [];
  });

  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="home-layout">
      <FriendsSidebar
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />

      <ChatWindow friend={selectedFriend} />
    </div>
  );
}
