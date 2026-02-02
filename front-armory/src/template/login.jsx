import { useEffect, useRef } from "react";
import "./css/login.css";

export default function LoginModal({ open, onClose, onSubmit }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current) return;

        if (open) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        onSubmit?.({ email, password });
    };

    return (
        <dialog
            ref={dialogRef}
            className="modalDialog"
            onClose={onClose}
        >
            <div className="modalCard">
                <div className="modalHeader">
                    <h2 className="modalTitle">Connexion</h2>
                    <button
                        className="modalClose"
                        onClick={onClose}
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>

                <form className="modalBody" onSubmit={handleSubmit}>
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
                        />
                    </label>

                    <button className="modalBtn" type="submit">
                        Se connecter
                    </button>
                </form>
            </div>
        </dialog>
    );
}
