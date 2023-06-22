import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      name: "Summarize Case",
      type: "DNA Visit - Dev",
      attachments: true,
      summary: [
        {
          id: 1,
          title: "Summary",
          description:
            "“Pushing pixels and experiences in digital products for Sebostudio”",
          items: [
            {
              id: 1,
              label: "Nominal",
            },
            {
              id: 2,
              label: "Blood Pressure",
            },
            {
              id: 3,
              label: "Joined June 2012",
            },
            {
              id: 4,
              label: "Genetic Test completed",
            },
            {
              id: 5,
              label: "Some Other Medical",
            },
          ],
        },
        {
          id: 2,
          title: "Recommended Actions",
          description:
            "Based on your teams previous chats we recommend the following actions",
          items: [
            {
              id: 1,
              label: "Ask Patient A",
            },
            {
              id: 2,
              label: "Follow up with patient",
            },
            {
              id: 3,
              label: "Joined June 2012",
            },
            {
              id: 4,
              label: "Genetic Test Completed",
            },
            {
              id: 5,
              label: "Some Other Medical",
            },
          ],
        },
      ],
      messages: [
        {
          id: "1",
          createdOn: "1687208394743",
          user: "Jhon Doe",
          content: "This is a test message",
        },
        {
          id: "2",
          createdOn: "1687209394743",
          user: "Jhon Doe",
          content:
            "What was the last genetic test that was completed by this patient?",
        },
      ],
    },
    {
      caseId: "2",
      name: "Genetic test summary",
      type: "DNA Visit - Clinical",
      attachments: true,
      summary: [],
      messages: [
        {
          id: "1",
          createdOn: "1687208394743",
          user: "Bill Doe",
          content:
            "Hey Cak, Could you free now? Can you look and read the brief first...",
        },
      ],
    },
    {
      caseId: "3",
      name: "Patient Visit Summary",
      type: "DNA Visit - Dev",
      attachments: true,
      summary: [],
      messages: [
        {
          id: "1",
          createdOn: "1687209394743",
          user: "Tim Doe",
          content:
            "Hey Cak, Could you free now? Can you look and read the brief first...",
        },
      ],
    },
    {
      caseId: "4",
      name: "Summarize Case",
      type: "DNA Visit - Dev",
      attachments: true,
      summary: [],
      messages: [
        {
          id: "1",
          createdOn: "1687208394743",
          user: "John Doe",
          content:
            "What was the last genetic test that was completed by this patient?",
        },
      ],
    },
    {
      caseId: "5",
      name: "Genetic test summary",
      type: "DNA Visit - Clinical",
      attachments: true,
      summary: [],
      messages: [
        {
          id: "1",
          createdOn: "1687208394743",
          user: "Bill Doe",
          content:
            "Hey Bill, Could you free now? Can you look and read the brief first...",
        },
      ],
    },
  ],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addNewCaseMessages: (state, action) => {
      state.value.push(action.payload);
    },
    addMessage: (state, action) => {
      const indexConv = state.value.findIndex(
        (chats) => chats.caseId === action.payload.caseId
      );
      if (indexConv >= 0) {
        state.value[indexConv].messages = [
          ...state.value[indexConv].messages,
          action.payload.message,
        ];
      }
    },
    updateAttachments: (state, action) => {
      const indexConv = state.value.findIndex(
        (chats) => chats.caseId === action.payload.caseId
      );
      if (indexConv >= 0) {
        state.value[indexConv].attachments = action.payload.attachments;
      }
    },
  },
});

export const { addMessage, addNewCaseMessages, updateAttachments } =
  chatsSlice.actions;

export const selectChatById = (id) => (state) =>
  state.chats.value.find((chats) => chats.caseId === id);

export const selectLastMessageById = (id) => (state) => {
  const messages = state.chats.value.find(
    (chats) => chats.caseId === id
  )?.messages;
  const sortedMessages = [...messages];
  sortedMessages.sort((a, b) => b.createdOn - a.createdOn);
  return sortedMessages[0];
};

export const selectFilterChats = (state, filter) =>
  state.filter(
    (chats) =>
      chats.name.toLowerCase().includes(filter.toLowerCase()) ||
      chats.caseId.toLowerCase().includes(filter.toLowerCase())
  );

export const selectFilteredChats = createSelector(
  (state) => state.chats.value,
  (state) => state.ui.filter,
  selectFilterChats
);

export default chatsSlice.reducer;
