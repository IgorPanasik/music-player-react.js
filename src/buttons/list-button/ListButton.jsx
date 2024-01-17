import React, { useEffect, useState } from 'react';
import BackButton from '../back-button/BackButton';
import './listButton-modal.css';

const ListButton = ({
	tracks,
	currentTrack,
	setCurrentTrack,
	isPlaying,
	handlePlayPause,
	setIsPlaying,
	audioRef,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyPress = event => {
			if (event.key === 'p') {
				setIsOpen(prevIsOpen => !prevIsOpen);
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const toggleList = () => {
		setIsOpen(!isOpen);
	};

	const handleTrackClick = track => {
		if (currentTrack !== track) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			setCurrentTrack(track);
		} else {
			handlePlayPause();
		}
	};

	return (
		<div>
			<button
				title='Playlist or Press "p"'
				className='list'
				onClick={toggleList}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={0.9}
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z'
					/>
				</svg>
			</button>
			{isOpen && (
				<div className={`${isOpen ? 'modal' : ''} `}>
					<div className='modal-button'>
						<h3>List Tracks:</h3>
						<BackButton onClick={toggleList} />
					</div>

					<ul>
						{tracks.map((track, index) => (
							<li
								key={index}
								onClick={() => handleTrackClick(track, index)}
								className={`${
									track === currentTrack && isPlaying ? 'playing' : ''
								}`}
							>
								<div className='cover'>
									<img
										className='cover-img'
										src={track.coverPath}
										alt='cover track'
									/>
								</div>
								<p className='info-track'>
									{track.artistName}- {track.trackName}
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ListButton;
