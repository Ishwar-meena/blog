'use client';
import { useEffect, useState } from "react";

export default function TableOfContents({ htmlContent }) {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        if (!htmlContent) return;
        // Create a DOM parser to extract headings
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        const headingElements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const extracted = Array.from(headingElements).map((el) => ({
            id: el.id || el.textContent.replace(/\s+/g, '-').toLowerCase(),
            text: el.textContent,
            level: Number(el.tagName[1]),
        }));
        setHeadings(extracted);
    }, [htmlContent]);

    if (!headings.length) return null;

    return (
        <nav className="mb-8">
            <h2 className="font-bold mb-2">Table of Contents</h2>
            <ul className="space-y-1">
                {headings.map((heading, idx) => (
                    <li key={idx} style={{ marginLeft: (heading.level - 1) * 16 }}>
                        <a
                            href={`#${heading.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}