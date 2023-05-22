import dataTheme from '../../mocks/theme';
import ListSliderTheme from '../../components/circle-slider-list/circle-slider-list';
import YearsBlock from '../../components/years-block/years-block';

function Main (): JSX.Element {
  return(
    <main>
      <div className="wrapper-content">
        <h1 className="visually-hidden">Исторические даты</h1>
        <div className="block-years">
          <ListSliderTheme themesProps={dataTheme}/>
          <YearsBlock yearsProps={dataTheme}/>
        </div>
      </div>
    </main>
  );
}

export default Main;
