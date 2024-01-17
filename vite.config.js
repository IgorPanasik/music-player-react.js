import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	base: '/music-player-react.js/',
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{ src: 'src/assets/sounds/*', dest: 'assets/sounds' },
				{ src: 'src/assets/covers/*', dest: 'assets/covers' },
			],
		}),
	],
});
