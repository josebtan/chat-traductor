import { useState } from "react";
import FriendsSidebar from "./FriendsSidebar";
import ChatWindow from "./ChatWindow";

export default function HomeScreen({ user }) {
  const [friends, setFriends] = useState([]);
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
