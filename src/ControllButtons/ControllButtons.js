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
	setPlayers,
}) {
	const deletePlayer = (playerId) =>
		setPlayers(players.filter((player) => player.id !== playerId));
	const changeNamePlayer = (playerId, name) =>
		setPlayers(
			players.map((player) => {
				if (player.id === playerId) return { ...player, name };
				return player
			})
		);
	const deleteMovePlayer = playerId =>  setPlayers(
		players.map((player) => {
			if (player.id === playerId) return { ...player, path: [{x:10, y: 10}] };
			return player
		})
	);

	return (
		<div className='controllButtons'>
			<button className='button' onClick={play}>
				{playing ? "stop" : "lancer"}
			</button>
			<button className='button' onClick={reset}>
				reset
			</button>
			<button className='button' onClick={addPlayer}>
				Ajouter un Joueur
			</button>
			<input
				type='number'
				className='speed'
				value={speed}
				onChange={(e) => setSpeed(e.target.value)}
			/>
			{players &&
				players.map((player) => (
					<PlayersOptions
						changeNamePlayer={changeNamePlayer}
						deleteMovePlayer={deleteMovePlayer}
						deletePlayer={deletePlayer}
						player={{ ...player }}
					/>
				))}
		</div>
	);
}
