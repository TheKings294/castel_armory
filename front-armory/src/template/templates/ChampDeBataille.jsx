import { useState } from "react";
import "../css/ChampDeBataille.css";

function PageCombat({ chevalierId }) {
  const [chevalier, setChevalier] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <main
      style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}
      className="bataille"
    >
      {/* <h1>Bienvenue au Combat, {chevalier.nom}</h1> */}
      {/* <p>
        Vous êtes prêt avec vos équipements : {chevalier.equipements.join(", ")}
      </p> */}

      <section style={{ marginTop: "2rem" }}>
        <h2>Votre équipement détaillé :</h2>
        {/* <ul>
          {chevalier.equipements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> */}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Actions disponibles :</h2>
        <button
          onClick={() => alert("Vous attaquez l'ennemi !")}
          style={{ marginRight: "1rem" }}
        >
          Attaquer
        </button>
        <button onClick={() => alert("Vous défendez votre position !")}>
          Défendre
        </button>
      </section>
    </main>
  );
}

export default PageCombat;
