import React from 'react';
import ReactDOM from 'react-dom';
import { Parent, MChild } from './App';


it('renders without crashing parent', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Parent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing child', () => {
  let handler = () => { };
  const div = document.createElement('div');
  ReactDOM.render(<MChild a={{}} handler={handler} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
