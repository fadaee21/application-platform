import SimpleTable from "@/components/registered-accounts/SimpleTable";
import Pagination from "@/components/ui-kit/Pagination";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const pageSize = 10;
const Transactions = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useSWR<{
    body: { transactions: Transaction[]; totalElements: number };
  }>(`/panel/payment/transactions/get/${id}/${page - 1}/${pageSize}`);

  return (
    <>
      <div className="text-center bg-cyan-100/60 dark:bg-cyan-950  max-w-xl mx-auto p-10 rounded-md mb-6">
        <p>مانده کیف پول 0 ریال می باشد.</p>
      </div>
      <div className="h-[580px] w-full">
        <SimpleTable
          headers={headers}
          data={
            data?.body.transactions.map(
              ({ amount, status, gateway_type, created_at }) => ({
                amount,
                //   currency,
                status,
                gateway_type,
                created_at: new Intl.DateTimeFormat("fa-IR").format(
                  new Date(created_at)
                ),
              })
            ) || []
          }
          isLoading={isLoading}
          totalElements={data?.body.totalElements || 0}
        />
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={data?.body.totalElements || 0}
      />
    </>
  );
};

export default Transactions;

const headers = [
  //   { label: "ID", key: "id" },
  //   { label: "ارز", key: "currency" },
  { label: "وضعیت", key: "status" },
  { label: "مبلغ", key: "amount" },
  { label: "درگاه پرداخت ", key: "gateway_type" },
  { label: "تاریخ", key: "created_at" },
];
