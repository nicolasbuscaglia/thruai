import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      caseId: "1",
      chats: [
        {
          chatId: "1",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
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
          chatId: "2",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
          messages: [
            {
              id: "1",
              createdOn: "1687208394743",
              user: "Jhon Doe",
              content:
                "What was the last genetic test that was completed by this patient?",
            },
            {
              id: "2",
              createdOn: "1687209394743",
              user: "Jhon Doe",
              content: "This is a test message",
            },
          ],
        },
      ],
    },
    {
      caseId: "2",
      chats: [
        {
          chatId: "1",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
          messages: [],
        },
      ],
    },
    {
      caseId: "3",
      chats: [
        {
          chatId: "1",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
          messages: [],
        },
      ],
    },
    {
      caseId: "4",
      chats: [
        {
          chatId: "1",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
          messages: [],
        },
      ],
    },
    {
      caseId: "5",
      chats: [
        {
          chatId: "1",
          createdOn: "1687208394743",
          lastUpdated: "1687208394743",
          messages: [],
        },
      ],
    },
  ],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createNewChat: (state, action) => {
      state.value.push(action.payload);
    },
    addNewChat: (state, action) => {
      const oneCase = state.value.find(
        (oneCase) => oneCase.caseId === action.payload.caseId
      );
      if (oneCase) {
        oneCase.chats = [...oneCase.chats, action.payload.chat];
      }
    },
    addMessage: (state, action) => {
      const oneCase = state.value.find(
        (oneCase) => oneCase.caseId === action.payload.caseId
      );
      const chat = oneCase?.chats.find(
        (chat) => chat.chatId === action.payload.chatId
      );
      if (chat) {
        chat.lastUpdated = action.payload.lastUpdated;
        chat.messages = [...chat.messages, action.payload.message];
      }
    },
  },
});

export const { addMessage, createNewChat, addNewChat } = chatsSlice.actions;

export const selectDefaultChatIdByCaseId = (caseId) => (state) => {
  const oneCase = state.chats.value.find(
    (oneCase) => oneCase.caseId === caseId
  );
  if (oneCase) {
    const chats = [...oneCase.chats];
    const sortedChats = chats.sort((a, b) => b.lastUpdated - a.lastUpdated);
    return sortedChats[0].chatId;
  }
};

export const selectChatByChatId = (caseId, chatId) => (state) => {
  const oneCase = state.chats.value.find(
    (oneCase) => oneCase.caseId === caseId
  );
  if (oneCase) {
    const chat = oneCase.chats.find((chat) => chat.chatId === chatId);
    return chat;
  }
};

export const selectFilterChats = (state, filter) =>
  state.filter(
    (chats) =>
      chats.name.toLowerCase().includes(filter.toLowerCase()) ||
      chats.caseId.toLowerCase().includes(filter.toLowerCase())
  );

export const selectFilteredChats = createSelector(
  (state) => state.chats.cases.chats,
  (state) => state.ui.filter,
  selectFilterChats
);

export const selectSortedChatsByCaseId = (caseId) => (state) => {
  const chats = state.chats.value.find(
    (oneCase) => oneCase.caseId === caseId
  )?.chats;
  if (chats.length > 1) {
    const sortedChats = [...chats];
    return sortedChats.sort((a, b) => b.lastUpdated - a.lastUpdated);
  }
  return chats;
};

export default chatsSlice.reducer;
