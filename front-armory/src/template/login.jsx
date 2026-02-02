import { useEffect, useRef, useState } from "react";
import "./css/login.css";

export default function LoginModal({ open, onClose, onSubmit, onRegister }) {
    const dialogRef = useRef(null);
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [error, setError] = useState("");

    useEffect(() => {
        if (!dialogRef.current) return;

        if (open) {
            setError("");
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const form = e.currentTarget;
        const email = form.email.value.trim();
        const password = form.password.value;

        if (mode === "register") {
            const pseudo = form.pseudo.value.trim();
            const confirm = form.confirmPassword.value;

            if (password !== confirm) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }

            onRegister?.({ pseudo, email, password });
            return;
        }

        onSubmit?.({ email, password });
    };

    return (
        <dialog ref={dialogRef} className="modalDialog" onClose={onClose}>
            <div className="modalCard">
                <div className="modalHeader">
                    <h2 className="modalTitle">
                        {mode === "login" ? "Connexion" : "Inscription"}
                    </h2>

                    <button className="modalClose" onClick={onClose} aria-label="Fermer">
                        ✕
                    </button>
                </div>

                {/* Toggle Connexion/Inscription */}
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
                        <label className="modalLabel">
                            Pseudo
                            <input className="modalInput" name="pseudo" type="text" required />
                        </label>
                    )}

                    <label className="modalLabel">
                        Email
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

                    <button className="modalBtn" type="submit">
                        {mode === "login" ? "Se connecter" : "Créer mon compte"}
                    </button>

                    {/* petit lien en bas */}
                    <p className="authSwitch">
                        {mode === "login" ? (
                            <>
                                Pas de compte ?{" "}
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
                                Déjà un compte ?{" "}
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
