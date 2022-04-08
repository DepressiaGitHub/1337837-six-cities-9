import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  offerByHover: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    hoverOffer: (state, action) => {
      state.offerByHover = action.payload;
    },
  },
});

export const {
  hoverOffer,
} = appProcess.actions;
