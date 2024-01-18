import React, { useCallback, useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './volume-control.css';

const VolumeControl = ({ isPlaying, audioRef }) => {
	const [volume, setVolume] = useState(25);
	const [isMuted, setIsMuted] = useState(false);

	const handleMKeyPress = useCallback(
		event => {
			if (event.key === 'm') {
				if (isMuted) {
					// Если звук выключен, восстановите его до исходного значения
					setVolume(25);
				} else {
					// Если звук включен, выключите его
					setVolume(0);
				}
				setIsMuted(!isMuted);
			}
		},
		[isMuted, setVolume, setIsMuted]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleMKeyPress);
		return () => {
			window.removeEventListener('keydown', handleMKeyPress);
		};
	}, [handleMKeyPress]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100;
		}
	}, [volume, isMuted, audioRef]);

	document
		.querySelectorAll('#Multimedia-\\(Color\\) path')
		.forEach(function (path) {
			const randomValue = Math.floor(Math.random() * 20) - 10;
			path.style.setProperty('--move', `${randomValue}px`);
			if (isPlaying) {
				path.classList.add('playing');
			} else {
				path.classList.remove('playing');
			}
		});

	const handleVolumeChange = values => {
		setVolume(values[0]);
		setIsMuted(false);
	};

	return (
		<>
			<div className='range' title='Press "m" for mute'>
				<Range
					step={1}
					min={0}
					max={100}
					values={[volume]}
					onChange={handleVolumeChange}
					renderTrack={({ props, children }) => (
						<div
							className='input'
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '7px',
								width: '100%',
								display: 'flex',
								cursor: 'grab',
							}}
						>
							<div className='track'
								ref={props.ref}
								style={{
									height: '3px',
									width: '100%',
									borderRadius: '1.5px',
									background: getTrackBackground({
										values: [volume],
										colors: ['#548BF4', '#ccc'],
										min: 0,
										max: 100,
									}),
									boxShadow: '2px 2px 10px #AAA',
									alignSelf: 'center',
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
								height: '35px',
								width: '35px',
								borderRadius: 'px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',

								outline: isDragged ? '1px solid #00008B' : 'none',
							}}
						>
							<svg
								viewBox='-1 0 104 104'
								version='1.1'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g
									id='3.Multimedia'
									stroke='none'
									strokeWidth='1'
									fill='none'
									fillRule='evenodd'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<g
										id='Multimedia-(Color)'
										transform='translate(-99.000000, -100.000000)'
										stroke='#4874cc'
										strokeWidth='8'
										fill='#000000'
									>
										<g
											id='1-multimeda-volume'
											transform='translate(100.000000, 102.000000)'
											strokeLinecap='round'
										>
											<path
												d='M0.980392157,52 L0.980392157,48'
												id='Layer-1'
											></path>
											<path
												d='M10.7843137,54 L10.7843137,46'
												id='Layer-2'
											></path>
											<path
												d='M20.5882353,70.0688837 L20.5882353,30'
												id='Layer-3'
											></path>
											<path
												d='M30.3921569,80.0089279 L30.3921569,20'
												id='Layer-4'
											></path>
											<path
												d='M40.1960784,100 L40.1960784,0'
												id='Layer-5'
											></path>
											<path d='M50,70 L50,30' id='Layer-6'></path>
											<path
												d='M59.8039216,64 L59.8039216,36'
												id='Layer-7'
											></path>
											<path
												d='M69.6078431,74.5325933 L69.6078431,26.4973984'
												id='Layer-8'
											></path>
											<path
												d='M79.4117647,61 L79.4117647,39'
												id='Layer-9'
											></path>
											<path
												d='M89.2156863,59 L89.2156863,41'
												id='Layer-10'
											></path>
											<path
												d='M99.0196078,63 L99.0196078,37'
												id='Layer-11'
											></path>
										</g>
									</g>
								</g>
							</svg>
						</div>
					)}
				/>
				<span className='volume'>{volume}</span>
			</div>
		</>
	);
};

export default VolumeControl;
