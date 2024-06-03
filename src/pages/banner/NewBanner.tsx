import { useState } from "react";

import axiosInstance from "@/services/axios";

import router from "@/routes";
import { mutate } from "swr";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import {
  bannerHeightItems,
  bannerPosItems,
} from "@/components/banner/variablesBanner";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";

const NewBanner = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState<SelectedOption | null>(null);
  const [height, setHeight] = useState<SelectedOption | null>(null);

  const createNewBanner = async () => {
    try {
      const res = await axiosInstance.post("/panel/banner/add", {
        banner_name: name,
        position: position?.value || 0,
        height: height?.value || "",
        enable: false,
      });
      if (res.status === 200) {
        router.navigate(-1);
        mutate(`/panel/banner/get/all/0/100`);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4  rounded shadow-md">
      <p className="mb-4 text-lg font-semibold ">ایحاد بنر</p>
      <div className="flex flex-col justify-start items-start space-y-8 w-fit ">
        <TextField
          id="name"
          placeholder="نام بنر"
          label=""
          onChange={(e) => setName(e.target.value)}
          state={name}
        />

        <ListBoxSelect
          selected={position}
          setSelected={setPosition}
          items={bannerPosItems}
          label="جایگاه بنر"
        />
        <ListBoxSelect
          selected={height}
          setSelected={setHeight}
          items={bannerHeightItems}
          label="ارتفاع بنر"
        />

        <PrimaryButtons onClick={createNewBanner}>ایجاد بنر</PrimaryButtons>
        <PrimaryButtons
         onClick={() => router.navigate(-1)}
        >
          بازگشت
        </PrimaryButtons>
      </div>
    </div>
  );
};

export default NewBanner;
