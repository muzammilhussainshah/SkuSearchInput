import SkuSearchInput from './components/SkuSearchInput';
import FormResponse from './components/FormResponse';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="col1">
        <SkuSearchInput />
      </div>
      <div className="col2">
        <FormResponse />
      </div>
    </div>
  );
}

export default App;
