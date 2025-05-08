import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with just the cloud name for unsigned uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // No API key or secret needed for unsigned uploads
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer and then to base64
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${fileBuffer.toString("base64")}`;

    try {
      // Use unsigned upload with your upload preset
      const result = await cloudinary.uploader.unsigned_upload(
        dataUrl,
        "profile", // Your unsigned upload preset name
        {
          folder: "clieconnectme",
        }
      );

      return NextResponse.json({
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (cloudinaryError: any) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return NextResponse.json(
        {
          error: "Failed to upload image to Cloudinary",
          details: cloudinaryError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to process upload request", details: errorMessage },
      { status: 500 }
    );
  }
}
