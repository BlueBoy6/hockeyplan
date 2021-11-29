import { useState, useEffect, createRef } from "react";
import "./Player.scss";

export default function Player({ playing, player, addPosition, speed }) {
	const startPosition = player.path[0] || 0;
	const myPoint = createRef();
	const [playerSelected, setPlayerSelected] = useState(false);
	const [isMouseDown, setMouseDown] = useState(false);

	const playerStyle = {
		top: `${startPosition.y}px`,
		left: `${startPosition.x}px`,
		background: player.color,
		boxShadow: playerSelected
			? `0px 0px 5px 5px ${player.color}`
			: `0px 0px 1px 1px ${player.color}`,
		transition: playerSelected ? "0s" : `${speed}ms ease-in-out`,
	};

	const makeMove = (pos) => {
		if (myPoint.current !== null && myPoint.current !== undefined) {
			myPoint.current.style.top = `${pos.y}px`;
			myPoint.current.style.left = `${pos.x}px`;
		}
	};

	const selectedPlayer = (event) => {
		setPlayerSelected(!playerSelected);
		console.log('try right : ',event)
		event.stopPropagation();
	};

	async function startPlay() {
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));
		for (var i = 0; i < player.path.length; i++) {
			await timer(speed);
			makeMove(player.path[i]);
		}
	}

	const dragEvent = (e) => {
		if (isMouseDown) {
			const pos = { x: e.clientX, y: e.clientY };
			makeMove(pos);
			addPosition(player.id, pos);
		}
	};

	useEffect(() => {
		if (playing) startPlay();
	}, [playing]);

	return (
		<div
			onMouseDown={() => setMouseDown(true)}
			onMouseUp={() => setMouseDown(false)}
			onMouseMove={dragEvent}
			className={`positionCatcher ${playerSelected ? "selected" : ""}`}
		>
			<div
				className={`player ${playerSelected ? "selected" : ""}`}
				onClick={selectedPlayer}
				ref={myPoint}
				style={{ ...playerStyle }}
			>
				🏒
			</div>
			{playerSelected && <PlayerOptions players={players} />}
			{playerSelected &&
				player.path.map((pos, index) => (
					<div
						key={index}
						style={{
							background: player.color,
							top: pos.y + "px",
							left: pos.x + "px",
						}}
						className={`futurPositions ${playerSelected ? "showed" : ""}`}
					/>
				))}
		</div>
	);
}
