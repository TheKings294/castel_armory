import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Armurie from "./template/templates/armurie"; // assure-toi d'importer ce composant
import CourDuChateau from "./template/templates/cour-du-chateau";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isConnected = true;

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CourDuChateau />} />
      <Route
        path="/Armurie"
        element={isConnected ? <Armurie /> : <Navigate to="/" replace />}
      />
    </Routes>
  </BrowserRouter>,
);
