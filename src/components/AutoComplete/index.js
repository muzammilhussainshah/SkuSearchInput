import React, { useState } from "react";
import "./style.css";

function AutoCompleteComponent({
  data = ["asd", "sad", "sadasd", "sads"],
  searchText = true,
  loading = false,
  onChangeText,
  noResults = false,
  onFocus,
  onBlur,
  onSelect,
  placeHolder,
  backgroundColor
}) {
  const [inputValue, setinputValue] = useState('');




  return (
    <div className="search-input">
      <input
        className={"input-autocomplete"}
        style={{backgroundColor}}
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => {
          setinputValue(event.target.value)
          onChangeText(event.target.value)
        }}
        placeholder={placeHolder}
      />
      {searchText && !data.length && (
        <div className={"overflow-container"}>
          {loading && <div className={"no-result"}>{"Loading..."}</div>}
          {noResults && !loading && (
            <div className={"no-result"}>{"There are no results"}</div>
          )}
        </div>
      )}

      {searchText && data.length > 0 && (
        <div
          style={{
            bottom: data.length > 6 ? -202 : -48 * data.length,
            overflowY: data.length > 6 ? "scroll" : "auto",
          }}
          className={"overflow-container-full-height"}
        >
          {data.map((i, j) => {
            return <div key={j + Date.now()} onClick={() => {
              onSelect(i)
              setinputValue(i.sku_name)
            }}>{i.sku_name}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default AutoCompleteComponent;
