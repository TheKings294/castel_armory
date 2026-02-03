import { useMemo, useState } from "react";
import "../css/tavern.css";

export default function Taverne() {
    const menu = useMemo(
        () => ({
            boissons: [
                { id: "biere", nom: "Chope de bière", desc: "Ambrée et tiède", icon: "🍺" },
                { id: "vin", nom: "Vin du royaume", desc: "Rouge, robuste", icon: "🍷" },
                { id: "hydromel", nom: "Hydromel", desc: "Doux… parfois", icon: "🍯" },
            ],
            casseCroute: [
                { id: "fromage", nom: "Pain & fromage", desc: "Selon l’humeur du jour", icon: "🧀" },
                { id: "saucisson", nom: "Saucisson", desc: "Tranché épais", icon: "🥩" },
                { id: "ragout", nom: "Ragoût douteux", desc: "Mais nourrissant", icon: "🍲" },
            ],
        }),
        []
    );

    const [table, setTable] = useState([]); // tableau d'ids sélectionnés

    const toggleItem = (itemId) => {
        setTable((prev) =>
            prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        );
    };

    const clearTable = () => setTable([]);

    // Pour retrouver les infos d'un item à partir de son id
    const itemsById = useMemo(() => {
        const all = [...menu.boissons, ...menu.casseCroute];
        return Object.fromEntries(all.map((i) => [i.id, i]));
    }, [menu]);

    return (
        <main className="tavern-page">
            <section className="tavern-left">
                <h1>🍺 La Taverne du Sanglier Doré</h1>
                <p className="tavern-quote">« Ici, on sert à boire, pas à réfléchir. »</p>

                <div className="menu-card">
                    <h2>Carte de la taverne</h2>

                    <div className="menu-section">
                        <h3>Boissons</h3>
                        <ul className="menu-list">
                            {menu.boissons.map((item) => {
                                const selected = table.includes(item.id);
                                return (
                                    <li key={item.id}>
                                        <button
                                            className={`menu-item ${selected ? "selected" : ""}`}
                                            onClick={() => toggleItem(item.id)}
                                            type="button"
                                        >
                                            <span className="menu-icon">{item.icon}</span>
                                            <span className="menu-name">{item.nom}</span>
                                            <span className="menu-desc">{item.desc}</span>
                                            <span className="menu-action">{selected ? "Retirer" : "Poser"}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="menu-section">
                        <h3>Casse-croûte</h3>
                        <ul className="menu-list">
                            {menu.casseCroute.map((item) => {
                                const selected = table.includes(item.id);
                                return (
                                    <li key={item.id}>
                                        <button
                                            className={`menu-item ${selected ? "selected" : ""}`}
                                            onClick={() => toggleItem(item.id)}
                                            type="button"
                                        >
                                            <span className="menu-icon">{item.icon}</span>
                                            <span className="menu-name">{item.nom}</span>
                                            <span className="menu-desc">{item.desc}</span>
                                            <span className="menu-action">{selected ? "Retirer" : "Poser"}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="menu-footer">
                        <button className="btn-clear" onClick={clearTable} type="button" disabled={table.length === 0}>
                            Vider la table
                        </button>
                    </div>
                </div>
            </section>

            <aside className="tavern-right">
                <div className="table-card">
                    <div className="table-header">
                        <h2>🪵 Table en bois</h2>
                        <p>{table.length === 0 ? "Rien sur la table." : `${table.length} objet(s) posé(s).`}</p>
                    </div>

                    <div className="wood-table">
                        {table.length === 0 ? (
                            <div className="table-empty">Pose quelque chose depuis la carte 🍻</div>
                        ) : (
                            <div className="table-items">
                                {table.map((id) => {
                                    const item = itemsById[id];
                                    return (
                                        <button
                                            key={id}
                                            className="table-item"
                                            onClick={() => toggleItem(id)}
                                            title="Cliquer pour retirer"
                                            type="button"
                                        >
                                            <span className="table-icon">{item.icon}</span>
                                            <span className="table-label">{item.nom}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <p className="table-hint">Astuce : clique sur un objet sur la table pour le retirer.</p>
                </div>
            </aside>
        </main>
    );
}
