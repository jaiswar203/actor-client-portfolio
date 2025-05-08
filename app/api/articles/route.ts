import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { addArticle, getArticles } from '@/lib/db';

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    if (!isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const requiredFields = ['source', 'title', 'description', 'link', 'date'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Add article to the database
    const article = await addArticle({
      source: body.source,
      title: body.title,
      description: body.description,
      link: body.link,
      date: body.date,
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Failed to add article:', error);
    return NextResponse.json(
      { error: 'Failed to add article' },
      { status: 500 }
    );
  }
} 