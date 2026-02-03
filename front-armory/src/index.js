import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useChevalierEquipements } from "./hook/a";
import Header from "./template/components/Header";
import Armurie from "./template/templates/armurie";
import ChampdeBataille from "./template/templates/ChampDeBataille";
import CourDuChateau from "./template/templates/CourDuChateau";
import Tavern from "./template/templates/taverne";

function App() {
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("token"),
  );

  // Hook pour récupérer le chevalier et ses équipements
  const { chevalier, equipements, estEquipe, loading, error } =
    useChevalierEquipements(isConnected);

  if (loading) return <p>Chargement des équipements...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <BrowserRouter>
      <Header
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        chevalier={chevalier}
      />

      <Routes>
        <Route path="/" element={<CourDuChateau />} />

        <Route
          path="/Armurie"
          element={isConnected ? <Armurie /> : <Navigate to="/" />}
        />

        <Route
          path="/Taverne"
          element={isConnected ? <Tavern /> : <Navigate to="/" />}
        />

        <Route
          path="/Combat"
          element={
            isConnected && estEquipe ? (
              <ChampdeBataille />
            ) : (
              <Navigate to="/Armurie" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
