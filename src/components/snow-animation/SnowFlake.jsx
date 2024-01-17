import React, { useEffect, useState } from 'react';
import './snow-animation.css';

const Snowflake = ({ left, animationDuration, size }) => (
	<div
		style={{
			position: 'absolute',
			top: '-7%',
			left: `${left}%`,
			animationName: 'fall',
			animationDuration: `${animationDuration}s`,
			animationTimingFunction: 'linear',
			animationIterationCount: 'infinite',
			fontSize: `${size}px`,
			opacity: '0.4',
			color: '#5574d3',
		}}
	>
		❄
	</div>
);

const Snowfall = () => {
	const [snowflakes, setSnowflakes] = useState([]);

	useEffect(() => {
		const maxSnowflakes = 100;
		const interval = setInterval(() => {
			if (snowflakes.length < maxSnowflakes) {
				const left = Math.floor(Math.random() * 100);
				const animationDuration = Math.floor(Math.random() * 10 + 60);
				const size = Math.random() * 30 + 10;

				setSnowflakes(prevSnowflakes => [
					...prevSnowflakes,
					{ left, animationDuration, size },
				]);
			}
		}, 450);

		return () => clearInterval(interval);
	}, [snowflakes]);

	return (
		<div className='container-snow'>
			{snowflakes.map((snowflake, index) => (
				<Snowflake key={index} {...snowflake} />
			))}
		</div>
	);
};

export default Snowfall;
