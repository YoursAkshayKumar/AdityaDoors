"use client";
import React from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import { useGetAllInquiriesQuery } from "@/redux/inquiry/inquiryApi";
import usePagination from "@/hooks/use-pagination";
import InquiryEditDelete from "./inquiry-edit-delete";

function TableHead({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
    >
      {title}
    </th>
  );
}

const InquiryTable = ({ cls, searchTerm }: { cls?: string; searchTerm?: string }) => {
  const { data: inquiries, isError, isLoading } = useGetAllInquiriesQuery();
  const allItems = (inquiries?.result || []) as any[];
  const filtered = searchTerm
    ? allItems.filter((it) =>
        (it.name || "").toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (it.email || "").toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (it.product?.name || "").toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;
  const paginationData = usePagination(filtered, 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !inquiries) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && inquiries) {
    if (filtered.length === 0) {
      content = (
        <div className="text-center py-8">
          <p className="text-gray-500">No inquiries found</p>
        </div>
      );
    } else {
      content = (
        <>
          <table className="w-full text-base text-left text-gray-500">
            <thead className="bg-white">
              <tr className="border-b border-gray6 text-tiny">
                <th
                  scope="col"
                  className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                >
                  Name
                </th>
                <TableHead title="Email" />
                <TableHead title="Phone" />
                <TableHead title="Product" />
                <TableHead title="Type" />
                <TableHead title="Status" />
                <TableHead title="Date" />
                <TableHead title="Actions" />
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
              <tr key={item._id} className="bg-white border-b border-gray6">
                <th
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap"
                >
                  <a className="flex items-center space-x-3">
                    <span className="font-medium text-heading text-hover-primary transition">
                      {item.name}
                    </span>
                  </a>
                </th>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.email}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.phone || "N/A"}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  <div className="text-sm">
                    <div className="font-medium">{item.product?.name}</div>
                    <div className="text-xs text-gray-400">{item.product?.category}</div>
                  </div>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  <span className="capitalize">{item.inquiryType}</span>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    item.status === "contacted" ? "bg-blue-100 text-blue-800" :
                    item.status === "resolved" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-9 py-3 text-end">
                  <div className="flex items-center justify-end space-x-2">
                    <InquiryEditDelete id={item._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pageCount > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        )}
        </>
      );
    }
  }
  return <div className={cls}>{content}</div>;
};

export default InquiryTable;

