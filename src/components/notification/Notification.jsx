import React, { useEffect, useState } from 'react';
import './notification.css';

const Notification = ({ onClick }) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className={`svg-check ${isVisible ? 'visible' : ''}`}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1}
				stroke='currentColor'
				className='w-6 h-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
				/>
			</svg>
			<p className='notification' onClick={onClick}>
				Successfully
			</p>
		</div>
	);
};

export default Notification;
