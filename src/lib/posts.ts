export interface PostMetadata {
	title: string;
	date: string;
	tags: string[];
	draft: boolean;
	summary: string;
	slug: string;
}

export interface Post {
	metadata: PostMetadata;
	default: ConstructorOfATypedSvelteComponent;
}

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts: Post[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const mod = module as Post;
		const slug = path.split('/').pop()!.replace('.md', '');

		if (mod.metadata?.draft) continue;

		posts.push({
			metadata: {
				...mod.metadata,
				slug
			},
			default: mod.default
		});
	}

	return posts.sort(
		(a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	);
}

export async function getPost(slug: string): Promise<Post | undefined> {
	const posts = await getPosts();
	return posts.find((p) => p.metadata.slug === slug);
}
