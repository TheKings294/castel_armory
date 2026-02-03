
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/combat.css";

function PageCombat({ chevalierId }) {
    const [chevalier, setChevalier] = useState({
        nom: "Arthur",
        equipements: ["Épée", "Bouclier", "Armure lourde"],
    });

    const [loading, setLoading] = useState(false);



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
    }, [chevalierId]);


    if (loading) {
        return (
            <p className="combat__loading">
                Chargement des informations du chevalier...
            </p>
        );
    }


    if (!chevalier || chevalier.equipements.length === 0) {
        return <Navigate to="/Armurie" replace />;
    }


    return (
        <main className="combat">
            <div className="combat__container">
                <header className="combat__header">
                    <h1 className="combat__title">Bienvenue au Combat, {chevalier.nom}</h1>
                    <p className="combat__subtitle">
                        Vous êtes prêt avec vos équipements : {chevalier.equipements.join(", ")}
                    </p>
                    <div className="combat__divider" />
                </header>

                <div className="combat__card">
                    <div className="combat__grid">
                        <section>
                            <h2 className="combat__sectionTitle">Votre équipement détaillé :</h2>
                            <ul className="combat__list">
                                {chevalier.equipements.map((item, index) => (
                                    <li className="combat__item" key={index}>
                                        <span className="combat__badge">{index + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="combat__actionsPanel">
                            <h2 className="combat__sectionTitle">Actions disponibles :</h2>
                            <div className="combat__actions">
                                <button className="btn btn--attack" onClick={() => alert("Vous attaquez l'ennemi !")}>
                                    Attaquer
                                </button>
                                <button className="btn btn--defend" onClick={() => alert("Vous défendez votre position !")}>
                                    Défendre
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );



export default PageCombat;
