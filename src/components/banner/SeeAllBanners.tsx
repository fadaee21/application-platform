import useSWR from "swr";
import { LoadingSpinnerPage } from "../ui-kit/LoadingSpinner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
import ModalSKeleton from "../ui-kit/ModalSkeleton";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/services/axios";
import { bannerPosItems } from "./variablesBanner";
import { toast } from "react-toastify";
import { useState } from "react";

const SeeAllBanners = () => {
  const [bannerInfo, setBannerInfo] = useState({
    name: "",
    height: 0,
    position: "",
    enable: false,
  });
  const { data, isLoading, mutate } = useSWR<ResponseData<IBanner>>(
    `/panel/banner/get/all/0/100`
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModal = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete("delete_name");
    updatedSearchParams.delete("activate_name");
    updatedSearchParams.delete("banner_id");
    updatedSearchParams.delete("enable");
    setSearchParams(updatedSearchParams);
  };
  const handleRemove = async () => {
    try {
      const res = await axiosInstance.delete(
        `/panel/banner/delete/${searchParams.get("banner_id")}`
      );
      if (res.status === 200) {
        closeModal();
        mutate();
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };
  const handleActivation = async (enable: boolean) => {
    try {
      const res = await axiosInstance.patch(
        `/panel/banner/update/${searchParams.get("banner_id")}`,
        {
          bannerInfo,
        }
      );
      if (res.status === 200) {
        closeModal();
        mutate();
        toast.success(`بنر با موفقیت ${enable ? "فعال شد" : "غیرفعال شد"}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  const handleNavigate = (id: number, path?: string) => {
    if (path) {
      router.navigate(`${path}/${id}`);
      return;
    }
    router.navigate(`${id}`);
  };

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }

  return (
    <>
      <div className="p-4 rounded shadow-md bg-slate-50 dark:bg-slate-700">
        <p className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
          لیست بنر ها
        </p>
        <div className="flex flex-wrap gap-2">
          {data?.body.content.map((banner) => (
            <div
              key={banner.id}
              className="w-full m-1 overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow-md sm:w-72 dark:bg-slate-800 hover:transform hover:scale-105"
            >
              {banner.firstB64Image ? (
                <img
                  src={`data:image/png;base64,${banner.firstB64Image}`}
                  alt="image"
                  className="object-cover w-full h-36"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    height: "9rem",
                    width: "100%",
                    objectFit: "contain",
                  }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              )}
              <div className="p-4">
                <p className="mb-2 text-xl font-bold text-slate-700 dark:text-slate-300">
                  {banner.name}
                </p>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  ارتفاع بنر {banner.height}px - موقعیت{" "}
                  {
                    bannerPosItems.find(
                      (element) => element.value === banner.position
                    )?.label
                  }
                </p>
                <div className="flex justify-between gap-2">
                  <PrimaryButtons
                    fullWidth
                    onClick={() => handleNavigate(banner.id)}
                  >
                    مشاهده
                  </PrimaryButtons>
                  <PrimaryButtons
                    fullWidth
                    onClick={() =>
                      setSearchParams({
                        delete_name: banner.name,
                        banner_id: banner.id.toString(),
                      })
                    }
                  >
                    حذف
                  </PrimaryButtons>
                </div>
                <PrimaryButtons
                  className="my-2"
                  fullWidth
                  onClick={() => {
                    setSearchParams({
                      banner_id: banner.id.toString(),
                    });
                    setBannerInfo({
                      enable: !banner.enable,
                      height: banner.height,
                      position: banner.position,
                      name: banner.name,
                    });
                  }}
                >
                  {banner.enable ? "غیرفعال شود" : "فعال شود"}
                </PrimaryButtons>
              </div>
            </div>
          ))}
          <div
            onClick={() => router.navigate("new")}
            className="flex flex-col items-center justify-center w-full m-1 overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow-md cursor-pointer sm:w-72 dark:bg-slate-800 hover:transform hover:scale-105"
          >
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="mb-2 text-lg font-bold text-slate-700 dark:text-slate-300">
                ایجاد بنر جدید
              </p>
              <svg
                className="w-12 h-12 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ModalSKeleton
        title="حذف بنر"
        closeModal={closeModal}
        isShow={Boolean(searchParams.get("delete_name"))}
      >
        <p className="text-slate-700 dark:text-slate-300">
          آيا مي خواهيد بنر {searchParams.get("delete_name")} را حذف کنيد؟
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <PrimaryButtons onClick={closeModal}>خیر</PrimaryButtons>
          <PrimaryButtons onClick={handleRemove}>بله</PrimaryButtons>
        </div>
      </ModalSKeleton>
      <ModalSKeleton
        title="فعالسازی بنر"
        closeModal={closeModal}
        isShow={Boolean(searchParams.get("banner_id"))}
      >
        <p className="text-slate-700 dark:text-slate-300">
          آيا مي خواهيد بنر {searchParams.get("banner_id")} را{" "}
          {bannerInfo.enable ? "فعال" : "غیرفعال"} کنيد؟
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <PrimaryButtons onClick={closeModal}>خیر</PrimaryButtons>
          <PrimaryButtons onClick={() => handleActivation(true)}>
            بله
          </PrimaryButtons>
        </div>
      </ModalSKeleton>
    </>
  );
};

export default SeeAllBanners;
