const PrevTrack = ({ tracks, setCurrentTrack, currentTrack, audioRef }) => {
	const handleClick = () => {
		const currentIndex = tracks.findIndex(track => track === currentTrack);
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
		setCurrentTrack(tracks[prevIndex]);
		if (audioRef.current) {
			audioRef.current.src = tracks[prevIndex];
			audioRef.current.play().catch(error => console.log(error));
		}
	};

	return (
		<button title='Prev Track' className='prev' onClick={handleClick}>
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
					d='M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z'
				/>
			</svg>
		</button>
	);
};

export default PrevTrack;
