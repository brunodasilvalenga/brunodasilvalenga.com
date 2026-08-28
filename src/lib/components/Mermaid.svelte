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

	async function renderMermaidBlocks() {
		if (!browser) return;
		const m = await getMermaid();
		const blocks = document.querySelectorAll('pre.mermaid:not([data-rendered])');

		await Promise.all(
			Array.from(blocks).map(async (block, index) => {
				const source = block.textContent ?? '';
				const id = `mermaid-svg-${Date.now()}-${index}`;
				try {
					const { svg } = await m.render(id, source);
					const wrapper = document.createElement('div');
					wrapper.className = 'mermaid-diagram my-6 overflow-x-auto';
					wrapper.innerHTML = svg;
					const svgEl = wrapper.querySelector('svg');
					if (svgEl) {
						svgEl.removeAttribute('style');
						const vb = svgEl.viewBox.baseVal;
						if (vb.width) svgEl.setAttribute('width', String(vb.width));
						if (vb.height) svgEl.setAttribute('height', String(vb.height));
					}
					block.replaceWith(wrapper);
				} catch (err) {
					console.error('Mermaid render error:', err);
					block.setAttribute('data-rendered', 'true');
				}
			})
		);
	}

	function rerenderAll() {
		if (!browser) return;
		document.querySelectorAll('.mermaid-diagram').forEach((el) => el.remove());
		renderMermaidBlocks();
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
