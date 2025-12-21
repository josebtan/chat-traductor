import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }

    // Mostrar Splash por 2.5 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Splash inicial
  if (loading) {
    return <SplashScreen />;
  }

  // Registro local
  if (!user) {
    return <RegisterScreen onRegister={setUser} />;
  }

  // Pantalla principal
  return <HomeScreen user={user} />;
}

export default App;
