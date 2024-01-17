import React, { useEffect, useRef, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './position-track.css';

const PositionTrack = ({
	duration,
	currentTime,
	onChange,
	isPlaying,
	audioRef,
	currentTrack,
}) => {
	const [position, setPosition] = useState(currentTime);
	const [remainingTime, setRemainingTime] = useState(duration);
	const isDragging = useRef(false);

	useEffect(() => {
		if (audioRef.current.duration > 0 && !isDragging.current) {
			setPosition(currentTime);
			setRemainingTime(duration - currentTime);
		}
	}, [currentTime]);

	useEffect(() => {
		if (isPlaying && !isDragging.current) {
			setPosition(currentTime);
			setRemainingTime(duration - currentTime);
		}

		const timer = setInterval(() => {
			if (isPlaying) {
				setRemainingTime(prevTime => prevTime - 1);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [currentTime, isPlaying]);

	// Добавленный useEffect
	useEffect(() => {
		setPosition(0);
	}, [currentTrack]);

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
			2,
			'0'
		)}`;
	}

	return (
		<div className='position-track'>
			{duration > 0 && (
				<Range
					step={0.1}
					min={0}
					max={duration}
					values={[position]}
					onChange={values => {
						setPosition(values[0]);
						onChange(values[0]);
					}}
					onDragStart={() => {
						isDragging.current = true;
					}}
					onDragEnd={() => {
						isDragging.current = false;
					}}
					renderTrack={({ props, children }) => (
						<div
							className={'input'}
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '6px',
								width: '100%',
								display: 'flex',
								cursor: 'grab',
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '3px',
									width: '100%',
									borderRadius: '1.5px',
									background: getTrackBackground({
										values: [position],
										colors: ['#548BF4', '#ccc'],
										min: 0,
										max: duration,
									}),
									alignSelf: 'center',
									boxShadow: '0px 3px 10px #AAA',
								}}
							>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ props, isDragged }) => (
						<div
							{...props}
							style={{
								...props.style,
								height: '15px',
								width: '15px',
								backgroundColor: '#548BF4',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								boxShadow: '0px 4px 10px #AAA',
								outline: isDragged ? '1px solid #00008B' : 'none',
								borderRadius: '25px',
							}}
						></div>
					)}
				/>
			)}
			<div className='timer'>
				<span className='time'>{formatTime(position)}</span>
				<span className='time'>&mdash;{formatTime(remainingTime)}</span>
			</div>
		</div>
	);
};

export default PositionTrack;
