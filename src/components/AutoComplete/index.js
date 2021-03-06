import React, { useEffect, useRef } from "react";

import searchIcon from "../../assets/search.png";
import ListComponent from "../List";

import "./style.css";
import loader from "../../assets/loader.png";

function AutoCompleteComponent({
  data = [],
  loading = false,
  onChangeText,
  noResults,
  onFocus,
  onBlur,
  onSelect,
  placeHolder,
  backgroundColor,
  cursor,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  isMouseEnter,
  handleKeyDown,
  value,
  borderColor,
  isFocused,
}) {
  const searchResultRef = useRef(null);

  useEffect(() => {
    if (cursor < 0 || !searchResultRef) {
      return () => {};
    }

    if (searchResultRef.current && !isMouseEnter) {
      let listItems = Array.from(searchResultRef.current.children);
      listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
    }
  }, [searchResultRef, cursor]);

  const scrollIntoView = (position) => {
    searchResultRef.current.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div className="search-input">
      <div
        className={"input-container"}
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: borderColor,
          backgroundColor,
        }}
      >
        <input
          className={"input-autocomplete"}
          value={value}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChangeText}
          placeholder={placeHolder}
        />

        <img src={searchIcon} width={30} alt={"Search icon"} />
      </div>

      {isFocused && !data.length && (
        <div className={"overflow-container"}>
          {loading && (
            <div className={"no-result"}>
              {"Loading... "}
              <img
                src={loader}
                width="10px"
                height="10px"
                className="App-loader"
                alt="logo"
              />
            </div>
          )}
          {noResults && !loading && (
            <div className={"no-result"}>{"There are no results"}</div>
          )}
        </div>
      )}

      {value && isFocused && data.length > 0 && (
        <div
          ref={searchResultRef}
          style={{
            bottom: data.length >= 5 ? -202 : -24 * (data.length * 2),
            overflowY: data.length >= 5 ? "scroll" : "auto",
          }}
          className={"overflow-container-full-height"}
        >
          <ListComponent
            data={data}
            onSelect={onSelect}
            cursor={cursor}
            onMouseEnterEvent={onMouseEnterEvent}
            onMouseLeaveEvent={onMouseLeaveEvent}
          />
        </div>
      )}
    </div>
  );
}

export default AutoCompleteComponent;
