import { getPosts } from '$lib/posts';
import { siteMetadata } from '$lib/data';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	const items = posts
		.map(
			(post) => `
		<item>
			<title><![CDATA[${post.metadata.title}]]></title>
			<link>${siteMetadata.siteUrl}/blog/${post.metadata.slug}</link>
			<guid isPermaLink="true">${siteMetadata.siteUrl}/blog/${post.metadata.slug}</guid>
			<description><![CDATA[${post.metadata.summary || ''}]]></description>
			<pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
		</item>`
		)
		.join('');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${siteMetadata.title}</title>
		<link>${siteMetadata.siteUrl}</link>
		<description>${siteMetadata.description}</description>
		<atom:link href="${siteMetadata.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		${items}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
