import React from 'react';
import { render, cleanup, } from '@testing-library/react';
import SearchInput from '../SearchInput';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';


afterEach(cleanup)
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<SearchInput ></SearchInput >, div);
})


it('renders SearchInput correctly', () => {
  const { getByTestId, } =
    render(
      <SearchInput
        searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
      ></SearchInput >
    )
  expect(getByTestId("search-button")).toBeTruthy();
})

it('matches snapshot', () => {
  const tree = renderer.create(<SearchInput
    searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
  ></SearchInput >).toJSON();
  expect(tree).toMatchSnapshot();
})

