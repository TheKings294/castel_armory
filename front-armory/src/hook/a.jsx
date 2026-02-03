// hook/useChevalierEquipements.js
import { useEffect, useState } from "react";

export function useChevalierEquipements(isConnected) {
  const [chevalier, setChevalier] = useState(null);
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const estEquipe = equipements.length > 0;

  useEffect(() => {
    if (!isConnected) {
      setChevalier(null);
      setEquipements([]);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté");
      setLoading(false);
      return;
    }

    const fetchChevalier = async () => {
      setLoading(true);
      try {
        // Récupération du chevalier
        const userRes = await fetch("http://localhost:9999/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok)
          throw new Error("Impossible de récupérer l'utilisateur");

        const userData = await userRes.json();
        setChevalier({ id: userData.id, prenom: userData.firstName });

        const equipRes = await fetch(
          `http://localhost:9999/api/knights/${userData.id}/equipment`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!equipRes.ok)
          throw new Error("Impossible de récupérer les équipements");

        const chevalierEquip = await equipRes.json();
        setEquipements(chevalierEquip.equipment || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChevalier();
  }, [isConnected]);

  return { chevalier, equipements, estEquipe, loading, error };
}
