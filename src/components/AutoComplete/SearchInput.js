import React, { useState } from "react";
import AutoCompleteComponent from "../AutoComplete/index";

export default function SearchInput({
  searchUrl,
  checkSearchKey,
  width,
  placeHolder,
  backgroundColor,
  onSelect,
  borderColor,
}) {
  const [autoFilledData, setautoFilledData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [mouseEnter, setMouseEnter] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSearchData = async (url) => {
    let options = {
      method: "GET",
      redirect: "follow",
    };

    return await fetch(url, options);
  };

  const searchData = async (keyWord) => {
    let url = `${searchUrl}${checkSearchKey}=${keyWord}`;

    setisLoading(true);
    try {
      const response = await (await fetchSearchData(url)).json();

      response && response.result === "OK"
        ? setautoFilledData(response.sku)
        : setautoFilledData([]);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
    }
  };

  const onChange = (keyWord) => {
    setInputValue(keyWord);

    if (keyWord) searchData(keyWord);
    else {
      setisLoading(false);
      // resetValues(true);
    }
  };

  const handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
    if (!mouseEnter) {
      if (e.keyCode === 38 && cursor > 0) {
        let cloneCursor = cursor - 1;

        setCursor(cloneCursor);
      } else if (e.keyCode === 40 && cursor < autoFilledData.length - 1) {
        let cloneCursor = cursor + 1;

        setCursor(cloneCursor);
      } else if (e.keyCode === 13 && cursor >= 0) {
        let selectedItem = autoFilledData[cursor];

        setInputValue(selectedItem.sku_name);
        onSelect(selectedItem);
        resetValues(false);
      }
    }
  };

  const handleMouseEvent = (ev, toggle) => {
    setMouseEnter(toggle);
    setCursor(ev.target.tabIndex);
  };

  const resetValues = (toggle) => {
    setNoResults(toggle);
    setIsFocused(toggle);
    setCursor(-1);
  };

  return (
    <div data-testid="search-button" style={{ width }}>
      <AutoCompleteComponent
        loading={isLoading}
        data={autoFilledData}
        isFocused={isFocused}
        onFocus={() => resetValues(true)}
        onBlur={() => setTimeout(() => resetValues(false), 100)}
        value={inputValue}
        onChangeText={(ev) => onChange(ev.target.value)}
        placeHolder={placeHolder}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        noResults={noResults}
        handleKeyDown={handleKeyDown}
        onMouseEnterEvent={(ev) => handleMouseEvent(ev, true)}
        onMouseLeaveEvent={(ev) => handleMouseEvent(ev, false)}
        isMouseEnter={mouseEnter}
        onSelect={(item) => {
          setInputValue(item.sku_name);
          onSelect(item);
          resetValues(false);
        }}
        cursor={cursor}
      />
    </div>
  );
}
