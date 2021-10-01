import React, { useEffect, useRef } from "react";

import searchIcon from "../../assets/search.png";
import ListComponent from "../List";

import "./style.css";

function AutoCompleteComponent({
  data = [],
  loading = false,
  onChangeText,
  noResults = false,
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
}) {
  const searchResultRef = useRef(null);
  const InputRef = useRef(null);

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
      <div className={"input-container"} style={{ backgroundColor }}>
        <input
          ref={InputRef}
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

      {value && !data.length && (
        <div className={"overflow-container"}>
          {loading && <div className={"no-result"}>{"Loading..."}</div>}
          {noResults && !loading && (
            <div className={"no-result"}>{"There are no results"}</div>
          )}
        </div>
      )}

      {value && data.length > 0 && (
        <div
          ref={searchResultRef}
          style={{
            bottom: data.length >= 5 ? -202 : -22 * (data.length * 2),
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
