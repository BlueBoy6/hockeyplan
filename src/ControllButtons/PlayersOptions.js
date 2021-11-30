import { useState } from "react";
import "./PlayersOptions.scss";

export default function PlayersOptions({ player, deletePlayer, changeNamePlayer, changeColorPlayer, deleteMovePlayer }) {

	const [isOptionOpenned, setOptionOpenned] = useState(false);
    
	const openOptionPlayer = () => setOptionOpenned(!isOptionOpenned);
    const deleteP = () => deletePlayer(player.id)
    const changeName = (e) => changeNamePlayer(player.id, e.target.value)
    const deleteMove = () => deleteMovePlayer(player.id)
    const changeColor = (e) => changeColorPlayer(player.id, e.target.value)

	return (
		<div className='player-options'>
			<div
				className='player-option'
				onClick={openOptionPlayer}
				style={{ background: player.color }}
			>
				{player.name}
			</div>
			{isOptionOpenned && (
				<div className='options' style={{ background: player.color }}>
					<button onClick={deleteP} className="button">Supprimer joueur</button>
					<button onClick={deleteMove} className="button">Supprimer le mouvement</button>
                    <input  type="text" placeholder="Nom du joueur" onChange={changeName} value={player.name} />
                    <input type="color" onChange={changeColor} value={player.color}/>
				</div>
			)}
		</div>
	);
}
