import Link from 'next/link'; // If you're using Next.js

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Mastering JavaScript for Web Development",
      description: "Explore essential JavaScript concepts, tips, and real-world use cases for frontend development.",
      author: "Ishwar Meena",
      date: "June 25, 2025",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg", // Replace with real image
    },
    {
      id: 2,
      title: "Understanding RESTful APIs in Depth",
      description: "Learn how REST APIs work, how to create and consume them in your fullstack projects.",
      author: "HackerX Dev",
      date: "June 20, 2025",
      image: "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg",
    },
    {
      id: 3,
      title: "Why Tailwind CSS Is a Game Changer",
      description: "Discover how utility-first styling speeds up your development workflow and scales well.",
      author: "Frontend Pro",
      date: "June 10, 2025",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    },
  ];

  return (
    <section className="bg-white dark:bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Blog Posts
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Stay updated with modern development tutorials, guides, and insights.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              {/* Blog Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {blog.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    By <span className="font-medium">{blog.author}</span> on {blog.date}
                  </div>
                  <Link href={`/blog/${blog.id}`}>
                    <button className="w-full bg-gray-900 text-white dark:bg-white dark:text-black py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
