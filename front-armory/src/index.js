import { useState } from "react";
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
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("token"),
  );

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
            chevalier?.equipements?.length > 0 ? (
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
