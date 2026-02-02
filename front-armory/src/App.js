import { useState } from "react";
import LoginModal from "./template/login.jsx";
import Tavern from "./template/templates/taverne.jsx";

function App() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <div>
            <Tavern />

            <button onClick={() => setLoginOpen(true)}>
                Se connecter
            </button>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSubmit={(data) => {
                    console.log("login:", data);
                    setLoginOpen(false);
                }}
            />
        </div>
    );
}

export default App;
