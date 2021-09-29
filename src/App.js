import SkuSearchInput from './components/SkuSearchInput';
import FormResponse from './components/FormResponse';
import './App.css';

function App() {
  return (
    <div className="App" >
      <div className="col1">
        <div style={{ width: "80%", }}>
          <SkuSearchInput
            searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
            checkSearchKey={['sku_name','product_code']}
          />
        </div>
      </div>
      <div className="col2">
        <FormResponse />
      </div>
    </div>
  );
}

export default App;
