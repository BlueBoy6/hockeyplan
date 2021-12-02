import { useState, useEffect, createRef } from "react";
import "./Player.scss";

export default function Player({
	playing,
	player,
	addPosition,
	speed,
	timelapse,
	pathShowed,
}) {
	const startPosition = player.path[0] || 0;
	const myPoint = createRef();
	const [playerSelected, setPlayerSelected] = useState(false);
	// const [isMouseDown, setMouseDown] = useState(false);

	const playerStyle = {
		top: `${startPosition.y}px`,
		left: `${startPosition.x}px`,
		
		filter: playerSelected
			? `drop-shadow(0px 0px 7px ${player.color})`
			: `drop-shadow(0px 0px 1px ${player.color})`,
		transition: `${speed}ms ease-in-out`,
	};

	const playerRole = {
		background: player.role === 'def' ? player.color : 'transparent',
		borderBottom: player.role === 'atq' ?`30px solid ${player.color}` : 'none',
	}

	const makeMove = (pos) => {
		if (myPoint.current !== null && myPoint.current !== undefined && pos !== undefined) {
			myPoint.current.style.top = `${pos.y}px`;
			myPoint.current.style.left = `${pos.x}px`;
		}
	};

	const selectedPlayer = (event) => {
		setPlayerSelected(!playerSelected);
		event.stopPropagation();
	};

	async function startPlay() {
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));
		for (var i = 0; i < player.path.length; i++) {
			await timer(speed);
			makeMove(player.path[i]);
		}
	}

	// const dragEvent = (e) => {
	// 	if (isMouseDown && playerSelected) {
	// 		const pos = { x: e.clientX, y: e.clientY };
	// 		makeMove(pos);
	// 		addPosition(player.id, pos);
	// 	}
	// };

	const clickPosition = (e) => {
		if (playerSelected) {
			const pos = { x: e.clientX, y: e.clientY };
			makeMove(pos);
			addPosition(player.id, pos);
		}
	};


	useEffect(() => {
		if (playing) startPlay();
		if(player.path.length === 0) makeMove({x: window.innerWidth/2, y: window.innerHeight/2})
	}, [playing]);

	useEffect(() => {
		if (!!player.path.length) makeMove(player.path[Number(timelapse)]);
	}, [timelapse]);

	return (
		<div
			// onMouseDown={() => setMouseDown(true)}
			// onMouseUp={() => setMouseDown(false)}
			// onMouseMove={dragEvent}
			onClick={clickPosition}
			className={`positionCatcher ${playerSelected ? "selected" : ""}`}
		>
			<div
				className={`player ${playerSelected ? "selected" : ""} `}
				onClick={selectedPlayer}
				ref={myPoint}
				style={{ ...playerStyle }}
			>
				<span className='playerName'>{player.name}</span>
				<span className={`player-role ${player.role}`} style={{ ...playerRole }}/>
			</div>
			{(playerSelected || pathShowed) &&
				player.path.map((pos) => (
					<div
						key={pos.step}
						style={{
							background: player.color,
							top: pos.y + "px",
							left: pos.x + "px",
						}}
						className={`futurPositions ${playerSelected ? "showed" : ""}`}
					>
						{pos.step}
					</div>
				))}
		</div>
	);
}
