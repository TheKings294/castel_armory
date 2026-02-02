import { Link, useLocation } from "react-router-dom";

function Header({ isConnected, chevalier }) {
  const location = useLocation();

  return (
    <header>
      <nav>
        <Link to="/">Château</Link>

        {isConnected && (
          <>
            <Link to="/Armurie">Armurerie</Link>
            <Link to="/Taverne">Taverne</Link>
          </>
        )}

        {chevalier?.equipements?.length > 0 && <Link to="/Combat">Combat</Link>}

        {location.pathname !== "/Combat" && <span>⚔️ Prépare-toi</span>}
      </nav>
    </header>
  );
}

export default Header;
