import React, { useEffect } from "react";
import "./css/login.css";

export default function LoginModal({ open, onClose, onSubmit }) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        onSubmit?.({ email, password });
    };

    return (
        <div className="modalOverlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modalCard" onClick={(e) => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2 className="modalTitle">Connexion</h2>
                    <button className="modalClose" onClick={onClose} aria-label="Fermer">
                        ✕
                    </button>
                </div>

                <form className="modalBody" onSubmit={handleSubmit}>
                    <label className="modalLabel">
                        Email
                        <input className="modalInput" name="email" type="email" required />
                    </label>

                    <label className="modalLabel">
                        Mot de passe
                        <input className="modalInput" name="password" type="password" required />
                    </label>

                    <button className="modalBtn" type="submit">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
