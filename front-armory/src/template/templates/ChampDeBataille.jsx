import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/ChampDeBataille.css";

function PageCombat({ chevalierId }) {
  const [chevalier, setChevalier] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetch(`http://localhost:8080/api/user`)
  //       .then((res) => {
  //         if (!res.ok)
  //           throw new Error("Erreur lors de la récupération du chevalier");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setChevalier(data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         setLoading(false);
  //       });
  //   }, [chevalierId]);

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
