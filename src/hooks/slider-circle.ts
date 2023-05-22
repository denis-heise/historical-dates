import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);
const DURATION = 0.3;

function getSliderCircle (block: Element){
  const circleSvg = block.querySelector('.circle-slider__holder') as Element as SVGPathElement;
  const circlePath = MotionPathPlugin.convertToPath(circleSvg, false)[0];
  circlePath.id = 'circlePath';
  const mainSvg = block.querySelector('svg');
  const wrapperCircle = block.querySelector('.circle-slider__wrapper');
  const quantityItemsBlock = block.querySelector('.slider-control__quantity');
  const titleItem = block.querySelector('.circle-slider__title-item');

  if(mainSvg !== null){
    mainSvg.prepend(circlePath);
  }

  const items: NodeListOf<Element> = block.querySelectorAll('.circle-slider__item'),
    numItems = items.length,
    itemStep = 1 / numItems,
    wrapProgress = gsap.utils.wrap(0, 1),
    snap = gsap.utils.snap(itemStep),
    wrapTracker = gsap.utils.wrap(0, numItems),
    tracker = { item: 0 };

  gsap.set(items, {
    motionPath: {
      path: circlePath,
      align: circlePath,
      alignOrigin: [0.5, 0.5],
      end: ((i: number) => gsap.utils.wrap(0, 1, i / items.length - 0.15)) as unknown as number
    },
    scale: 0.9
  });

  const tl = gsap.timeline({ paused: true, reversed: true });

  if(window.outerWidth > 768){
    tl.to(wrapperCircle, {
      rotation: 360,
      transformOrigin: 'center',
      duration: 1,
      ease: 'none'
    });
  }

  tl.to(
    items,
    {
      rotation: '-=360',
      transformOrigin: '',
      duration: 1,
      ease: 'none'
    },
    0
  );

  tl.to(
    tracker,
    {
      item: numItems,
      duration: 1,
      ease: 'none',
      modifiers: {
        item: (value: number) => wrapTracker(numItems - Math.round(value))
      }
    },
    0
  );

  items.forEach((el: Element, i:number) => {
    const circle = el.querySelector('.circle-slider__small-circle');
    const blockNumber = el.querySelector('.circle-slider__item-number');

    el.addEventListener('click', () => {
      const current = tracker.item,
        activeItem = i;

      if (i === current) {
        return;
      }

      const foundActiveItem = block.querySelector('.circle-slider__item.active');
      if(foundActiveItem){
        foundActiveItem.classList.remove('active');
        gsap.to(circle, {scale: 1, duration: DURATION});
        blockNumber?.classList.add('hidden');
        setTimeout(() => {
          circle?.classList.remove('middle-circle');
        }, 250);
      }
      items[activeItem].classList.add('active');

      const diff = current - i;

      if (Math.abs(diff) < numItems / 2) {
        moveWheel(diff * itemStep);
      } else {
        const amt = numItems - Math.abs(diff);

        if (current > i) {
          moveWheel(amt * -itemStep);
        } else {
          moveWheel(amt * itemStep);
        }
      }

      if(titleItem){
        titleItem.textContent = el.getAttribute('data-title');
      }
    });

    if(circle){
      circle.addEventListener('mouseenter', () => {
        if(!el.classList.contains('active')){
          circle.classList.add('middle-circle');
          blockNumber?.classList.remove('hidden');
          gsap.to(circle, {scale: 9.3, duration: DURATION});
        }
      });
      circle.addEventListener('mouseleave', () => {
        if(!el.classList.contains('active')){
          gsap.to(circle, {scale: 1, duration: DURATION});
          blockNumber?.classList.add('hidden');
          setTimeout(() => {
            circle.classList.remove('middle-circle');
          }, 200);
        }
      });
    }
  });

  const buttonNext = block.querySelector('#next');
  if(buttonNext){
    buttonNext.addEventListener('click', () => {
      if(!buttonNext.classList.contains('disabled-button')){
        moveWheel(-itemStep);
      }
    });
  }

  const buttonPrev = block.querySelector('#prev');
  if(buttonPrev){
    buttonPrev.addEventListener('click', () => {
      if(!buttonPrev.classList.contains('disabled-button')){
        moveWheel(itemStep);
      }
    });
  }

  function moveWheel(amount: number) {
    const progress = tl.progress();
    tl.progress(wrapProgress(snap(tl.progress() + amount)));
    const next = tracker.item;
    tl.progress(progress);
    const numberSelectItem = items[next].getAttribute('data-number') as string;
    const titleSelectItem = items[next].getAttribute('data-title') as string;
    const foundActiveButton = block.querySelector('.circle-slider__item.active');

    if(foundActiveButton){
      foundActiveButton.classList.remove('active');
    }
    items[next].classList.add('active');

    if(titleItem){
      titleItem.textContent = titleSelectItem;
    }
    if(quantityItemsBlock){
      quantityItemsBlock.textContent = `0${numberSelectItem}/0${numItems}`;
    }

    gsap.to(tl, {
      progress: snap(tl.progress() + amount),
      modifiers: {
        progress: wrapProgress
      }
    });

    setTimeout(() => {
      if(numberSelectItem === '1' && buttonPrev){
        buttonPrev.classList.add('disabled-button');
      } else if(buttonPrev) {
        buttonPrev.classList.remove('disabled-button');
      }
      if(numberSelectItem === String(numItems) && buttonNext){
        buttonNext.classList.add('disabled-button');
      } else if(buttonNext){
        buttonNext.classList.remove('disabled-button');
      }
    }, 150);
  }
}

export default getSliderCircle;
