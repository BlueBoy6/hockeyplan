import "./ControllButtons.scss";
import PlayersOptions from "./PlayersOptions";

export default function ControllButtons({
	playing,
	play,
	reset,
	addPlayer,
	speed,
	setSpeed,
	players,
	setPlayers
}) {

	return (
		<div className='controllButtons'>
			<button className='actionnable-button' onClick={play}>
				{playing ? "stop" : "lancer"}
			</button>
			<button className='actionnable-button' onClick={reset}>
				reset
			</button>
			<button className='actionnable-button' onClick={addPlayer}>
				Ajouter un Joueur
			</button>
			<input type='number' className='speed' value={speed} onChange={(e) => setSpeed(e.target.value)} />
			{players && players.map((player, index) => <PlayersOptions player={{...player, index}} />) }
		</div>
	);
}
