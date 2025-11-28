import { apiSlice } from "../api/apiSlice";
import { TestimonialResponse, IAddTestimonial, ITestimonial } from "@/types/testimonial-type";

export const testimonialApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTestimonials: builder.query<TestimonialResponse, void>({
      query: () => `/api/testimonial/all`,
      providesTags: ["AllTestimonials"],
      keepUnusedDataFor: 600,
    }),
    addTestimonial: builder.mutation<{ message: string }, IAddTestimonial>({
      query(data: IAddTestimonial) {
        return {
          url: `/api/testimonial/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllTestimonials"],
    }),
    deleteTestimonial: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `/api/testimonial/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllTestimonials"],
    }),
    editTestimonial: builder.mutation<{ message: string }, { id: string; data: Partial<IAddTestimonial> }>({
      query({ id, data }) {
        return {
          url: `/api/testimonial/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllTestimonials", "getTestimonial"],
    }),
    getTestimonial: builder.query<ITestimonial, string>({
      query: (id) => `/api/testimonial/get/${id}`,
      providesTags: ["getTestimonial"],
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useEditTestimonialMutation,
  useGetTestimonialQuery,
} = testimonialApi;

