import "../css/header.css";

export default function Header({ onLoginClick, active = "cour", onNavigate }) {
    return (
        <header className="app-header">
            <div className="header-left">
                <span className="header-logo">🏰 Valdrak</span>
            </div>

            <nav className="header-nav">
                <button
                    className={`nav-link ${active === "cour" ? "active" : ""}`}
                    onClick={() => onNavigate?.("cour")}
                >
                    Cour
                </button>
                <button
                    className={`nav-link ${active === "armurerie" ? "active" : ""}`}
                    onClick={() => onNavigate?.("armurerie")}
                >
                    Armurerie
                </button>
                <button
                    className={`nav-link ${active === "taverne" ? "active" : ""}`}
                    onClick={() => onNavigate?.("taverne")}
                >
                    Taverne
                </button>
                <button
                    className={`nav-link ${active === "battle" ? "active" : ""}`}
                    onClick={() => onNavigate?.("battle")}
                >
                    Champ de bataille
                </button>
            </nav>

            <div className="header-right">
                <button className="login-btn" onClick={onLoginClick}>
                    Se connecter
                </button>
            </div>
        </header>
    );
}
