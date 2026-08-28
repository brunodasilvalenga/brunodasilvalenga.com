<script>
	import { siteMetadata } from '$lib/data';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} - {siteMetadata.title}</title>
	<meta name="description" content={data.post.summary} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.summary} />
	<meta property="og:type" content="article" />
</svelte:head>

<article>
	<header class="mb-8">
		<a href="/blog" class="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
			&larr; Back to blog
		</a>
		<h1 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-4">
			{data.post.title}
		</h1>
		<div class="flex items-center gap-3 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
			<time>
				{new Date(data.post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			{#if data.post.tags?.length}
				<span class="text-zinc-300 dark:text-zinc-600">|</span>
				<div class="flex gap-2">
					{#each data.post.tags as tag}
						<span class="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<div class="prose prose-zinc dark:prose-invert prose-sm max-w-none
		prose-headings:font-semibold
		prose-a:text-zinc-800 dark:prose-a:text-zinc-200 prose-a:no-underline hover:prose-a:underline
		prose-code:text-sm prose-code:bg-zinc-100 prose-code:dark:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
		prose-code:before:content-none prose-code:after:content-none">
		<data.component />
	</div>
</article>
