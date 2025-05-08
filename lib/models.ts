// Types for our models
export interface GalleryImage {
  _id?: string;
  src: string;
  alt: string;
  createdAt: Date;
}

export interface Article {
  _id?: string;
  source: string;
  title: string;
  description: string;
  link: string;
  date: string;
  createdAt: Date;
} 