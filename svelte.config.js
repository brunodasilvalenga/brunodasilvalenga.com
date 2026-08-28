import adapter from '@sveltejs/adapter-static';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { codeToHtml } from 'shiki';

const highlighter = {
	async highlighter(code, lang) {
		if (lang === 'mermaid') {
			return `<pre class="mermaid">${escapeSvelte(code)}</pre>`;
		}

		const language = lang && lang !== 'text' ? lang : 'text';
		const html = await codeToHtml(code, {
			lang: language,
			themes: {
				light: 'github-light',
				dark: 'github-dark'
			},
			defaultColor: false
		});
		return `{@html \`${escapeSvelte(html)}\`}`;
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			highlight: highlighter
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: 'warn'
		}
	},
	compilerOptions: {
		warningFilter: (warning) => !warning.code.startsWith('a11y')
	}
};

export default config;
