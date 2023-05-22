import { createReducer } from '@reduxjs/toolkit';
import { setNumberTheme } from './action';
import dataTheme from '../mocks/theme';

type State = {
  numberSelectTheme: number;
};

const initialState: State = {
  numberSelectTheme: dataTheme[0].id
};

export const getNumberSelectTheme = (state: State) => state.numberSelectTheme;

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNumberTheme, (state, action) => {
      state.numberSelectTheme = action.payload;
    });
});
