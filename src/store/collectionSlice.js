import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  collection: [],
};
const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addcollection: (state, action) => {
      state.collection.push(action.payload);
    },
    addword: (state, action) => {
      const index =  state.collection.findIndex(i => i.name === action.payload.name);
      state.collection[index].data.push(action.payload.data)
    },
    deletecollection: (state, action) => {
      state.collection = state.collection.filter((_, i) => i !== action.payload.index);
    },
    insertincorrect: (state, action) => {
      const index =  state.collection.findIndex(i => i.name === action.payload.name);
      state.collection[index].incorrect = []
      state.collection[index].incorrect.push(...action.payload.incorrect)
    },
  },
});

export const { addcollection,addword,deletecollection,insertincorrect } = collectionSlice.actions;
export default collectionSlice.reducer;
