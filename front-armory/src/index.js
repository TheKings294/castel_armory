import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./template/static/header";
import Armurie from "./template/templates/armurie";
import ChampdeBataille from "./template/templates/ChampDeBataille";
import CourDuChateau from "./template/templates/CourDuChateau";
import Tavern from "./template/templates/taverne";

function App() {
  const [chevalier, setChevalier] = useState(null);
  const [loading, setLoading] = useState(true);
  const isConnected = true;

  useEffect(() => {
    fetch(`http://localhost:8080/api/user`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération du chevalier");
        return res.json();
      })
      .then((data) => {
        setChevalier(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <BrowserRouter>
      <Header isConnected={isConnected} chevalier={chevalier} />
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<CourDuChateau />} />
        <Route
          path="/Armurie"
          element={isConnected ? <Armurie /> : <Navigate to="/" replace />}
        />
        <Route
          path="/Taverne"
          element={isConnected ? <Tavern /> : <Navigate to="/" replace />}
        />

        <Route
          path="/Combat"
          element={
            chevalier &&
            chevalier.equipements &&
            chevalier.equipements.length > 0 ? (
              <ChampdeBataille />
            ) : (
              <Navigate to="/Armurie" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
