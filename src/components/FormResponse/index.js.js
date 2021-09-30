import * as React from 'react';
import './style.css';
import logo from '../../assets/search.png'; // Tell webpack this JS file uses this image

const ListItema = ({ Objectkey, value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} >
      <div className="Frm-Key-Val">
        {Objectkey}:
      </div>
      <div className="Frm-Key-Val" >
        {value}
      </div>
    </div>
  );
}

export default function FormResponse({ formData }) {
  return (
    <div>
      <div className="Frm-Heading">
        Form Result
      </div>
      {formData && Object.keys(formData).length > 0 ?
        Object.keys(formData).map((key, i) => {
          return (
            <ListItema key={i+Date.now()} Objectkey={key} value={formData[key]} />
          )
        }) :
        <div style={{marginTop:'20%',justifyContent:'center',display:'flex'}}>
          <img src={logo} alt="Logo" />
        </div>
      }

    </div>
  );
}
