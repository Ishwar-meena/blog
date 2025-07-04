import fs from 'fs';
import path from 'path';
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { reporter } from 'vfile-reporter'
import matter from 'gray-matter';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import TableOfContents from '@/components/OnThisPageContent';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug';
import CommentSection from '@/components/CommentSection';
import ShareSection from '@/components/ShareSection';
import readingTime from 'reading-time';

// this function generates metadata for the blog post page
export async function generateMetadata({ params }) {
    const { slug } = await (params);
    const filePath = `content/${slug}.md`;

    if (!fs.existsSync(filePath)) {
        return {
            title: 'Blog Post Not Found',
            description: 'This blog post does not exist.',
            robots: { index: false, follow: false },
        };
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);

    const siteUrl = 'http://localhost:3000'; // ⬅️ Replace with actual domain
    const postUrl = `${siteUrl}/blogpost/${slug}`;
    const imageUrl = data.image ? `${siteUrl}${data.image}` : `${siteUrl}/default-og.png`;

    return {
        title: `${data.title} | Hacker X Blog`,
        description: data.description,
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            url: postUrl,
            siteName: 'Hacker X Blog',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: [imageUrl],
        },
        metadataBase: new URL(siteUrl),
    };
}


export default async function Page({ params }) {
    const { slug } = await (params);

    const filePath = `content/${slug}.md`;
    if (!fs.existsSync(filePath)) {
        return <div className="text-center text-red-500">Blog post not found</div>;
    }
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContent);
    const stats = readingTime(content); // 🔍 Analyze text
    console.log(stats);
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeSlug) // Add slugs to headings
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
            theme: 'github-dark',
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
        });

    const htmlContent = (await processor.process(content)).toString();


    // this is helpful in navigation 
    const postsDirectory = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(postsDirectory);
    // Get frontmatter from all posts
    const allPosts = files
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const filePath = path.join(postsDirectory, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            return { slug, ...data };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

    const currentIndex = allPosts.findIndex((post) => post.slug === slug);
    const prevPost = allPosts[currentIndex + 1] || null;
    const nextPost = allPosts[currentIndex - 1] || null;

    return (
        <main className="max-w-4xl mx-auto  px-4 py-8 " data-component="blog-card">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="mb-4 border-l-3  italic">{data.description}</p>
            <p className=" mb-1">By {data.author} | {data.date} • 📖 {stats.text}</p>

            <TableOfContents htmlContent={htmlContent} />
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose dark:prose-invert max-w-none" />

            <div className="mt-12 border-t pt-6 flex justify-between text-sm text-blue-600 dark:text-blue-400">
                {prevPost ? (
                    <a href={`/blogpost/${prevPost.slug}`} className="hover:underline">
                        ← {prevPost.title}
                    </a>
                ) : <span />}

                {nextPost ? (
                    <a href={`/blogpost/${nextPost.slug}`} className="hover:underline text-right">
                        {nextPost.title} →
                    </a>
                ) : <span />}
            </div>


            <ShareSection title={data.title} url={`http://localhost:3000/blogpost/${data.slug}`} />
            <CommentSection
                slug={data.slug}
            />
        </main>
    );
}