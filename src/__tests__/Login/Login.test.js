import React, { Component } from 'react';
import { shallow , mount} from 'enzyme';

import Login from '../../Components/Login/Login';

const wrapper = shallow(<Login />)
describe('It should render login component', () => {

    it('should render login', () => {
        expect(wrapper).toMatchSnapshot();
    })
})

describe('When submit button is clicked it should call handle submit', () => {
    
    it('should handle submit',()=>{
        const comp = mount(<Login />);
       // const fakeEvent = { preventDefault: () => console.log('preventDefault') };
          const spy = jest.spyOn(comp.instance(), 'handleSubmit');
          comp.instance().forceUpdate();
          comp.find('#submit').simulate('click');
          expect(spy).toHaveBeenCalled();

    })

});
