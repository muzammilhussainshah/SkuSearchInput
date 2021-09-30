import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../assets/search.png";
import "./style.css";

function AutoCompleteComponent({
  data = [],
  searchText = true,
  loading = false,
  onChangeText,
  noResults = false,
  onFocus,
  onBlur,
  onSelect,
  placeHolder,
  backgroundColor,
  cursor,
  mouseEnterEv,
  mouseLeaveEv,
  onMouse,
  handleKeyDown,
  valText,
}) {
  const [inputValue, setinputValue] = useState("");
  const searchResultRef = useRef(null);
  const InputRef = useRef(null);

  const scrollIntoView = (position) => {
    searchResultRef.current.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (InputRef.current && InputRef.current.value) {
      InputRef.current.value = valText;
      setinputValue(valText);
    }
  }, [valText, InputRef]);

  useEffect(() => {
    if (cursor < 0 || !searchResultRef) {
      return () => {};
    }

    if (searchResultRef.current && searchResultRef.current.children) {
      if (!onMouse) {
        let listItems = Array.from(searchResultRef.current.children);
        listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
      }
    }
  }, [searchResultRef, cursor]);

  return (
    <div className="search-input">
      <div className={"input-container"} style={{ backgroundColor }}>
        <input
          ref={InputRef}
          className={"input-autocomplete"}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event) => {
            setinputValue(event.target.value);
            onChangeText(event.target.value);
          }}
          placeholder={placeHolder}
        />

        <div>
          <img src={searchIcon} width={30} />
        </div>
      </div>

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
          ref={searchResultRef}
          style={{
            bottom: data.length >= 5 ? -202 : -22 * (data.length * 2),
            overflowY: data.length >= 5 ? "scroll" : "auto",
          }}
          className={"overflow-container-full-height"}
        >
          {data.map((i, j) => {
            return (
              <div
                className={cursor === j ? "active-select" : "item-hover"}
                key={j + Date.now()}
                tabIndex={j}
                onMouseEnter={mouseEnterEv}
                onMouseLeave={mouseLeaveEv}
                onClick={() => {
                  onSelect(i);
                  setinputValue(i.sku_name);
                }}
              >
                {i.sku_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AutoCompleteComponent;
