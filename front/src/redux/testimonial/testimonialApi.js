import { apiSlice } from "../api/apiSlice";

export const testimonialApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveTestimonials: builder.query({
      query: () => `/api/testimonial/active`,
      providesTags: ["Testimonials"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActiveTestimonialsQuery } = testimonialApi;

