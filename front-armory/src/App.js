import { useState } from "react";
import LoginModal from "./template/login.jsx";
import CourDuChateau from "./template/templates/CourDuChateau.jsx";

function App() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <CourDuChateau onOpenLogin={() => setLoginOpen(true)} />

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSubmit={(data) => {
                    console.log("login:", data);
                    setLoginOpen(false);
                }}
            />
        </>
    );
}

export default App;
