import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.scss';
// import './styles/desktop.scss';
// import './styles/tablet.scss';
// import './styles/mobile.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
