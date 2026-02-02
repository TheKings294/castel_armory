import "../css/cour.css";

function CourDuChateau({ onOpenLogin }) {
    const chevalier = {
        isConnected: false,
        nom: "Dimitri",
        equipements: ["épée"],
    };

    const estEquipe = chevalier.equipements.length > 0;

    return (
        <main className="cour">
            <div className="cour-content">
                <div className="cour-panel">
                    <h1>Bienvenue au château de Valdrak</h1>

                    {!chevalier.isConnected ? (
                        <>
                            <h2>Le gardien vous observe d’un air méfiant</h2>
                            <p>
                                Vous devez vous faire reconnaître pour accéder à l’armurerie et
                                au champ de bataille.
                            </p>

                            <button className="btn btn-primary" onClick={onOpenLogin}>
                                Se connecter
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>Bienvenue, chevalier {chevalier.nom}</h2>

                            {!estEquipe ? (
                                <p>
                                    Vous n’êtes pas encore équipé. Retournez à l’armurerie avant
                                    d’aller au combat.
                                </p>
                            ) : (
                                <>
                                    <p>Vous êtes équipé et prêt à combattre.</p>
                                    <p>
                                        Équipements actuels :{" "}
                                        <strong>{chevalier.equipements.join(", ")}</strong>
                                    </p>
                                </>
                            )}
                        </>
                    )}
                </div>

                <section className="cour-card">
                    <h2>Histoire du château</h2>
                    <p>
                        Le château de Valdrak se dresse fièrement sur un promontoire rocheux,
                        dominant la vallée environnante. Ancienne forteresse médiévale, il
                        fut conçu à la fois comme un bastion défensif et une résidence
                        seigneuriale. Ses hautes tours de pierre sombre, ses remparts épais
                        et son donjon central témoignent d’un passé marqué par les conflits
                        et les stratégies militaires. Aujourd’hui, Valdrak incarne la
                        puissance et le mystère d’un lieu chargé d’histoire, où légendes et
                        réalité se confondent.
                    </p>
                </section>
            </div>
        </main>
    );
}

export default CourDuChateau;
