import './pause-button.css';

const PauseButton = ({ handlePlayPause }) => {
	return (
		<button
			title='Pause or press "Space"'
			className='pause'
			onClick={handlePlayPause}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={0.7}
				stroke='currentColor'
				className='w-6 h-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
					className='animated-path'
				/>
			</svg>
		</button>
	);
};

export default PauseButton;
