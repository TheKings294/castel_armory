import TavernMenu from "./TavernMenu";
import "../css/tavern.css";


export default function Tavern() {
    return (
        <section className="tavern">
            <h1>🍺 La Taverne du Sanglier Doré</h1>

            <p>
                « Ici, on sert à boire, pas à réfléchir. »
            </p>

            <TavernMenu />
        </section>
    );
}
