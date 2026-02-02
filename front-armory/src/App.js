import React, { useEffect, useState } from "react";
import LoginModal from "./template/login.jsx";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const open = () => setLoginOpen(true);
    window.addEventListener("open-login-modal", open);
    return () => window.removeEventListener("open-login-modal", open);
  }, []);

  const handleLoginSubmit = ({ email, password }) => {
    console.log("Login submit:", { email, password });

  };

  return (
      <div>
        <button onClick={() => setLoginOpen(true)}>Se connecter (test)</button>

        <LoginModal
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            onSubmit={handleLoginSubmit}
        />


      </div>
  );
}

export default App;
