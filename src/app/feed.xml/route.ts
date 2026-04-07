import { getAllArticles } from "@/lib/articles";

export async function GET() {
  const articles = getAllArticles();
  const siteUrl = "https://cuvasports.com";

  const items = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/reports/${article.slug}</link>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.category}</category>
      <guid>${siteUrl}/reports/${article.slug}</guid>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CUVA Sports</title>
    <link>${siteUrl}</link>
    <description>Expert football and cricket journalism by William Powell</description>
    <language>en-gb</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
