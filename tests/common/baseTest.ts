import * as React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';

export default function (components: React.ReactElement) {
  it('component mount and unmount tests', () => {
    const wrapper = mount(components);
    expect(() => {
      wrapper.unmount();
    }).not.toThrow();
  });

  it('component snapshots tests', () => {
    const wrapper = shallow(components);
    expect(wrapper.render()).toMatchSnapshot();
  });
}