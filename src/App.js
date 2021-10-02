import SearchInput from './components/AutoComplete/SearchInput';
import FormResponse from './components/FormResponse/index.js';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [sku, setsku] = useState({});

  return (
    <div className="App" >
      <div className="col1">
        <SearchInput
          searchUrl={'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?'}//you can pass any api for search
          checkSearchKey={'sku_name'}//To search for perspective keywords in object key. example sku_id, product_code, stock_in
          width={'80%'}
          placeHolder={'Type to search for a service'}
          backgroundColor={"#EEF1F0"}//for input background color
          // borderColor={"#e96a69"}//for input border color
          onSelect={(value) => setsku(value)}
        />
      </div>
      <div className="col2">
        <FormResponse formData={sku} />
      </div>
    </div>
  );
}

export default App;
