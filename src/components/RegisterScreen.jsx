import { useState } from "react";

const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" }
];

const COUNTRIES = [
  { code: "CO", label: "Colombia 🇨🇴" },
  { code: "MX", label: "México 🇲🇽" },
  { code: "ES", label: "España 🇪🇸" },
  { code: "US", label: "Estados Unidos 🇺🇸" },
  { code: "BR", label: "Brasil 🇧🇷" }
];

export default function RegisterScreen({ onRegister }) {
  const [nickname, setNickname] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname || !language || !country) {
      setError("Completa todos los campos");
      return;
    }

    const userData = {
      userId: crypto.randomUUID(),
      nickname: nickname.trim(),
      language,
      country,
      friends: [],
      createdAt: Date.now()
    };

    localStorage.setItem("chatUser", JSON.stringify(userData));
    onRegister(userData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">🌍 Bienvenido</h1>
        <p className="register-text">Configura tu perfil para comenzar</p>

        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nombre o apodo"
            autoComplete="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
          />

          <select
            id="language"
            name="language"
            autoComplete="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Selecciona idioma</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <select
            id="country"
            name="country"
            autoComplete="country-name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Selecciona país</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Comenzar</button>
        </form>
      </div>
    </div>
  );
}
