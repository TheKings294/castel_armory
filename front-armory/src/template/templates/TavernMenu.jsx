import "../css/tavern.css";

export default function TavernMenu() {
    return (
        <div className="tavern-menu">
            <h2>🍺 Carte de la Taverne</h2>

            <div className="menu-section">
                <h3>Boissons</h3>
                <ul>
                    <li>
                        <span>Chope de bière</span>
                        <em>— Ambrée et tiède</em>
                    </li>
                    <li>
                        <span>Vin du royaume</span>
                        <em>— Rouge, robuste</em>
                    </li>
                    <li>
                        <span>Hydromel</span>
                        <em>— Doux… parfois</em>
                    </li>
                </ul>
            </div>

            <div className="menu-section">
                <h3>Casse-croûte</h3>
                <ul>
                    <li>
                        <span>Pain & fromage</span>
                        <em>— Selon l’humeur du jour</em>
                    </li>
                    <li>
                        <span>Saucisson</span>
                        <em>— Tranché épais</em>
                    </li>
                    <li>
                        <span>Ragoût douteux</span>
                        <em>— Mais nourrissant</em>
                    </li>
                </ul>
            </div>
        </div>
    );
}
