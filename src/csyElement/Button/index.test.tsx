import React from 'react';
import { render } from '@testing-library/react';

import Button from '.';

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>Button</Button>);
    const element = wrapper.queryAllByText('Button');
    expect(element).toBeTruthy();
  });
});

// test('button render test',()=>{
//   const wrapper = render(<Button>Button</Button>)
//   const element = wrapper.queryAllByText('Button')
//   expect(element).toBeTruthy()
// })
