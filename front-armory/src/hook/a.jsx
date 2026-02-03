import { useEffect, useState } from "react";

export function useChevalierEquipements(isConnected, chevalierId) {
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isConnected || !chevalierId) {
      setLoading(false);
      setEquipements([]);
      return;
    }

    const fetchEquipements = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Utilisateur non authentifié");

        const res = await fetch(
          `http://localhost:9999/api/equipment/${chevalierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error("Impossible de récupérer les équipements");

        const data = await res.json();
        setEquipements(data);
      } catch (err) {
        setError(err.message);
        setEquipements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipements();
  }, [isConnected, chevalierId]);

  const estEquipe = equipements.length > 0;

  return { equipements, estEquipe, loading, error };
}
