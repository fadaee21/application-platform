import useSWR from "swr";
import { LoadingSpinnerPage } from "../ui-kit/LoadingSpinner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
import ModalSKeleton from "../ui-kit/ModalSkeleton";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/services/axios";

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

  const handleNavigate = (id: number,path?:string) => {
    if(path){
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
      <div className="p-4  rounded shadow-md">
        <p className="mb-4 text-lg font-semibold ">لیست بنر ها</p>
        <ul className="divide-y divide-gray-300">
          {data?.body.content.map((item) => (
            <li
              key={item.id}
              className="py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">
                  {item.position} - {item.height}
                </p>
              </div>
              <div className="flex gap-4">
                <PrimaryButtons onClick={() => handleNavigate(item.id)}>
                  مشاهده
                </PrimaryButtons>
                <PrimaryButtons
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
            </li>
          ))}
        </ul>
        <PrimaryButtons onClick={() => router.navigate("new")}>
          ایجاد بنر جدید
        </PrimaryButtons>
      </div>
      <ModalSKeleton
        title="حذف بنر"
        closeModal={closeModal}
        isShow={Boolean(searchParams.get("delete_name"))}
      >
        <p>آيا مي خواهيد بنر {searchParams.get("delete_name")} را حذف کنيد؟</p>
        <div className="flex justify-end gap-4 mt-4">
          <PrimaryButtons onClick={() => closeModal()}>خیر</PrimaryButtons>
          <PrimaryButtons onClick={handleRemove}>بله</PrimaryButtons>
        </div>
      </ModalSKeleton>
    </>
  );
};

export default SeeAllBanners;
