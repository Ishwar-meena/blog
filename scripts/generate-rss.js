import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';

const postsDirectory = path.join(process.cwd(), 'content');
const siteUrl = 'https://localhost:3000'; // ⬅️ Change to your actual site


export async function generateRSSFeed() {
    
  const files = fs.readdirSync(postsDirectory);
  const feed = new RSS({
    title: 'Hacker X Blog',
    description: 'Modern Web Dev, JavaScript, and Fullstack Insights',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Hacker X`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
    author: {
      name: 'Hacker X',
      email: 'hello@yourdomain.com',
      link: siteUrl,
    },
  });

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);

    
    feed.item({
      title: data.title,
      id: `${siteUrl}/blogpost/${slug}`,
      link: `${siteUrl}/blogpost/${slug}`,
      description: data.description,
      date: new Date(data.date),
      author: [
        {
          name: data.author || 'Hacker X',
        },
      ],
    });
  }

    // Generate RSS XML
  const rss = feed.xml({ indent: true });
  const rssOutputPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssOutputPath, rss);

  console.log('✅ RSS feed generated at /public/rss.xml');
}
