import React from 'react';
import { render, cleanup, } from '@testing-library/react';
import SkuSearchInput from '../SkuSearchInput';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';


afterEach(cleanup)
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<SkuSearchInput ></SkuSearchInput >, div);
})


it('renders SkuSearchInput correctly', () => {
  const { getByTestId, } =
    render(
      <SkuSearchInput
        searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
      ></SkuSearchInput >
    )
  expect(getByTestId("search-button")).toBeTruthy();
})

it('matches snapshot', () => {
  const tree = renderer.create(<SkuSearchInput
    searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
  ></SkuSearchInput >).toJSON();
  expect(tree).toMatchSnapshot();
})

