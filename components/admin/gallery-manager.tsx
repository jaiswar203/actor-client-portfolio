"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Plus, Loader2, UploadCloud } from "lucide-react"
import { GalleryImage } from "@/lib/models"

interface GalleryManagerProps {
  initialImages: GalleryImage[]
}

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // State for bulk uploads
  const [bulkImageFiles, setBulkImageFiles] = useState<FileList | null>(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);

  const router = useRouter()
  const { toast } = useToast()

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imageFile || !altText) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image file and provide alt text.",
      })
      return
    }
    
    setIsUploading(true)
    
    try {
      // Step 1: Upload image to Cloudinary via our API
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload image to Cloudinary");
      }
      
      const imageUrl = uploadData.secure_url;

      // Step 2: Add image metadata to our database
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          src: imageUrl, // Use the URL from Cloudinary
          alt: altText,  // Use the alt text from state
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setImages([data, ...images])
        setImageFile(null)
        setAltText("")
        setIsDialogOpen(false)
        toast({
          title: "Success",
          description: "Image uploaded and added to gallery",
        })
        router.refresh()
      } else {
        // Consider if cleanup on Cloudinary is needed if this step fails
        throw new Error(data.error || "Failed to add image to gallery database")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Adding Image",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleBulkAddImages = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkImageFiles || bulkImageFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select one or more image files.",
      });
      return;
    }

    setIsBulkUploading(true);
    const newImages: GalleryImage[] = [];
    let successCount = 0;
    let errorCount = 0;
    const totalFiles = bulkImageFiles.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = bulkImageFiles[i];
      const altTextFromFile = file.name.replace(/\.[^/.]+$/, ""); // Use filename as alt text, remove extension

      try {
        // Update toast for progress (optional, can be noisy)
        // toast({ title: `Uploading ${i + 1} of ${totalFiles}`, description: file.name });

        const formData = new FormData();
        formData.append('file', file);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadData = await uploadResponse.json();
        
        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || `Failed to upload ${file.name} to Cloudinary`);
        }
        
        const imageUrl = uploadData.secure_url;

        const dbResponse = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ src: imageUrl, alt: altTextFromFile, createdAt: new Date() }), // Ensure createdAt is handled by API or add here if needed
        });
        
        const dbData = await dbResponse.json();
        
        if (dbResponse.ok) {
          newImages.push(dbData);
          successCount++;
        } else {
          errorCount++;
          console.error(`Failed to add ${file.name} to database:`, dbData.error || 'Unknown database error');
          toast({ // Individual error toast
            variant: "destructive",
            title: `Error adding ${file.name} to DB`,
            description: dbData.error || "Failed to save image metadata.",
          });
        }
      } catch (error) {
        errorCount++;
        console.error(`Error processing ${file.name}:`, error);
        toast({
          variant: "destructive",
          title: `Error uploading ${file.name}`,
          description: error instanceof Error ? error.message : "An unexpected error occurred during upload.",
        });
      }
    }

    if (newImages.length > 0) {
        setImages(prevImages => [...newImages, ...prevImages]);
    }
    
    setIsBulkUploading(false);
    setBulkImageFiles(null);
    setIsBulkDialogOpen(false);

    if (successCount > 0) {
      toast({
        title: "Bulk Upload Complete",
        description: `${successCount} image(s) uploaded successfully.`,
      });
    }
    if (errorCount > 0) {
      toast({
        variant: "destructive",
        title: "Bulk Upload Issues",
        description: `${errorCount} image(s) failed. Check console/notifications for details.`,
      });
    }
    if (successCount > 0 || errorCount > 0) { // Refresh if any action was attempted
        router.refresh();
    }
  };
  
  const handleDeleteImage = async (id: string) => {
    setIsDeleting(id)
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setImages(images.filter(image => image._id !== id))
        toast({
          title: "Success",
          description: "Image deleted from gallery",
        })
        router.refresh()
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete image")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsDeleting(null)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gallery Images</h2>
        <div className="flex items-center gap-2"> {/* Wrapper for buttons with gap */}
          <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);
            if (!isOpen) { // Reset form if dialog is closed
              setImageFile(null);
              setAltText("");
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogDescription>
                  Upload an image file and add it to your portfolio gallery.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddImage}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="imageFile">Image File</Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="alt">Alt Text</Label>
                    <Input
                      id="alt"
                      placeholder="Description of the image"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isUploading || !imageFile || !altText}>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : "Add Image"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Bulk Upload Dialog */}
          <Dialog open={isBulkDialogOpen} onOpenChange={(isOpen) => {
            setIsBulkDialogOpen(isOpen);
            if (!isOpen) setBulkImageFiles(null); // Reset form if dialog is closed
          }}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" /> {/* Using UploadCloud icon */}
                Bulk Add Images
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Add New Images</DialogTitle>
                <DialogDescription>
                  Upload multiple image files. Filenames (without extension) will be used as alt text.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBulkAddImages}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bulkImageFiles">Image Files</Label>
                    <Input
                      id="bulkImageFiles"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setBulkImageFiles(e.target.files)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isBulkUploading || !bulkImageFiles || bulkImageFiles.length === 0}>
                    {isBulkUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading ({bulkImageFiles?.length || 0} files)...
                      </>
                    ) : `Add ${bulkImageFiles?.length || 0} Image(s)`}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <Card key={image._id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-white line-clamp-1">{image.alt}</p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteImage(image._id as string)}
                      disabled={isDeleting === image._id}
                    >
                      {isDeleting === image._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {images.length === 0 && (
          <div className="col-span-full text-center p-8">
            <p className="text-muted-foreground">No images in the gallery yet</p>
          </div>
        )}
      </div>
    </div>
  )
} 