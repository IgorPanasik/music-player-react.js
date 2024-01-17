import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import DownloadButton from '../../buttons/download-button/DownloadButton';
import ListButton from '../../buttons/list-button/ListButton';
import NextButton from '../../buttons/next-button/NextButton';
import PauseButton from '../../buttons/pause-button/PauseButton';
import PlayButton from '../../buttons/play-button/PlayButton';
import PrevTrack from '../../buttons/prev-button/PrevTrack';
import RepeatButton from '../../buttons/repeat-button/RepeatButton';
import ShuffleButton from '../../buttons/shuffle-button/ShuffleButton';
import Notification from '../notification/Notification';
import VolumeControl from '../volume-control/VolumeControl';
import './control-bar.css';

const ControlBar = ({
	tracks,
	audioRef,
	setCurrentTrack,
	currentTrack,
	handlePlayPause,
	setIsPlaying,
	isPlaying,
	currentTime,
	isShuffleOn,
	toggleShuffle,
}) => {
	const [volume, setVolume] = useState(50);
	const [isRepeat, setIsRepeat] = useState(false);
	const [isDownloaded, setIsDownloaded] = useState(false);

	const handleDownloadClick = () => {
		fetch(currentTrack.trackPath)
			.then(response => response.blob())
			.then(blob => {
				saveAs(blob, `${currentTrack.trackName}.mp3`);
				setIsDownloaded(true);
				setTimeout(() => {
					setIsDownloaded(false);
				}, 2000);
			})
			.catch(error => console.error('Error fetching audio file:', error));
	};

	useEffect(() => {
		const handleTimeUpdate = () => {
			if (audioRef.current.currentTime >= audioRef.current.duration - 1) {
				if (isRepeat) {
					// Если включен режим повторения, начать трек сначала
					audioRef.current.currentTime = 0;
					audioRef.current.play().catch(error => console.log(error));
				} else {
					// В противном случае, переключиться на следующий трек
					const currentIndex = tracks.findIndex(
						track => track === currentTrack
					);
					const nextIndex = (currentIndex + 1) % tracks.length;
					setCurrentTrack(tracks[nextIndex]);
					audioRef.current.pause();
					audioRef.current.currentTime = 0;
					audioRef.current.src = tracks[nextIndex].trackPath;
					audioRef.current.play().catch(error => console.log(error));
				}
			}
		};

		if (audioRef.current) {
			audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
			}
		};
	}, [audioRef, tracks, setCurrentTrack, currentTrack, isRepeat]);

	const handleRepeatClick = () => {
		setIsRepeat(!isRepeat);
	};

	return (
		<div className='control-buttons'>
			<div className='buttons-row'>
				<DownloadButton onClick={handleDownloadClick} />
				{isDownloaded && (
					<Notification onClick={() => setIsDownloaded(false)} />
				)}
				<ListButton
					tracks={tracks}
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					handlePlayPause={handlePlayPause}
					currentTime={currentTime}
				/>
			</div>
			<div className='buttons-row-two'>
				<RepeatButton
					onClick={handleRepeatClick}
					isActive={isRepeat}
					isPlaying={isPlaying}
				/>
				<div className='control-traks'>
					<PrevTrack
						tracks={tracks}
						setCurrentTrack={setCurrentTrack}
						currentTrack={currentTrack}
						audioRef={audioRef}
					/>
					{isPlaying ? (
						<PauseButton
							audioRef={audioRef}
							handlePlayPause={handlePlayPause}
						/>
					) : (
						<PlayButton audioRef={audioRef} handlePlayPause={handlePlayPause} />
					)}
					<NextButton
						audioRef={audioRef}
						tracks={tracks}
						setCurrentTrack={setCurrentTrack}
						currentTrack={currentTrack}
					/>
				</div>
				<div className='position-volume'>
					<ShuffleButton
						onShuffleToggle={toggleShuffle}
						isShuffleOn={isShuffleOn}
					/>
					<VolumeControl
						audioRef={audioRef}
						volume={volume}
						setVolume={setVolume}
						isPlaying={isPlaying}
					/>
				</div>
			</div>
		</div>
	);
};

export default ControlBar;
