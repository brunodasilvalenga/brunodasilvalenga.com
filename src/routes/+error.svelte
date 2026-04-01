<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div class="flex flex-col items-center justify-center py-20 text-center">
	<h1 class="text-4xl font-semibold text-zinc-900 dark:text-zinc-100">{page.status}</h1>
	<p class="mt-2 text-zinc-500 dark:text-zinc-400">{page.error?.message}</p>
	<a href="/" class="mt-6 text-sm text-zinc-900 dark:text-zinc-100 hover:underline">&larr; Back home</a>
</div>
