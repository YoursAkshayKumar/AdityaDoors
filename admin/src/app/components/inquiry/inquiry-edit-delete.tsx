"use client";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Delete, Eye } from "@/svg";
import { notifyError } from "@/utils/toast";
import DeleteTooltip from "../tooltip/delete-tooltip";
import ViewTooltip from "../tooltip/view-tooltip";
import { useDeleteInquiryMutation } from "@/redux/inquiry/inquiryApi";

const InquiryEditDelete = ({ id }: { id: string }) => {
  const [deleteInquiry] = useDeleteInquiryMutation();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteInquiry(id).unwrap();
        Swal.fire("Deleted!", "Inquiry has been deleted.", "success");
      } catch (error: any) {
        notifyError(error?.data?.message || "Failed to delete inquiry");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <Link href={`/inquiries/${id}`}>
          <ViewTooltip>
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
              <Eye />
            </button>
          </ViewTooltip>
        </Link>
        <DeleteTooltip>
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <Delete />
          </button>
        </DeleteTooltip>
      </div>
    </>
  );
};

export default InquiryEditDelete;

