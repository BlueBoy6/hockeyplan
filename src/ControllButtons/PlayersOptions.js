import {useState} from 'react';
import './PlayersOptions.scss';

export default function PlayersOptions({player}){
    console.log('options: ', player)
    const [isOptionOpenned, setOptionOpenned] = useState(false)
    const openOptionPlayer = () => setOptionOpenned(!isOptionOpenned)
    return (
        <div className="player-options">
             <div className="player-option" onClick={openOptionPlayer} style={{background: player.color}}>{player.index}</div>
            {isOptionOpenned && <div>
                <button>Supprimer joueur</button>
            </div>}
        </div>
    )
}