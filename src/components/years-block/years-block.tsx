import { TypeDataTheme } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { getNumberSelectTheme } from '../../store/reducer';
import countYers from '../../hooks/counter-years';

type ThemeProps = {
  yearsProps: TypeDataTheme;
};

function YearsBlock ({yearsProps}: ThemeProps): JSX.Element {
  let isSelectTheme = useAppSelector(getNumberSelectTheme) - 1;

  if(isSelectTheme < 0) {
    isSelectTheme = 0;
  }

  countYers(yearsProps[isSelectTheme].years.start, yearsProps[isSelectTheme].years.end);

  return(
    <div>
      <span id="start-year" className="block-years__start-year">{yearsProps[0].years.start}</span>
      <span id="end-year" className="block-years__end-year">{yearsProps[0].years.end}</span>
    </div>
  );
}

export default YearsBlock;
