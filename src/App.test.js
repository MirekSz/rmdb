import React from 'react';
import ReactDOM from 'react-dom';
import { Parent, MChild } from './App';
import { render, fireEvent, cleanup, waitForElement, prettyDOM } from 'react-testing-library'
afterEach(cleanup)
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
// class Parent extends React.Component {
//   render() {
//     return (<MChild a={model} handler={handler} />)
//   }
// }
it('renders MCHild and call handler', () => {
  let model = { i: 0 };
  let handler = () => { model.i = 1; };
  let { getByText, getByTestId, container, debug, rerender } = render(<MChild a={model} handler={handler} />);

  expect(prettyDOM(container)).toMatch('"i":0');
  fireEvent.click(getByText('a'));

  let afterUpdate = render(<MChild a={model} handler={handler} />);

  expect(prettyDOM(afterUpdate.container)).toMatch('"i":1');
});
