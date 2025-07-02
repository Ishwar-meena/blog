import fs from 'fs';
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
export default async function Page({ params }) {
    const { slug } = await (params);

    const filePath = `content/${slug}.md`;
    if (!fs.existsSync(filePath)) {
        return <div className="text-center text-red-500">Blog post not found</div>;
    }
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContent);


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

    return (
        <main className="max-w-4xl mx-auto  px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="mb-4 border-l-3  italic">{data.description}</p>
            <p className=" mb-1">By {data.author} | {data.date}</p>
            <TableOfContents htmlContent={htmlContent} />
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose dark:prose-invert max-w-none" />
        </main>
    );
}