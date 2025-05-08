import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { deleteGalleryImage } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!isAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    // Delete image from the database
    const success = await deleteGalleryImage(id);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Failed to delete gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
} 