import { Article } from '@/lib/models';
import { ExternalLink } from 'lucide-react';

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <section id="press" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Press & Media</h2>
        
        {articles.length > 0 ? (
          <div className="max-w-5xl mx-auto space-y-8">
            {articles.map((article) => (
              <div key={article._id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{article.title}</h3>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <p className="text-gray-600 mb-3">{article.source}</p>
                <p className="text-gray-800 mb-4">{article.description}</p>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles to display</p>
        )}
      </div>
    </section>
  );
} 