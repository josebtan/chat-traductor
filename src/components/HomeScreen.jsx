import { useState } from "react";
import FriendsSidebar from "./FriendsSidebar";
import ChatWindow from "./ChatWindow";

export default function HomeScreen({ user }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="home-layout">
      <FriendsSidebar
        user={user}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />

      <ChatWindow
        user={user}
        friend={selectedFriend}
      />
    </div>
  );
}
