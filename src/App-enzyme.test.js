import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { Parent, MChild, CompositeExample, TodoView, InputView,store } from './App';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// @ts-ignore
describe('enzyme', function () {
  // @ts-ignore
  it('renders without crashing parent', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Parent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // @ts-ignore
  it('renders without crashing child', () => {
    let handler = () => { };
    const div = document.createElement('div');
    ReactDOM.render(<MChild a={{}} handler={handler} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  // @ts-ignore
  it('renders MCHild and call handler', () => {
    let handler = () => { };
    let html = render(<MChild a={{ i: 0 }} handler={handler} />);

    // @ts-ignore
    expect(html.text()).toMatch('"i":0');

    html = render(<MChild a={{ i: 1 }} handler={handler} />);

    // @ts-ignore
    expect(html.text()).toMatch('"i":1');
  });

  // @ts-ignore
  it('renders Parent and call handler', () => {
    // let wrapper = mount(<Parent />, { attachTo: document.body });
    let wrapper = mount(<Parent />);
    const instance = wrapper.instance();
    // @ts-ignore
    expect(instance.state.a.i).toBe(0);
    // @ts-ignore
    expect(wrapper.text()).toMatch('"i":0');


    let buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');

    // @ts-ignore
    expect(instance.state.a.i).toBe(1);
    // @ts-ignore
    expect(wrapper.text()).toMatch('"i":1');
  });

  // @ts-ignore
  it('renders CompositeExample', async () => {
    // let wrapper = mount(<Parent />, { attachTo: document.body });
    // let m = mount(<CompositeExample />);
    let s = mount(<CompositeExample />);
    // let s = render(<CompositeExample />);
    //let v = s.find(InputView);
    // console.log('mount', m.html());
    //console.log('shallow', v.length);;
    expect(s.find('.content').text()).not.toMatch('My new value');

    s.find('input[type="text"]').simulate('change', { target: { value: 'My new value' } });

    expect(s.find('.content').text()).toMatch('My new value');

    expect(s.find('.content').length).toBe(1);

    expect(s.find('input[type="checkbox"]').props().checked).toBe(false)

    console.log(new Date());
    s.find('input[type="checkbox"]').simulate('click');
    expect(s.find('p').text()).toMatch('Loading');;
    expect(store.finished).toBe(false);
    await wait();
    expect(store.finished).toBe(true);

  });
})

function wait() {
  return new Promise((r, re) => {
    setTimeout(function () {
      r();
    }, 300)
  })
}