import React, { useEffect, useState } from 'react';
import './shuffle-button.css';

const ShuffleButton = ({ onShuffleToggle }) => {
	const [isShuffleOn, setIsShuffleOn] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [debounceTimeout, setDebounceTimeout] = useState(null);

	const handleShuffleClick = () => {
		setIsShuffleOn(!isShuffleOn);
		onShuffleToggle();
		setIsActive(true);

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		const newTimeout = setTimeout(() => {
			setIsActive(false);
		}, 2500);
		setDebounceTimeout(newTimeout);
	};

	useEffect(() => {
		return () => {
			if (debounceTimeout) {
				clearTimeout(debounceTimeout);
			}
		};
	}, [debounceTimeout]);

	return (
		<button
			title='Shuffle & Play'
			className={`shuffle ${isActive ? 'active-shuffle' : ''}`}
			onClick={handleShuffleClick}
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
					d='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
				/>
			</svg>
		</button>
	);
};

export default ShuffleButton;
