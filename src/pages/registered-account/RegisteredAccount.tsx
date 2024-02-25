import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";

const RegisteredAccount = () => {
  const [selectedOption, setSelectedOption] = useState<
    (typeof options)[number] | null
  >(options[0]);

  return (
    <div className="flex flex-col">
      <div className="max-w-2xl mb-10">
        <ListBoxSelect
          items={options}
          selected={selectedOption}
          setSelected={setSelectedOption}
        />
      </div>
      {selectedOption && (
        <h6 className="mb-2 text-base font-bold text-slate-700 dark:text-slate-300">
          {header[selectedOption.value]}
        </h6>
      )}
      <TableContentAccounts selectedOption={selectedOption} />
    </div>
  );
};

export default RegisteredAccount;

const options = [
  { value: "registered", label: "ثبت نام شده" },
  { value: "unregistered", label: "ثبت نام نشده" },
  { value: "unmatched/mobile", label: "عدم تطبیق موبایل و کد ملی" },
  { value: "unmatched/birthDate", label: "عدم احراز ثبت احوال" },
];

const header: { [key: string]: string } = {
  registered: "کاربرانی که ثبت نام کرده‌اند",
  unregistered: "کاربرانی که هنوز ثبت نام نکرده‌اند",
  "unmatched/mobile": "کاربرانی که موبایل و کد ملی آن‌ها تطابق ندارد",
  "unmatched/birthDate":
    "کاربرانی که تاریخ تولد آن‌ها با اطلاعات ثبت احوال تطابق ندارد",
};
