import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/services/auth";

export const processingApi = createApi({
  reducerPath: "processingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_BASE_URL}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_STAGE}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_VERSION}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", getAccessToken());
    },
  }),
  tagTypes: ["Files"],
  endpoints: (builder) => ({
    fileUpload: builder.mutation({
      query: (newFile) => ({
        url: "/fileUpload",
        method: "post",
        body: newFile,
      }),
      invalidatesTags: ["Files"],
    }),
  }),
});

export const { useFileUploadMutation } = processingApi;
