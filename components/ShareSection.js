'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ShareSection({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareTitle, setShareTitle] = useState('');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url || window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    setShareTitle(encodeURIComponent(title || 'Check this out!'));
    setShareUrl(encodeURIComponent(url));
  }, [title,url]);
  


  return (
    <section className="mt-16">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">🔗 Share this post</h3>
      <div className="flex flex-wrap gap-4">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#0077b5] text-white rounded hover:bg-[#005885] transition text-sm"
        >
          LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
        >
          Twitter (X)
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition text-sm"
        >
          Facebook
        </a>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </section>
  );
}
