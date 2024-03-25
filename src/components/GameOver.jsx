export default function GameOver({ winner, reset }) {
    return (<div id="game-over">
        <h2>GameOver</h2>
        <p>{(winner === "X" || winner === "O") ? winner : "Nobody"} won</p>
        <p>
            <button onClick={reset}>Rematch</button>
        </p>
    </div>);
}