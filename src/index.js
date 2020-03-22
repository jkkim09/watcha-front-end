import React from 'react';
import ReactDOM from 'react-dom';
import App from './static/js/App';
import reducer from './reducers'; // 저장소
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const store = createStore(reducer);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('app'))
