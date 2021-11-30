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
	timelapse,
	setTimelapse,
	timelapseRange,
	pathShowed,
	setPathShowed,
}) {
	const deletePlayer = (playerId) =>
		setPlayers(players.filter((player) => player.id !== playerId));

	const changeNamePlayer = (playerId, name) =>
		setPlayers(
			players.map((player) => {
				if (player.id === playerId) return { ...player, name };
				return player;
			})
		);

	const changeColorPlayer = (playerId, color) =>
		setPlayers(
			players.map((player) => {
				if (player.id === playerId) return { ...player, color };
				return player;
			})
		);

	const deleteMovePlayer = (playerId) =>
		setPlayers(
			players.map((player) => {
				if (player.id === playerId) return { ...player, path: [] };
				return player;
			})
		);

	const togglePathShowed = () => setPathShowed(!pathShowed);

	return (
		<div className='controllButtons'>
			<input
				type='range'
				value={timelapse}
				min='0'
				step='1'
				max={timelapseRange}
				onChange={(e) => setTimelapse(e.target.value)}
			/>
			<button className='button' onClick={togglePathShowed}>
				{pathShowed ? "Cacher" : "Montrer"} les parcours
			</button>
			<button className='button' onClick={play}>
				{playing ? "Stop" : "Lancer"}
			</button>
			<button className='button' onClick={reset}>
				Reset
			</button>
			<button className='button' onClick={addPlayer}>
				Ajouter un Joueur
			</button>
			<div>
				Vitesse {" "}
				<input
					type='number'
					className='speed'
					value={speed}
					onChange={(e) => setSpeed(e.target.value)}
				/>
			</div>
			{players &&
				players.map((player) => (
					<PlayersOptions
						key={player.id}
						changeNamePlayer={changeNamePlayer}
						changeColorPlayer={changeColorPlayer}
						deleteMovePlayer={deleteMovePlayer}
						deletePlayer={deletePlayer}
						player={{ ...player }}
					/>
				))}
		</div>
	);
}
