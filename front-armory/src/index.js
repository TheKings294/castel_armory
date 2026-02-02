import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Armurie from "./template/templates/armurie";
import CourDuChateau from "./template/templates/CourDuChateau";

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
