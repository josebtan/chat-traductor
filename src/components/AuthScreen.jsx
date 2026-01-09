import { useState } from "react";
import userService from "../services/userService";

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

export default function AuthScreen({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Login mode
      if (!email || !password) {
        setError("Ingresa email y contraseña");
        return;
      }
      try {
        const user = await userService.login(email, password);
        onRegister(user);
      } catch (error) {
        setError("Error al iniciar sesión: " + error.message);
      }
    } else {
      // Register mode
      if (!email || !password || !confirmPassword || !nickname || !language || !country) {
        setError("Completa todos los campos");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      try {
        const userData = {
          nickname: nickname.trim(),
          language,
          country
        };
        const user = await userService.register(email, password, userData);
        onRegister(user);
      } catch (error) {
        setError("Error al registrarse: " + error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">{isLogin ? "🔑 Iniciar Sesión" : "🌍 Bienvenido"}</h1>
        <p className="register-text">
          {isLogin ? "Ingresa tus credenciales" : "Configura tu perfil para comenzar"}
        </p>

        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nickname"
            autoComplete="username"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
            required
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          {!isLogin && (
            <>
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
            </>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit">{isLogin ? "Iniciar Sesión" : "Registrarse"}</button>
        </form>

        <button
          type="button"
          className="google-button"
          onClick={async () => {
            try {
              const user = await userService.loginWithGoogle();
              onRegister(user);
            } catch (error) {
              setError("Error con Google: " + error.message);
            }
          }}
        >
          🔵 Iniciar con Google
        </button>

        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}
