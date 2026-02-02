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
            const firstName = form.firstName.value.trim();
            const lastName = form.lastName.value.trim();
            const confirm = form.confirmPassword.value;

            if (!firstName || !lastName) {
                setError("Veuillez renseigner votre prénom et votre nom.");
                return;
            }

            if (password !== confirm) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }

            onRegister?.({
                firstName,
                lastName,
                email,
                password,
            });

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

                {/* Tabs */}
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
                        <input
                            className="modalInput"
                            name="email"
                            type="email"
                            required
                        />
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
