import React, { useEffect, useRef, useState } from 'react';
import tracks from '../../assets/tracks/tracks';
import ControlBar from '../control-bar/ControlBar';
import PositionTrack from '../position-track/PositionTrack';
import './music-player.css';

const AudioPlayer = () => {
	const [currentTrack, setCurrentTrack] = useState(tracks[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isShuffleOn, setIsShuffleOn] = useState(false);
	const [trackList, setTrackList] = useState(tracks);
	const [isLoading, setIsLoading] = useState(false);

	const audioRef = useRef(new Audio());
	const pauseTimeRef = useRef(0);

	const shuffleTracks = tracksArray => {
		let currentIndex = tracksArray.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[tracksArray[currentIndex], tracksArray[randomIndex]] = [
				tracksArray[randomIndex],
				tracksArray[currentIndex],
			];
		}

		return tracksArray;
	};

	useEffect(() => {
		if (isShuffleOn) {
			const newShuffledTracks = shuffleTracks(tracks);
			setTrackList(newShuffledTracks);
			setCurrentTrack(newShuffledTracks[0]);
			audioRef.current.play().catch(error => console.log(error));
		} else {
			setTrackList(tracks);
		}
	}, [isShuffleOn, tracks]);

	useEffect(() => {
		const audio = audioRef.current;

		const setAudioData = () => {
			setDuration(audio.duration);
			if (isPlaying) {
				if (pauseTimeRef.current > 0) {
					audio.currentTime = pauseTimeRef.current;
					pauseTimeRef.current = 0;
				}
				playAudio();
			}
		};

		const playAudio = () => {
			return audio
				.play()
				.then(() => {})
				.catch(error => {
					console.error('Error during play:', error);
				});
		};

		const togglePlay = () => {
			setIsPlaying(!audio.paused);
		};

		const updateTime = () => {
			setCurrentTime(audio.currentTime);
		};

		audio.addEventListener('loadedmetadata', setAudioData);
		audio.addEventListener('play', togglePlay);
		audio.addEventListener('pause', togglePlay);
		audio.addEventListener('timeupdate', updateTime);

		return () => {
			audio.removeEventListener('loadedmetadata', setAudioData);
			audio.removeEventListener('play', togglePlay);
			audio.removeEventListener('pause', togglePlay);
			audio.removeEventListener('timeupdate', updateTime);
		};
	}, [
		isShuffleOn,
		tracks,
		shuffleTracks,
		setTrackList,
		setCurrentTrack,
		trackList,
		currentTrack,
		trackList.length,
	]);

	useEffect(() => {
		audioRef.current.src = currentTrack.trackPath;
		if (isPlaying) {
			audioRef.current.play().catch(error => console.log(error));
		}
	}, [currentTrack, isPlaying]);

	const handleTimeChange = value => {
		setCurrentTime(value);
		audioRef.current.currentTime = value;
	};

	const handlePlayPause = async () => {
		if (audioRef.current.paused || audioRef.current.ended) {
			setIsLoading(true);
			try {
				await audioRef.current.play();
				setIsPlaying(true);
				setIsLoading(false);
			} catch (error) {
				console.error('Error during play:', error);
				setIsPlaying(false);
				setIsLoading(true);
			}
		} else {
			pauseTimeRef.current = audioRef.current.currentTime; // Сохраняем текущее время при паузе
			audioRef.current.pause();
			setIsPlaying(false);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const handleKeyPress = event => {
			if (event.code === 'Space') {
				event.preventDefault(); // Предотвратить скроллинг страницы
				handlePlayPause();
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handlePlayPause]);

	const toggleShuffle = () => {
		setIsShuffleOn(true);
		setTimeout(() => {
			setIsShuffleOn(false);
		}, 100);
	};

	return (
		<div className='music-player '>
			{isLoading && (
				<div className='loading-icon-container'>
					<div className='loading-icon'></div>
				</div>
			)}
			<div className='speaker'></div>

			<div
				id='image-song'
				className={`image-song ${isPlaying ? 'animating' : ''}`}
				style={{ backgroundImage: `url(${currentTrack.coverPath})` }}
			></div>

			<div className='track-info'>
				<p className='author-song'>{currentTrack.artistName}</p>
				<p className='name-song'>{currentTrack.trackName}</p>
			</div>

			<PositionTrack
				duration={duration}
				currentTime={currentTime}
				currentTrack={currentTrack}
				pauseTimeRef={pauseTimeRef}
				audioRef={audioRef}
				onChange={handleTimeChange}
			/>

			<ControlBar
				tracks={tracks}
				currentTrack={currentTrack}
				audioRef={audioRef}
				isPlaying={isPlaying}
				currentTime={currentTime}
				isShuffleOn={isShuffleOn}
				pauseTimeRef={pauseTimeRef}
				setIsPlaying={setIsPlaying}
				setCurrentTrack={setCurrentTrack}
				handlePlayPause={handlePlayPause}
				toggleShuffle={toggleShuffle}
			/>
			<div className='speaker-bottom'></div>
		</div>
	);
};

export default AudioPlayer;
