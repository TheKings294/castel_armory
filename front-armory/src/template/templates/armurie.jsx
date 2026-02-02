import { useEffect, useState } from "react";
import "../css/armurie.css";

function Armurie() {
  const chevalier = {
    nom: "Dimitri",
    equipements: [],
  };

  const [equipementsDisponibles, setEquipementsDisponibles] = useState([]);

  useEffect(() => {
    const data = ["épée", "bouclier", "casque", "armure"];
    setEquipementsDisponibles(data);
  }, []);

  const [equipements, setEquipements] = useState([]);
  const estEquipe = equipements.length > 0;

  function ajouterEquipement(nouvelEquipement) {
    if (!equipements.includes(nouvelEquipement)) {
      setEquipements([...equipements, nouvelEquipement]);
    }
  }

  function retirerEquipement(equipementARetirer) {
    if (equipements.includes(equipementARetirer)) {
      setEquipements(equipements.filter((eq) => eq !== equipementARetirer));
    }
  }

  return (
    <main className="armurie">
      <section className="armurie-globale">
        <h1>Bienvenue dans l'Armurie</h1>
        <h2>Bienvenue, chevalier {chevalier.nom}</h2>

        {!estEquipe && (
          <p>
            Vous n’êtes pas encore équipé. S'équiper serait mieux pour les
            combats.
          </p>
        )}
        {estEquipe && (
          <p>
            Pour le moment vous êtes équipé de :
            {equipements.map((item, index) => (
              <li key={index}>
                {" "}
                {item}{" "}
                <button onClick={() => retirerEquipement(item)}>
                  retiré
                </button>{" "}
              </li>
            ))}
          </p>
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
