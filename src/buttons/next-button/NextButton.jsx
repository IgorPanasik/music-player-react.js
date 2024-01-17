const NextButton = ({ tracks, setCurrentTrack, currentTrack, audioRef }) => {
	const handleClick = () => {
		const currentIndex = tracks.findIndex(track => track === currentTrack);
		const nextIndex = (currentIndex + 1) % tracks.length;
		setCurrentTrack(tracks[nextIndex]);
		if (audioRef.current) {
			audioRef.current.src = tracks[nextIndex];
			audioRef.current.play().catch(error => console.log(error));
		}
	};

	return (
		<button title='Next Track' className='next' onClick={handleClick}>
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
					d='M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z'
				/>
			</svg>
		</button>
	);
};

export default NextButton;
