import { ObjectId, WithId, Document } from 'mongodb';
import clientPromise from './mongodb';
import { GalleryImage, Article } from './models';

// Helper function to map MongoDB document to our type
function mapDocument<T>(doc: WithId<Document>): T {
  const { _id, ...rest } = doc;
  return {
    _id: _id.toString(), // Convert ObjectId to string
    ...rest,
  } as T;
}

// Gallery Images
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const client = await clientPromise;
  const collection = client.db().collection<Document>('gallery'); // Specify Document type here
  const documents = await collection.find({}).sort({ createdAt: -1 }).toArray();
  // Map each document to the GalleryImage type
  return documents.map(doc => mapDocument<GalleryImage>(doc));
}

export async function addGalleryImage(image: Omit<GalleryImage, '_id' | 'createdAt'>): Promise<GalleryImage> {
  const client = await clientPromise;
  const collection = client.db().collection('gallery');
  const result = await collection.insertOne({
    ...image,
    createdAt: new Date()
  });
  return {
    _id: result.insertedId.toString(),
    ...image,
    createdAt: new Date()
  };
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const client = await clientPromise;
  const collection = client.db().collection('gallery');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// Articles
export async function getArticles(): Promise<Article[]> {
  const client = await clientPromise;
  const collection = client.db().collection<Document>('articles'); // Specify Document type here
  const documents = await collection.find({}).sort({ createdAt: -1 }).toArray();
   // Map each document to the Article type
  return documents.map(doc => mapDocument<Article>(doc));
}

export async function addArticle(article: Omit<Article, '_id' | 'createdAt'>): Promise<Article> {
  const client = await clientPromise;
  const collection = client.db().collection('articles');
  const result = await collection.insertOne({
    ...article,
    createdAt: new Date()
  });
  return {
    _id: result.insertedId.toString(),
    ...article,
    createdAt: new Date()
  };
}

export async function updateArticle(id: string, article: Partial<Omit<Article, '_id' | 'createdAt'>>): Promise<boolean> {
  const client = await clientPromise;
  const collection = client.db().collection('articles');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: article }
  );
  return result.modifiedCount === 1;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const client = await clientPromise;
  const collection = client.db().collection('articles');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
} 