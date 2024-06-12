import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plus from "@/assets/icons/plus.svg?react";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButtons } from "./buttons/PrimaryButtons";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import { createBannerSchema } from "@/validator/uploadBannerImage";
import { toast } from "react-toastify";
import { LoadingSpinnerButton } from "./LoadingSpinner";

const ALLOWED_WIDTH = 350;
const ImageUploader: React.FC<{
  cb?: () => void;
  imageIndex?: number;
  bannerId?: string;
  bannerHeight: number;
}> = ({ cb, imageIndex, bannerId, bannerHeight }) => {
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
    const bannerSchema = createBannerSchema(bannerHeight, ALLOWED_WIDTH);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const imageValidation = bannerSchema.safeParse({
          size: file.size,
          type: file.type,
          height: img.height,
          width: img.width,
        });
        if (!imageValidation.success) {
          const errors = imageValidation.error.errors
            .map((error) => error.message)
            .join(", ");
          console.log(errors);
          toast.error(errors);
          return;
        }

        setSelectedImage(file);
        setPreviewUrl(dataUrl);
      };
    };
    reader.readAsDataURL(file);
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
      toast.success("تصویر با موفقیت آپلود شد");
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("خطا در آپلود تصویر");
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
            className="w-full h-24 rounded-t-md object-cover place-self-start"
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
              {uploading ? <LoadingSpinnerButton /> : "بارگذاری"}
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
    </>
  );
};

export default ImageUploader;
