<script>
	import { siteMetadata } from '$lib/data';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - {siteMetadata.title}</title>
	<meta name="description" content="All blog posts by {siteMetadata.author}" />
</svelte:head>

<h1 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8">Blog</h1>

<div class="flex flex-col gap-8">
	{#each data.posts as post}
		<article>
			<a href="/blog/{post.slug}" class="group block">
				<time class="text-sm text-zinc-500 dark:text-zinc-400">
					{new Date(post.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				<h2 class="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors mt-1">
					{post.title}
				</h2>
				{#if post.summary}
					<p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">{post.summary}</p>
				{/if}
			</a>
		</article>
	{/each}
</div>
