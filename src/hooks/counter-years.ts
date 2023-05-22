import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

function countYers (start: string, end:string){
  gsap.to('.block-years__start-year', { innerText: Number(start), duration: 0.3, snap: { innerText: 1 }});
  gsap.to('.block-years__end-year', { innerText: Number(end), duration: 0.3, snap: { innerText: 1 }});
}

export default countYers;
