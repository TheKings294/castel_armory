import { useEffect, useRef, useState } from "react";
import "./css/login.css";

export default function LoginModal({ open, onSubmit }) {
  const dialogRef = useRef(open);
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (open) {
      setError("");
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      if (mode === "register") {
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const confirm = form.confirmPassword.value;

        if (!firstName || !lastName) {
          setError("Veuillez renseigner votre prénom et votre nom.");
          setLoading(false);
          return;
        }

        if (password !== confirm) {
          setError("Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:9999/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Erreur lors de l'inscription");
        } else {
          onSubmit();
        }
      } else {
        const response = await fetch("http://localhost:9999/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Réponse API login :", data);

        if (!response.ok) {
          setError(data.message || "Erreur lors de la connexion");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
            }),
          );

          const payload = JSON.parse(atob(data.token.split(".")[1]));

          console.log(payload);

          onSubmit();
        }
      }
    } catch (err) {
      setError("Erreur réseau ou serveur indisponible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog ref={dialogRef} className="modalDialog" onSubmit={onSubmit}>
      <div className="modalCard">
        <div className="modalHeader">
          <h2 className="modalTitle">
            {mode === "login" ? "Connexion" : "Inscription"}
          </h2>
          <button className="modalClose" onClick={onSubmit} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="authTabs">
          <button
            type="button"
            className={`authTab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Se connecter
          </button>
          <button
            type="button"
            className={`authTab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            S’inscrire
          </button>
        </div>

        <form className="modalBody" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label className="modalLabel">
                Prénom
                <input
                  className="modalInput"
                  name="firstName"
                  type="text"
                  required
                />
              </label>
              <label className="modalLabel">
                Nom
                <input
                  className="modalInput"
                  name="lastName"
                  type="text"
                  required
                />
              </label>
            </>
          )}

          <label className="modalLabel">
            Adresse email
            <input className="modalInput" name="email" type="email" required />
          </label>

          <label className="modalLabel">
            Mot de passe
            <input
              className="modalInput"
              name="password"
              type="password"
              required
              minLength={6}
            />
          </label>

          {mode === "register" && (
            <label className="modalLabel">
              Confirmer le mot de passe
              <input
                className="modalInput"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
              />
            </label>
          )}

          {error && <p className="authError">{error}</p>}

          <button className="modalBtn" type="submit" disabled={loading}>
            {loading
              ? mode === "login"
                ? "Connexion..."
                : "Inscription..."
              : mode === "login"
                ? "Se connecter"
                : "Créer mon compte"}
          </button>

          <p className="authSwitch">
            {mode === "login" ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  className="linkBtn"
                  onClick={() => setMode("register")}
                >
                  S’inscrire
                </button>
              </>
            ) : (
              <>
                Déjà inscrit ?{" "}
                <button
                  type="button"
                  className="linkBtn"
                  onClick={() => setMode("login")}
                >
                  Se connecter
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </dialog>
  );
}
