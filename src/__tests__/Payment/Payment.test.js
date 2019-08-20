import React, { Component } from 'react';
import { shallow , mount} from 'enzyme';

import Login from '../../Components/Login/Login';
import Payment from '../../Components/Payment/Payment';

const wrapper = shallow(<Payment />)
describe('It should render login component', () => {

    it('should render payment', () => {
        expect(wrapper).toMatchSnapshot();
    })
})

describe('When submit button is clicked it should call handle submit', () => {
    
    it('should handle submit',()=>{
        const comp = mount(<Payment />);
       // const fakeEvent = { preventDefault: () => console.log('preventDefault') };
          const spy = jest.spyOn(comp.instance(), 'handleSubmit');
          comp.instance().forceUpdate();
          comp.find('#submit').simulate('click');
          expect(spy).toHaveBeenCalled();

    })

});
