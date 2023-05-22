import { TypeSwiperSlider } from '../../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type ThemeProps = {
  sliderProps: TypeSwiperSlider[];
  numberSelectTheme: number;
};

function SwiperSlider ({sliderProps, numberSelectTheme}: ThemeProps): JSX.Element {
  const swiperRef = useRef(null);

  gsap.from(swiperRef.current, { opacity:0, duration: 2.5 });
  gsap.to(swiperRef.current , { opacity:1, duration: 2.5 });

  useEffect(() => {
    if(swiperRef.current){
      const mainBlock = swiperRef.current as HTMLElement;
      const wrapperSlider = mainBlock.querySelector('.swiper-wrapper') as HTMLElement;

      wrapperSlider.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  }, [numberSelectTheme]);

  /* eslint-disable */

  return(
    <div className="swiper-block" ref={swiperRef}>
      <Swiper
        modules={[Keyboard, Navigation]}
        keyboard={{
          enabled: true,
        }}
        navigation={{
          prevEl: '.swiper-block__prev-button',
          nextEl: '.swiper-block__next-button',
        }}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints = {{
          280: {
            spaceBetween: 0,
            centeredSlides: true,
            slidesPerView: 1.3,
          },
          360: {
            centeredSlides: true,
            slidesPerView: 1.7,
            spaceBetween: 0,
          },
          375: {
            slidesPerView: 1.8,
            spaceBetween: 0,
          },
          390: {
            slidesPerView: 1.9,
            spaceBetween: 0,
          },
          // 414: {
          //   slidesPerView: 1.9,
          //   spaceBetween: 0,
          // },
          540: {
            spaceBetween: 20,
            slidesPerView: 2.4
          },
          769: {
            spaceBetween: 50,
            slidesPerView: 3
          }
        }}
      >
        {sliderProps[numberSelectTheme - 1].map((item) => (
          <SwiperSlide key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-block__navigation">
        <div className="swiper-block__prev-button"></div>
        <div className="swiper-block__next-button"></div>
      </div>
    </div>
  );
}

export default SwiperSlider;
