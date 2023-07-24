import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/services/auth";
import { casesApi } from "./casesApi";

export const engageApi = createApi({
  reducerPath: "engageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AWS_ENGAGE_API_BASE_URL}/${process.env.NEXT_PUBLIC_AWS_ENGAGE_API_STAGE}/${process.env.NEXT_PUBLIC_AWS_ENGAGE_API_VERSION}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", getAccessToken());
    },
  }),
  endpoints: (builder) => ({
    getChatHistory: builder.mutation({
      query: (body) => ({
        url: "chatHandler",
        method: "post",
        body: {
          ids: {
            ...body.ids,
          },
          chatRequest: {
            requestType: "VIEW_MESSAGES",
          },
          responseExpectation: {
            pagination: {
              pageSize: body.pageSize,
              page: 1,
            },
          },
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "chatHandler",
        method: "post",
        body: {
          ids: {
            ...body.ids,
          },
          chatRequest: {
            requestType: "NEW_MESSAGE_REQUEST",
            message: {
              ...body.message,
            },
          },
        },
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(casesApi.util.invalidateTags(["Cases"]));
      },
    }),
    getLastChatUpdate: builder.mutation({
      query: (body) => ({
        url: "chatHandler",
        method: "post",
        body: {
          ...body,
          chatRequest: {
            requestType: "LAST_CHAT_UPDATE",
          },
        },
      }),
    }),
  }),
});

export const {
  useGetChatHistoryMutation,
  useSendMessageMutation,
  useGetLastChatUpdateMutation,
} = engageApi;
