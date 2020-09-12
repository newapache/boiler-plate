import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // App.js에서 export한 function을 App이란 이름으로 가져옴 
import * as serviceWorker from './serviceWorker';

//document가 index.html인지 어디서?
// App이 return한 html이 index.html root에 <App/ >로  렌더링  
ReactDOM.render(<App/ >, document.getElementById('root'));
//ReactDOM.render(<p>dd</p>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
