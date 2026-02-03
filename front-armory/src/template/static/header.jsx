import { useState } from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login";
function Header({ isConnected, setIsConnected, chevalier }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header>
      <nav>
        <Link to="/">Château</Link>

        {!isConnected && (
          <button onClick={() => setLoginOpen(true)}>Se connecter</button>
        )}

        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSubmit={() => {
            setIsConnected(true);
            setLoginOpen(false);
          }}
        />

        {isConnected && (
          <>
            <Link to="/Armurie">Armurerie</Link>
            <Link to="/Taverne">Taverne</Link>
          </>
        )}

        {chevalier?.equipements?.length > 0 && <Link to="/Combat">Combat</Link>}
      </nav>
    </header>
  );
}

export default Header;
