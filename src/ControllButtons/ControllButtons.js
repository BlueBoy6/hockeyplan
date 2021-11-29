import './ControllButtons.scss'

export default function ControllButtons({playing, play, reset, addPlayer}) {
	return (
		<div className="controllButtons">
			<button className='actionnable-button' onClick={play}>
				{playing ? "stop" : "lancer"}
			</button>
			<button className='actionnable-button' onClick={reset}>
				reset
			</button>
			<button className='actionnable-button' onClick={addPlayer}>
				Ajouter un Joueur
			</button>
            <input type="number" className="" />
		</div>
	);
}
