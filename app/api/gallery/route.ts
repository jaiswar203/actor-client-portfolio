import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { addGalleryImage, getGalleryImages } from '@/lib/db';

export async function GET() {
  try {
    const images = await getGalleryImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
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
    if (!body.src || !body.alt) {
      return NextResponse.json(
        { error: 'Image URL and alt text are required' },
        { status: 400 }
      );
    }

    // Add image to the database
    const image = await addGalleryImage({
      src: body.src,
      alt: body.alt,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Failed to add gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to add gallery image' },
      { status: 500 }
    );
  }
} 