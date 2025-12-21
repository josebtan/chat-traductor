import { useEffect, useState } from "react";

const greetings = [
  "Hola 👋",
  "Hello 👋",
  "Bonjour 👋",
  "Ciao 👋",
  "Hallo 👋",
  "Olá 👋",
  "こんにちは 👋",
  "안녕하세요 👋"
];

function SplashScreen({ onFinish }) {
  const [index, setIndex] = useState(0);

  // Cambia el saludo cada 700ms
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 700);

    // Termina la pantalla después de 4 segundos
    const timeout = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-title">Chat Traductor 🌍</h1>
        <p className="splash-greeting">{greetings[index]}</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
