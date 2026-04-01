import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export async function load({ params }: { params: { slug: string } }) {
	const posts = await getPosts();
	const post = posts.find((p) => p.metadata.slug === params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post: post.metadata,
		component: post.default
	};
}
