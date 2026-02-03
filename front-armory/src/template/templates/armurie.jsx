import { useEffect, useState } from "react";
import "../css/armurie.css";

function Armurie() {
  const [chevalier, setChevalier] = useState({ id: null, prenom: "" });
  const [equipements, setEquipements] = useState([]);
  const [equipementsDisponibles, setEquipementsDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Vous devez être connecté");
        setLoading(false);
        return;
      }

      try {
        const userRes = await fetch("http://localhost:9999/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok)
          throw new Error("Impossible de récupérer l'utilisateur");

        const userData = await userRes.json();
        const userId = userData.id;
        setChevalier({ id: userId, prenom: userData.firstName });

        const equipRes = await fetch(
          `http://localhost:9999/api/knights/${userId}/equipment`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!equipRes.ok)
          throw new Error("Impossible de récupérer les équipements");

        const chevalierEquip = await equipRes.json();
        const currentEquipements = chevalierEquip.equipment || [];
        setEquipements(currentEquipements);

        const allEquipRes = await fetch("http://localhost:9999/api/equipment", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!allEquipRes.ok)
          throw new Error("Impossible de récupérer tous les équipements");

        const allEquip = await allEquipRes.json();

        const disponibles = allEquip.filter(
          (eq) => !currentEquipements.some((e) => e.id === eq.id),
        );
        setEquipementsDisponibles(disponibles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const ajouterEquipement = async (equipement) => {
    if (!chevalier.id) {
      setError("Utilisateur non identifié");
      return;
    }

    try {
      const bodyData = { equipment_id: equipement.id };

      const res = await fetch(
        `http://localhost:9999/api/knights/equipment/add/${equipement.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        },
      );
      if (!res.ok) throw new Error("Erreur ajout équipement");

      const saved = await res.json();

      setEquipements((prev) => [...prev, saved]);
      setEquipementsDisponibles((prev) =>
        prev.filter((eq) => eq.id !== saved.id),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const retirerEquipement = async (equipementId) => {
    try {
      const res = await fetch(
        `http://localhost:9999/api/equipment/${equipementId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Erreur suppression équipement");

      const removed = equipements.find((e) => e.id === equipementId);

      setEquipements((prev) => prev.filter((e) => e.id !== equipementId));
      setEquipementsDisponibles((prev) => [...prev, removed]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="armurie">
      <section className="armurie-globale">
        <h1>Bienvenue dans l’Armurie</h1>
        <h2>Bienvenue, chevalier {chevalier.prenom}</h2>

        {equipements.length === 0 ? (
          <p>
            Vous n’êtes pas encore équipé. S’équiper serait préférable pour les
            combats.
          </p>
        ) : (
          <>
            <p>Vous êtes actuellement équipé de :</p>
            <ul>
              {equipements.map((item) => (
                <li key={item.id}>
                  {item.name}
                  <button onClick={() => retirerEquipement(item.id)}>
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
            <li key={item.id}>
              {item.name}
              <button onClick={() => ajouterEquipement(item)}>Ajouter</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Armurie;
