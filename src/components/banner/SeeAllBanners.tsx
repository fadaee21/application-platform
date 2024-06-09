import useSWR from "swr";
import { LoadingSpinnerPage } from "../ui-kit/LoadingSpinner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
import ModalSKeleton from "../ui-kit/ModalSkeleton";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/services/axios";
import { bannerPosItems } from "./variablesBanner";

const SeeAllBanners = () => {
  const { data, isLoading, mutate } = useSWR<ResponseData<IBanner>>(
    `/panel/banner/get/all/0/100`
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModal = () =>
    setSearchParams((prevParams) => {
      const updatedSearchParams = new URLSearchParams(prevParams);
      updatedSearchParams.delete("delete_name");
      updatedSearchParams.delete("banner_id");
      return updatedSearchParams;
    });
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
          {data?.body.content.map((item) => (
            <div
              key={item.id}
              className="sm:w-72 w-full m-1 bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:transform hover:scale-105"
            >
              {item.firstB64Image ? (
                <img
                  src={`data:image/png;base64,${item.firstB64Image}`}
                  alt="image"
                  className="w-full h-36 object-cover"
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
                style={{ height: '9rem', width: '100%', objectFit: 'contain' }} 
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              
              )}
              <div className="p-4">
                <p className="text-xl font-bold mb-2 text-slate-700 dark:text-slate-300">
                  {item.name}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  ارتفاع بنر {item.height}px - موقعیت{" "}
                  {
                    bannerPosItems.find(
                      (element) => element.value === item.position
                    )?.label
                  }
                </p>
                <div className="flex justify-between gap-1">
                  <PrimaryButtons
                    fullWidth
                    onClick={() => handleNavigate(item.id)}
                  >
                    مشاهده
                  </PrimaryButtons>
                  <PrimaryButtons
                    fullWidth
                    onClick={() =>
                      setSearchParams({
                        delete_name: item.name,
                        banner_id: item.id.toString(),
                      })
                    }
                  >
                    حذف
                  </PrimaryButtons>
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => router.navigate("new")}
            className="sm:w-72 w-full m-1 bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center p-4 h-full">
              <p className="text-lg font-bold mb-2 text-slate-700 dark:text-slate-300">
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
          <PrimaryButtons onClick={() => closeModal()}>خیر</PrimaryButtons>
          <PrimaryButtons onClick={handleRemove}>بله</PrimaryButtons>
        </div>
      </ModalSKeleton>
    </>
  );
};

export default SeeAllBanners;
