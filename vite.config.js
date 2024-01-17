import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		viteStaticCopy({
			targets: [
				{ src: 'src/assets/sounds/*', dest: 'assets/sounds' },
				{ src: 'src/assets/covers/*', dest: 'assets/covers' },
			],
		}),
	],
});
