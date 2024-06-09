import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ImageUploader from "@/components/ui-kit/ImageUploader";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import clsx from "clsx";
import { bannerPosItems } from "@/components/banner/variablesBanner";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
const LENGTH_IMAGE_PLACEHOLDER = 5;

const BannerId = () => {
  const axiosPrivate = useAxiosPrivate();
  const [removing, setRemoving] = useState<boolean>(false);
  const { id: bannerId } = useParams();

  const { data, isLoading, mutate } = useSWR<ResponseDataNoArray<IBannerImg>>(
    `/panel/banner/get/${bannerId}`
  );

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }
  const { b64Images } = data?.body || {};
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
    <div className="p-4 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-semibold whitespace-nowrap">
          {data?.body.name}
        </h1>
        <ReturnButton />
      </div>
      <h6 className="text-xl">
        ارتفاع بنر {data?.body.height}px و موقعیت{" "}
        {
          bannerPosItems.find((item) => item.value === data?.body.position)
            ?.label
        }{" "}
        می باشد.
      </h6>
      <div className="flex sm:justify-start justify-center flex-wrap gap-4 mt-4 ">
        {data?.body.b64Images.map((item, i) => (
          <div
            key={i}
            className={`w-[220px] bg-white dark:bg-slate-800 rounded-md shadow-md overflow-hidden border flex flex-col items-center p-1 justify-start ${heightBanner}`}
          >
            {item ? (
              <>
                <img
                  src={`data:image/png;base64,${item}`}
                  alt="banner"
                  className="object-fill w-full rounded-t-md mb-auto"
                />
                <PrimaryButtons
                  onClick={() => handleImageRemove(i)}
                  disabled={removing}
                >
                  {removing ? "Removing..." : "حذف"}
                </PrimaryButtons>
              </>
            ) : (
              <ImageUploader cb={mutate} imageIndex={i} bannerId={bannerId} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerId;
