<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let mermaid;

	async function getMermaid() {
		if (!mermaid) {
			const mod = await import('mermaid');
			mermaid = mod.default;
		}
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'loose',
			theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
			flowchart: {
				htmlLabels: true,
				curve: 'basis'
			}
		});
		return mermaid;
	}

	async function renderInto(target, source, index) {
		const m = await getMermaid();
		const id = `mermaid-svg-${Date.now()}-${index}`;
		const { svg } = await m.render(id, source);
		target.innerHTML = svg;
		const svgEl = target.querySelector('svg');
		if (svgEl) {
			svgEl.removeAttribute('style');
			const vb = svgEl.viewBox.baseVal;
			if (vb.width) svgEl.setAttribute('width', String(vb.width));
			if (vb.height) svgEl.setAttribute('height', String(vb.height));
		}
	}

	async function renderMermaidBlocks() {
		if (!browser) return;
		const blocks = document.querySelectorAll('pre.mermaid:not([data-rendered])');

		await Promise.all(
			Array.from(blocks).map(async (block, index) => {
				const source = block.textContent ?? '';
				const wrapper = document.createElement('div');
				wrapper.className = 'mermaid-diagram my-6 overflow-x-auto';
				wrapper.dataset.source = source;
				block.replaceWith(wrapper);
				try {
					await renderInto(wrapper, source, index);
				} catch (err) {
					console.error('Mermaid render error:', err);
				}
			})
		);
	}

	async function rerenderAll() {
		if (!browser) return;
		const diagrams = document.querySelectorAll('.mermaid-diagram');
		await Promise.all(
			Array.from(diagrams).map((wrapper, index) => {
				const source = wrapper.dataset.source;
				if (!source) return Promise.resolve();
				return renderInto(wrapper, source, index).catch((err) =>
					console.error('Mermaid rerender error:', err)
				);
			})
		);
	}

	onMount(() => {
		renderMermaidBlocks();

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					rerenderAll();
				}
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		afterNavigate(() => renderMermaidBlocks());

		return () => observer.disconnect();
	});
</script>
