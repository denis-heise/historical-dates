import { createAction } from '@reduxjs/toolkit';

export const Action = {
  SET_NUMBER_THEME: 'number-theme/set',
};

export const setNumberTheme = createAction<number>(Action.SET_NUMBER_THEME);
