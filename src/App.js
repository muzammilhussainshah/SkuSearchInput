import SkuSearchInput from './components/SkuSearchInput';
import FormResponse from './components/FormResponse';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [sku, setsku] = useState({});

  return (
    <div className="App" >
      <div className="col1">
          <SkuSearchInput
            searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}
            checkSearchKey={'sku_name'}
            width={'80%'}
            placeHolder={'Type to search for a service'}
            backgroundColor={"#EEF1F0"}
            onSelect={(value)=>setsku(value)}
          />
      </div>
      <div className="col2">
        <FormResponse formData={sku} />
      </div>
    </div>
  );
}

export default App;
