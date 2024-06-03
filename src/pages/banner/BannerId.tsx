import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
// import router from "@/routes";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ImageUploader from "@/components/ui-kit/ImageUploader";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import clsx from "clsx";
import { bannerPosItems } from "@/components/banner/variablesBanner";
import router from "@/routes";

const LENGTH_IMAGE_PLACEHOLDER = 5;

const BannerId = () => {
  const axiosPrivate = useAxiosPrivate();
  const [removing, setRemoving] = useState<boolean>(false);
  // const [editing, setEditing] = useState<boolean>(false);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { id: bannerId } = useParams();
  const handleNavigate = () => {
    router.navigate(-1);
  };

  const { data, isLoading, mutate } = useSWR<ResponseDataNoArray<IBannerImg>>(
    `/panel/banner/get/${bannerId}`
  );

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }
  const { b64Images } = data?.body || {};
  // Ensure b64Images array length is 5
  if (b64Images) {
    while (b64Images.length < LENGTH_IMAGE_PLACEHOLDER) {
      b64Images.push("");
    }
  }

  const handleImageRemove = async (imageIndex: number) => {
    setRemoving(true);
    try {
      await axiosPrivate.delete(
        `/panel/banner/delete/image/${bannerId}/${imageIndex}`
      );
      mutate();
      toast.success("Image removed successfully!");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to remove image.");
    } finally {
      setRemoving(false);
    }
  };
  // const handleImageEdit = async(imageIndex: number) => {

  //     const bodyContent = new FormData();
  //     bodyContent.append("multipartFile", selectedImage);
  //     setEditing(true);
  //     try {
  //       await axiosPrivate.put(
  //         `/panel/banner/update/image/${bannerId}/${imageIndex}`,
  //         bodyContent, // Pass FormData directly
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data", // Set the correct content type
  //           },
  //         }
  //       );
  //       mutate();
  //       // toast.success("Image uploaded successfully!");

  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       // toast.error("Failed to upload image.");
  //     } finally {
  //       setEditing(false);
  //     }

  // }

  //i have add 8 because i have 4px padding on the image
  const heightBanner = clsx(
    {
      0: "h-0",
      30: "h-[188px]",
      50: "h-[208px]",
      80: "h-[238px]",
      100: "h-[258px]",
      130: "h-[288px]",
    }[data?.body.height || 0] || "h-[500px]"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{data?.body.name}</h1>
      <h6 className="text-xl">
        ارتفاع بنر {data?.body.height}px و موقعیت{" "}
        {
          bannerPosItems.find((item) => item.value === data?.body.position)
            ?.label
        }{" "}
        می باشد.
      </h6>
      <div className="flex flex-wrap gap-4 mt-4">
        {data?.body.b64Images.map((item, i) => (
          <div
            key={i}
            className={`w-[220px] rounded-md shadow-md overflow-hidden border flex flex-col items-center p-1 justify-start ${heightBanner}`}
            // style={{ height: `${data?.body.height + 20}px` }}
          >
            {item ? (
              <>
                <img
                  src={`data:image/png;base64,${item}`}
                  alt="banner"
                  className="object-fill w-full rounded-t-md mb-auto"
                  // style={{ height: `${data?.body.height}px` }}
                />
                <PrimaryButtons
                  onClick={() => handleImageRemove(i)}
                  disabled={removing}
                >
                  {removing ? "Removing..." : "حذف"}
                </PrimaryButtons>
                {/* //TODO: add edit */}
                {/* <PrimaryButtons
                  // onClick={() => handleImageEdit(i)}
                  disabled={removing}
                >
                  {editing ? "editing..." : "ویرایش"}
                </PrimaryButtons> */}
              </>
            ) : (
              <ImageUploader cb={mutate} imageIndex={i} bannerId={bannerId} />
            )}
          </div>
        ))}
      </div>
      <PrimaryButtons onClick={handleNavigate} className="mt-4">
        بازگشت
      </PrimaryButtons>
    </div>
  );
};

export default BannerId;
