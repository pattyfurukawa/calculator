import React from 'react';
import ReactDOM from 'react-dom';

import Calculator from './components/Calculator';

function App() {
  return (
    <div>
      <Calculator/>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
