import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ isConnected, chevalier }) {
  return (
    <header>
      <nav>
       Château</Link>

        <button>Se connecter</button>

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
