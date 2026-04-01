<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="mx-auto max-w-2xl px-6 py-8 min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 py-12">
		{@render children()}
	</main>
	<Footer />
</div>
