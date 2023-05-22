import { MouseEvent, useEffect, useRef } from 'react';
import { TypeDataTheme } from '../../types/types';
import { ItemSliderTheme } from '../circle-slider-item/circle-slider-item';
import { setNumberTheme } from '../../store/action';
import getSliderCircle from '../../hooks/slider-circle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNumberSelectTheme } from '../../store/reducer';
import SwiperSlider from '../../components/swiper-slider/swiper-slider';
import dataMovie from '../../mocks/movie';
import dataTotal from '../../mocks/total';
import dataLiterature from '../../mocks/literature';
import dataScience from '../../mocks/science';
import { TypeSwiperSlider } from '../../types/types';
type ThemesProps = {
  themesProps: TypeDataTheme;
};

function ListSliderTheme ({themesProps}: ThemesProps): JSX.Element {
  const sliderBlock = useRef(null);
  const dispatch = useAppDispatch();
  const isSelectTheme = useAppSelector(getNumberSelectTheme);

  useEffect(()=> {
    if(sliderBlock.current){
      getSliderCircle(sliderBlock.current);
    }
  }, []);

  const selectTheme = (evt: MouseEvent<HTMLElement>) => {
    const target = evt.target as Element;
    setTimeout(() => {
      if(target.id === 'prev' && !target.classList.contains('disabled-button') && isSelectTheme !== 0){
        dispatch(setNumberTheme(isSelectTheme - 1));
      }
      if (target.id === 'next' && !target.classList.contains('disabled-button') && isSelectTheme !== themesProps.length){
        dispatch(setNumberTheme(isSelectTheme + 1));
      }
    }, 100);
  };
  const dataSlider: [...TypeSwiperSlider[]] = [dataTotal, dataMovie, dataLiterature, dataTotal, dataTotal, dataScience];

  return(
    <div className="circle-slider" ref={sliderBlock}>
      <div className="circle-slider__title-item">{themesProps[0].title}</div>
      <div className="line"></div>
      <div className="circle-slider__wrapper">
        {themesProps.map((item) => (
          <ItemSliderTheme key={item.id} themeProps={item}/>
        ))}

        <svg className='circle-slider__background-svg' width="530" height="530" viewBox="0 0 530 530" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="circle-slider__holder" id="holder" opacity="0.2" cx="265" cy="265" r="264.5" stroke="#42567A"/>
        </svg>
      </div>
      <div className="slider-control">
        <div className="slider-control__quantity">01/06</div>
        <div className="slider-control__buttons-block" onClick={selectTheme}>
          <button id="prev" className='disabled-button'></button>
          <button id="next"></button>
        </div>
      </div>
      <SwiperSlider sliderProps={dataSlider} numberSelectTheme={isSelectTheme}/>

    </div>
  );
}

export default ListSliderTheme;
