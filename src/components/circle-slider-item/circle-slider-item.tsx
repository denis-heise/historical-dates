import { useAppDispatch } from '../../hooks';
import { setNumberTheme } from '../../store/action';
import { TypeDataTheme } from '../../types/types';

type ThemeProps = {
  themeProps: TypeDataTheme[0];
};

export function ItemSliderTheme ({themeProps}: ThemeProps): JSX.Element {
  const dispatch = useAppDispatch();

  const selectTheme = () => {
    dispatch(setNumberTheme(themeProps.id));
  };


  return(
    <div className={`circle-slider__item ${themeProps.active ? 'active' : ''}`} data-number={themeProps.id} data-title={themeProps.title} tabIndex={0} onClick={selectTheme}>
      <span>{themeProps.id}</span>
      <div className='circle-slider__small-circle'>
        <div className='circle-slider__item-number hidden'>{themeProps.id}</div>
      </div>
    </div>
  );
}
