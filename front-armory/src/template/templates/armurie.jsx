import { useState } from "react";
import "../css/armurie.css";

function Armurie() {
  const [chevalier, setChevalier] = useState({
    first_name: "",
    equipements: [],
  });
  const [equipementsDisponibles, setEquipementsDisponibles] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const estEquipe = equipements.length > 0;

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setError("Vous devez être connecté");
  //       setLoading(false);
  //       return;
  //     }

  //     // Fetch des données depuis le backend
  //     fetch("http://localhost:8080/equipements", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => {
  //         if (!res.ok)
  //           throw new Error("Erreur lors du chargement des équipements");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         // Backend renvoie { prenom: "Dimitri", equipements: [], equipementsDisponibles: [...] }
  //         setChevalier({ prenom: data.prenom, equipements: data.equipements });
  //         setEquipements(data.equipements);
  //         setEquipementsDisponibles(data.equipementsDisponibles);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //         setLoading(false);
  //       });
  //   }, []);

  function ajouterEquipement(nouvelEquipement) {
    if (!equipements.includes(nouvelEquipement)) {
      setEquipements([...equipements, nouvelEquipement]);
    }
  }

  function retirerEquipement(equipementARetirer) {
    setEquipements(equipements.filter((eq) => eq !== equipementARetirer));
  }

  return (
    <main className="armurie">
      <section className="armurie-globale">
        <h1>Bienvenue dans l'Armurie</h1>
        <h2>Bienvenue, chevalier {chevalier.first_name}</h2>

        {!estEquipe ? (
          <p>
            Vous n’êtes pas encore équipé. S'équiper serait mieux pour les
            combats.
          </p>
        ) : (
          <>
            <p>Pour le moment vous êtes équipé de :</p>
            <ul>
              {equipements.map((item, index) => (
                <li key={index}>
                  {item}{" "}
                  <button onClick={() => retirerEquipement(item)}>
                    retiré
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>Équipements disponibles :</h3>
        <ul>
          {equipementsDisponibles.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <button onClick={() => ajouterEquipement(item)}>ajoutez</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Armurie;
