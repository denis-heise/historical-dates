import store from '../store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypeDataTheme = {
  id: number;
  title: string;
  years: {
      start: string;
      end: string;
  };
  active: boolean;
}[];
export type TypeYears = {
  start: string;
  end: string;
}
export type TypeSwiperSlider = {
  id: number;
  title: string;
  description: string;
}[];
