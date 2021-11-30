import { useState } from "react";
import ControllButtons from "./ControllButtons/ControllButtons";
import Player from "./Player/Player";
import "./styles.scss";
import { nanoid } from "nanoid";

export default function App() {
	const appStyle = {
		minHeight: "100vh",
		minWidth: "100vw",
		maxHeight: "100vh",
		maxWidth: "100vw",
		overflow: "hidden",
		background: "url('/hockeyplan.jpg') no-repeat 50% 50%",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	};

	const [playing, setPlaying] = useState(false);
	const [players, setPlayers] = useState([]);
	const [speed, setSpeed] = useState(50);
	const [timelapseRange, setTimelapseRange] = useState(0);
	const [timelapse, setTimelapse] = useState(0);
	const [pathShowed, setPathShowed] = useState(false);


	const play = () => setPlaying(!playing);

	const reset = () => {
		const resetPathPlayers = players.map((player) => ({ ...player, path: [] }));
		setPlayers(resetPathPlayers);
	};

	function rgbToHex(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	const randomColor = () => {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return rgbToHex(r, g, b);
	};

	const addPlayer = () => {
		const newPlayer = {
			id: nanoid(),
			name: `Joueur`,
			path: [],
			color: randomColor(),
		};
		setPlayers([...players, newPlayer]);
	};

	const addPosition = (playerId, newPlayerPosition) => {
		const playersWithNewPath = players.map((player) => {
			if (player.id === playerId)
				return { ...player, path: [...player.path, newPlayerPosition] };
			return player;
		});
		const playerWithMaxPath = Math.max(...players.map(p => p.path.length))
		setTimelapseRange(playerWithMaxPath)
		setPlayers(playersWithNewPath);
	};

	return (
		<div className='App' style={appStyle}>
			{players.length} joueurs
			{players.map((player) => (
				<Player
					key={player.id}
					playing={playing}
					player={player}
					addPosition={addPosition}
					speed={speed}
					players={players}
					timelapse={timelapse}
					pathShowed={pathShowed}
				/>
			))}
			<ControllButtons
				playing={playing}
				play={play}
				reset={reset}
				addPlayer={addPlayer}
				speed={speed}
				setSpeed={setSpeed}
				players={players}
				setPlayers={setPlayers}
				timelapse={timelapse}
				setTimelapse={setTimelapse}
				timelapseRange={timelapseRange}
				pathShowed={pathShowed}
				setPathShowed={setPathShowed}
			/>
		</div>
	);
}
