import React, { useState, useEffect } from "react";
import AutoCompleteComponent from "../AutoComplete/index";

export default function SkuSearchInput({
  searchUrl,
  checkSearchKey,
  width,
  placeHolder,
  backgroundColor,
  onSelect,
}) {
  const [autoFilledData, setautoFilledData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [mouseEnter, setMouseEnter] = useState(false);

  const fetchSearchData = async (url) => {
    let options = {
      method: "GET",
      redirect: "follow",
    };

    return await fetch(url, options);
  };

  const searchData = async (keyWord) => {
    setisLoading(true);
    let url = `${searchUrl}${checkSearchKey}=${keyWord}`;

    try {
      const response = await (await fetchSearchData(url)).json();

      response && response.result === "OK" && setautoFilledData(response.sku);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
    }
  };

  const onChange = (keyWord) => {
    setInputValue(keyWord);

    if (keyWord) searchData(keyWord);
    else setTimeout(() => setautoFilledData([]), 1200);
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
    setCursor(-1);
  };

  return (
    <div style={{ width }}>
      <AutoCompleteComponent
        loading={isLoading}
        data={autoFilledData}
        onFocus={() => resetValues(true)}
        onBlur={() => setTimeout(() => resetValues(false), 500)}
        value={inputValue}
        onChangeText={(ev) => onChange(ev.target.value)}
        placeHolder={placeHolder}
        backgroundColor={backgroundColor}
        noResults={noResults}
        handleKeyDown={handleKeyDown}
        onMouseEnterEvent={(ev) => handleMouseEvent(ev, true)}
        onMouseLeaveEvent={(ev) => handleMouseEvent(ev, false)}
        isMouseEnter={mouseEnter}
        onSelect={(item) => {
          setInputValue(item.sku_name);
          onSelect(item);
        }}
        cursor={cursor}
      />
    </div>
  );
}
