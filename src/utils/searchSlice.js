import { createSlice } from '@reduxjs/toolkit';

// search slice for managing product search


const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Current search query
  },
  reducers: {
    
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },

    
    clearSearch: (state) => {
      state.query = '';
    },
  },
});

// Export actions
export const { setSearchQuery, clearSearch } = searchSlice.actions;


export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;