import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/music-player-react.js/',
	plugins: [react()],
});
