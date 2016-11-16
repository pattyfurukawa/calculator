var React = require('react');
var ReactDOM = require('react-dom');

import Calculator from 'src/components/Calculator';

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
