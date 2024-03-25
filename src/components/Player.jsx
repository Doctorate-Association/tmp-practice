import { useState } from "react";

export default function Player({ initName, symbol, isActive, onPlayerNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initName);

    if (isActive) {
        console.log(`${symbol} isActive`)
    }

    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={
            event => {
                setName(event.target.value);
                // onPlayerNameChange(symbol, event.target.value);
            }
        }>
        </input>
    }

    function onClick() {
        if (isEditing) {
            onPlayerNameChange(symbol, name);
        }

        setIsEditing(x => !x);
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={onClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}