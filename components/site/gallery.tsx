import { GalleryImage } from '@/lib/models';

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Image Gallery</h2>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image._id} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-72 object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No images to display</p>
        )}
      </div>
    </section>
  );
} 