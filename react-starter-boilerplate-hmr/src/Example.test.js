import chai from 'chai'
import React from 'react'
import { render } from 'react-dom';
import { shallow } from 'enzyme';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world</h1>
            </div>
        );
    }
}

describe("<Hello/>", () => {
    "use strict";
    it('renders one <h1> tag', () => {
        const wrapper = shallow(<Hello />);
        debugger
        render(<Hello />, $("#workspace")[0])
        expect(wrapper.find('h1')).to.have.length(1);
    });
})