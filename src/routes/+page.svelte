<script>
	import { siteMetadata } from '$lib/data';

	let { data } = $props();
</script>

<svelte:head>
	<title>{siteMetadata.title}</title>
	<meta name="description" content={siteMetadata.description} />
</svelte:head>

<section class="mb-16">
	<h1 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
		{siteMetadata.author}
	</h1>
	<p class="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
		{siteMetadata.description}
	</p>
</section>


<section class="mb-16">
	<h2 class="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-6">Recent posts</h2>
	<div class="flex flex-col gap-6">
		{#each data.posts as post}
			<a href="/blog/{post.slug}" class="group block">
				<div class="flex items-baseline justify-between gap-4">
					<h3 class="text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
						{post.title}
					</h3>
					<time class="text-sm text-zinc-400 dark:text-zinc-500 shrink-0">
						{new Date(post.date).toLocaleDateString('en-US', {
							month: 'short',
							year: 'numeric'
						})}
					</time>
				</div>
			</a>
		{/each}
	</div>
	<a href="/blog" class="inline-block mt-8 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
		View all posts &rarr;
	</a>
</section>

<section class="mb-16">
	<h2 class="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-6">Connect</h2>
	<div class="border-t border-zinc-200 dark:border-zinc-800">
		<a
			href={siteMetadata.social.github}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-baseline justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 group"
		>
			<span class="text-sm text-zinc-500 dark:text-zinc-400 w-24 shrink-0">GitHub</span>
			<span class="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">&rarr;</span>
		</a>
		<a
			href={siteMetadata.social.linkedin}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-baseline justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 group"
		>
			<span class="text-sm text-zinc-500 dark:text-zinc-400 w-24 shrink-0">LinkedIn</span>
			<span class="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">&rarr;</span>
		</a>
		<a
			href="mailto:{siteMetadata.email}"
			class="flex items-baseline justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 group"
		>
			<span class="text-sm text-zinc-500 dark:text-zinc-400 w-24 shrink-0">Email</span>
			<span class="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">&rarr;</span>
		</a>
    <a
    href={siteMetadata.social.x}
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-baseline justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 group"
  >
    <span class="text-sm text-zinc-500 dark:text-zinc-400 w-24 shrink-0">X</span>
    <span class="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">&rarr;</span>
  </a>
	</div>
</section>
