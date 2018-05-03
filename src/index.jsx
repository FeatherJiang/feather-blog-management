import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'normalize.css';
import './assets/styles/base.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
