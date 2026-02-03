import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

import LoginModal from "../login";

export default function Header({
  isConnected,
  onLoginClick,
  active = "cour",
  onNavigate,
  setIsConnected,
}) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-logo">🏰 Valdrak</span>
      </div>

      <nav className="header-nav">
        <Link to="/">
          <button
            className={`nav-link ${active === "cour" ? "active" : ""}`}
            onClick={() => onNavigate?.("cour")}
          >
            Cour
          </button>
        </Link>
        <Link to="/Taverne">
          <button
            className={`nav-link ${active === "taverne" ? "active" : ""}`}
            onClick={() => onNavigate?.("taverne")}
          >
            Taverne
          </button>
        </Link>

        {isConnected && (
          <>
            <Link to="/armurie">
              <button
                className={`nav-link ${active === "armurerie" ? "active" : ""}`}
                onClick={() => onNavigate?.("armurerie")}
              >
                Armurerie
              </button>
            </Link>
            <Link to="/Combat">
              <button
                className={`nav-link ${active === "battle" ? "active" : ""}`}
                onClick={() => onNavigate?.("battle")}
              >
                Champ de bataille
              </button>
            </Link>
          </>
        )}
      </nav>

      {!isConnected && (
        <>
          <div className="header-right">
            <button className="login-btn" onClick={() => setLoginOpen(true)}>
              se connecter
            </button>

            <LoginModal
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
              onSubmit={() => {
                setIsConnected(true);
                setLoginOpen(false);
              }}
            />
          </div>
          )
        </>
      )}
    </header>
  );
}
