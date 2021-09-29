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
}) {
  return (
    <div className="search-input">
      <input
        className={"input-autocomplete"}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onChangeText(event.target.value)}
        placeholder={"Type to search for a service"}
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
            bottom: data.length > 6 ? -202 : -44 * data.length,
            overflowY: data.length > 6 ? "scroll" : "auto",
          }}
          className={"overflow-container-full-height"}
        >
          {data.map((i) => {
            return <div onClick={() => onSelect(i.sku_id)}>{i.sku_name}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default AutoCompleteComponent;
