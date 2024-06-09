import React, { useRef, useState } from "react";
import { z } from "zod";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plus from "@/assets/icons/plus.svg?react";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButtons } from "./buttons/PrimaryButtons";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";

const imageSchema = z.object({
  size: z.number().max(5000000, "Image size must be less than 5MB"),
  type: z
    .string()
    .refine((type) => ["image/jpeg", "image/png"].includes(type), {
      message: "Only JPEG and PNG images are allowed",
    }),
  height: z.number().refine((height) => height <= 2000, {
    message: "Image height must be less than or equal to 2000 pixels",
  }),
});

const ImageUploader: React.FC<{
  cb?: () => void;
  imageIndex?: number;
  bannerId?: string;
}> = ({ cb, imageIndex, bannerId }) => {
  const axiosPrivate = useAxiosPrivate();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  console.log({ imageIndex });
  const ref = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) validateAndSetImage(file);
  };

  const validateAndSetImage = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const imageValidation = imageSchema.safeParse({
        size: file.size,
        type: file.type,
        height: img.height,
      });
      if (!imageValidation.success) {
        const errors = imageValidation.error.errors
          .map((error) => error.message)
          .join(", ");
        console.log(errors);
        // toast.error(errors);
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    };
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) validateAndSetImage(file);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const bodyContent = new FormData();
    bodyContent.append("file", selectedImage);
    setUploading(true);
    try {
      await axiosPrivate.post(
        `/panel/banner/add/image/${bannerId}`,
        bodyContent, // Pass FormData directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        }
      );
      cb?.();
      // toast.success("Image uploaded successfully!");
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      // toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className="w-full h-full grid place-items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!previewUrl ? (
          <LinkButton onClick={() => ref.current?.click()}>
            افزودن تصویر
            <Plus width={20} height={20} />
          </LinkButton>
        ) : (
          <img
            src={previewUrl}
            alt="Selected"
            className="w-full h-24 rounded-t-md  object-cover place-self-start "
          />
        )}
      </div>
      <input
        type="file"
        ref={ref}
        className="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />
      {previewUrl && (
        <div className="w-full flex flex-col space-y-2">
          {(selectedImage || uploading) && (
            <PrimaryButtons
              onClick={handleImageUpload}
              disabled={uploading}
              fullWidth
            >
              {uploading ? "Uploading..." : "بارگذاری"}
            </PrimaryButtons>
          )}
          <PrimaryButtons
            fullWidth
            onClick={handleImageRemove}
            disabled={!selectedImage}
          >
            لغو
          </PrimaryButtons>
        </div>
      )}

      {/* <ToastContainer /> */}
    </>
  );
};

export default ImageUploader;
