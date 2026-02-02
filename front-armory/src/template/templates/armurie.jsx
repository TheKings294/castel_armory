import { useEffect, useState } from "react";
import "../css/armurie.css";

function Armurie() {
  const [chevalier, setChevalier] = useState({ prenom: "", equipements: [] });
  const [equipementsDisponibles, setEquipementsDisponibles] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Récupérer l'utilisateur
        const userRes = await fetch("http://localhost:9999/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok)
          throw new Error("Impossible de récupérer l'utilisateur");
        const user = await userRes.json();

        // Récupérer l'équipement du chevalier
        const equipRes = await fetch(
          `http://localhost:9999/api/knights/${user.id}/equipment`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!equipRes.ok)
          throw new Error("Impossible de récupérer les équipements");
        const data = await equipRes.json();

        // Mettre à jour le state
        setChevalier({ prenom: data.knight, equipements: data.equipment });
        setEquipements(data.equipment);

        // Si tu veux lister tous les équipements disponibles (hors du chevalier)
        const allEquipRes = await fetch("http://localhost:9999/api/equipment", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!allEquipRes.ok)
          throw new Error(
            "Impossible de récupérer les équipements disponibles",
          );
        const allData = await allEquipRes.json();

        // Équipements disponibles = tous sauf ceux du chevalier
        const disponibles = allData
          .map((eq) => eq.name) // selon ton modèle Equipment
          .filter((eq) => !data.equipment.includes(eq));
        setEquipementsDisponibles(disponibles);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const estEquipe = equipements.length > 0;

  const ajouterEquipement = (nouvelEquipement) => {
    if (!equipements.includes(nouvelEquipement)) {
      setEquipements([...equipements, nouvelEquipement]);
      setEquipementsDisponibles(
        equipementsDisponibles.filter((eq) => eq !== nouvelEquipement),
      );
    }
  };

  const retirerEquipement = (equipementARetirer) => {
    setEquipements(equipements.filter((eq) => eq !== equipementARetirer));
    setEquipementsDisponibles([...equipementsDisponibles, equipementARetirer]);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="armurie">
      <section className="armurie-globale">
        <h1>Bienvenue dans l'Armurie</h1>
        <h2>Bienvenue, chevalier {chevalier.prenom}</h2>

        {!estEquipe ? (
          <p>
            Vous n’êtes pas encore équipé. S'équiper serait préférable pour les
            combats.
          </p>
        ) : (
          <>
            <p>Pour le moment vous êtes équipé de :</p>
            <ul>
              {equipements.map((item) => (
                <li key={item}>
                  {item}{" "}
                  <button onClick={() => retirerEquipement(item)}>
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>Équipements disponibles :</h3>
        <ul>
          {equipementsDisponibles.map((item) => (
            <li key={item}>
              {item}{" "}
              <button onClick={() => ajouterEquipement(item)}>Ajouter</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Armurie;
