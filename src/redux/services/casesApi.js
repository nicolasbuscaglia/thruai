import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const casesApi = createApi({
  reducerPath: "casesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Cases", "Chats", "Files"],
  endpoints: (builder) => ({
    getCases: builder.query({
      query: () => "cases",
      providesTags: ["Cases"],
    }),
    getCaseById: builder.query({
      query: (caseId) => `cases/${caseId}`,
      providesTags: ["Cases"],
    }),
    createCase: builder.mutation({
      query: (newCase) => ({
        url: "/cases",
        method: "post",
        body: newCase,
      }),
      invalidatesTags: ["Cases"],
    }),
    getChatByChatId: builder.query({
      query: ({ caseId, chatId }) => `cases/chats/${caseId}/${chatId}`,
      providesTags: ["Chats"],
    }),
    addNewChat: builder.mutation({
      query: (newChat) => ({
        url: `cases/chats/${newChat.caseId}`,
        method: "post",
        body: newChat,
      }),
      invalidatesTags: ["Cases", "Chats"],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: `cases/chats/${newMessage.caseId}/${newMessage.chatId}`,
        method: "post",
        body: newMessage,
      }),
      invalidatesTags: ["Cases", "Chats"],
    }),
    getNoteByCaseId: builder.query({
      query: (caseId) => `cases/notes/${caseId}`,
      providesTags: ["Notes"],
    }),
    addNote: builder.mutation({
      query: (newNote) => ({
        url: `cases/notes/${newNote.caseId}/${newNote.noteId}`,
        method: "post",
        body: newNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    getFilesByCaseId: builder.query({
      query: (caseId) => `cases/files/${caseId}`,
      providesTags: ["Files"],
    }),
    getCleanedFilesByCaseId: builder.query({
      query: (caseId) => `cases/files/cleaned/${caseId}`,
      providesTags: ["Files"],
    }),
    addMoreFiles: builder.mutation({
      query: (newFiles) => ({
        url: `cases/files/${newFiles.caseId}`,
        method: "post",
        body: newFiles.files,
      }),
      invalidatesTags: ["Cases", "Files"],
    }),
  }),
});

export const {
  useGetCasesQuery,
  useGetCaseByIdQuery,
  useCreateCaseMutation,
  useGetChatByChatIdQuery,
  useAddNewChatMutation,
  useAddMessageMutation,
  useGetNoteByCaseIdQuery,
  useAddNoteMutation,
  useGetCleanedFilesByCaseIdQuery,
  useGetFilesByCaseIdQuery,
  useAddMoreFilesMutation,
} = casesApi;
