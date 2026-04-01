<script>
	import { siteMetadata } from '$lib/data';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<footer class="border-t border-zinc-200 dark:border-zinc-800 pt-6 pb-2">
	<div class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
		<span>&copy; {new Date().getFullYear()} {siteMetadata.author}</span>
		<ThemeToggle />
	</div>
</footer>
