import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
// import router from "@/routes";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ImageUploader from "@/components/ui-kit/ImageUploader";
import { useState } from "react";
import { axiosInstance } from "@/services/axios";
import { toast } from "react-toastify";

const LENGTH_IMAGE_PLACEHOLDER = 5;

const BannerId = () => {
  const [removing, setRemoving] = useState<boolean>(false);
  const { id: bannerId } = useParams();
  const handleNavigate = () => {
    // router.navigate(-1);
  };

  const { data, isLoading, mutate } = useSWR<ResponseDataNoArray<IBannerImg>>(
    `/panel/banner/get/${bannerId}`
  );

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }

  // Ensure b64Images array length is 5
  if (data?.body?.b64Images) {
    while (data.body.b64Images.length < LENGTH_IMAGE_PLACEHOLDER) {
      data.body.b64Images.push("");
    }
  }

  const handleImageRemove = async (imageIndex: number) => {
    setRemoving(true);
    try {
      await axiosInstance.delete(
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{data?.body.name}</h1>
      <h6 className="text-xl">
        {data?.body.position} - {data?.body.height} px
      </h6>
      <div className="flex flex-wrap gap-4 mt-4">
        {data?.body.b64Images.map((item, i) => (
          <div
            key={i}
            className="w-[220px] rounded-md shadow-md overflow-hidden border flex flex-col items-center p-2 justify-start h-72"
            // style={{ height: `${data?.body.height + 20}px` }}
          >
            {item ? (
              <>
                <img
                  src={`data:image/png;base64,${item}`}
                  alt="banner"
                  className="object-cover w-full rounded-t-md mb-auto"
                  style={{ height: `${data?.body.height}px` }}
                />
                <PrimaryButtons
                  onClick={() => handleImageRemove(i)}
                  disabled={removing}
                >
                  {removing ? "Removing..." : "حذف"}
                </PrimaryButtons>
              </>
            ) : (
              <ImageUploader cb={mutate} idx={i} />
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
