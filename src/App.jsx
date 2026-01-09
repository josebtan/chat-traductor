import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import AuthScreen from "./components/AuthScreen";
import HomeScreen from "./components/HomeScreen";
import userService from "./services/userService";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleInvitation = (currentUser) => {
    const hash = window.location.hash;

    if (!hash.startsWith("#/invite/")) return;

    const inviteId = hash.replace("#/invite/", "");

    const invitations =
      JSON.parse(localStorage.getItem("chatInvitations")) || [];

    const invitation = invitations.find((i) => i.id === inviteId);

    if (!invitation || invitation.used || !currentUser) return;

    const friends =
      JSON.parse(localStorage.getItem("chatFriends")) || [];

    friends.push({
      id: invitation.id,
      name: invitation.ownerName,
    });

    invitation.used = true;

    localStorage.setItem("chatFriends", JSON.stringify(friends));
    localStorage.setItem("chatInvitations", JSON.stringify(invitations));

    window.location.hash = "";
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await userService.getUser();
        setUser(currentUser);
        // Handle invitation after user is loaded
        if (currentUser) {
          handleInvitation(currentUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <SplashScreen />;
  if (!user) return <AuthScreen onRegister={setUser} />;

  return <HomeScreen user={user} />;
}

export default App;
