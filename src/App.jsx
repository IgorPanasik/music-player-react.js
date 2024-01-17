import './app.css';
import AudioPlayer from './components/audio-player/AudioPlayer';
import Snowfall from './components/snow-animation/SnowFlake';

import './reset.css';
function App() {
	return (
		<div className='container'>
			<Snowfall />
			<AudioPlayer />
		</div>
	);
}

export default App;
