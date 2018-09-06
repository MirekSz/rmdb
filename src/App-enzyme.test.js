import React from 'react';
import ReactDOM from 'react-dom';
import { Parent, MChild } from './App';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('enzyme', function () {
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
  it('renders MCHild and call handler', () => {
    let handler = () => { };
    let html = render(<MChild a={{ i: 0 }} handler={handler} />);

    expect(html.text()).toMatch('"i":0');

    html = render(<MChild a={{ i: 1 }} handler={handler} />);

    expect(html.text()).toMatch('"i":1');
  });

  it('renders Parent and call handler', () => {
    // let wrapper = mount(<Parent />, { attachTo: document.body });
    let wrapper = mount(<Parent />);
    const instance = wrapper.instance();
    expect(instance.state.a.i).toBe(0);
    expect(wrapper.text()).toMatch('"i":0');


    let buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');

    expect(instance.state.a.i).toBe(1);
    expect(wrapper.text()).toMatch('"i":1');
  });
})