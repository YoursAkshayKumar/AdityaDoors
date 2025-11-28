"use client";

import { use } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditTestimonial from "../../components/testimonial/edit-testimonial";

const EditTestimonialPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Testimonials" subtitle="Edit Testimonial" />
        <EditTestimonial id={id} />
      </div>
    </Wrapper>
  );
};

export default EditTestimonialPage;

