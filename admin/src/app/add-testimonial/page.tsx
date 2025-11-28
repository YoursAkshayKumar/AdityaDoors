"use client";

import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddTestimonial from "../components/testimonial/add-testimonial";

const AddTestimonialPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Testimonials" subtitle="Add Testimonial" />
        <AddTestimonial />
      </div>
    </Wrapper>
  );
};

export default AddTestimonialPage;

