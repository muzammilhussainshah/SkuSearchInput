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
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [inputValue, setinputValue] = useState("");

  const searchData = async (keyWord) => {
    setisLoading(true);
    let url;
    url = `${searchUrl}${checkSearchKey}=${keyWord}`;
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(
            "🚀 ~ file: SkuSearchInput.js ~ line 32 ~ .then ~ result",
            result
          );
          setautoFilledData(result.sku);
          setisLoading(false);
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      setisLoading(false);
      console.log(
        err.response,
        "error from searchData",
        JSON.parse(JSON.stringify(err.message))
      );
    }
  };

  let timer = setTimeout(() => {}, 1);
  const onChange = (keyWord) => {
    if (keyWord) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchText(keyWord);
        searchData(keyWord);
      }, 500);
    } else {
      setTimeout(() => {
        setautoFilledData([]);
      }, 1200);
    }
  };

  const handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      let cloneCursor = cursor - 1;

      setCursor(cloneCursor);
    } else if (e.keyCode === 40 && cursor < autoFilledData.length - 1) {
      let cloneCursor = cursor + 1;

      setCursor(cloneCursor);
    } else if (e.keyCode === 13 && cursor >= 0) {
      let selectedItem = autoFilledData[cursor];
      setinputValue(selectedItem.sku_name);
      onSelect(selectedItem);
      setSearchText(false);
      setNoResults(false);
      setCursor(-1);
    }
  };

  return (
    <div style={{ width }}>
      <AutoCompleteComponent
        loading={isLoading}
        data={autoFilledData}
        onFocus={() => {
          setSearchText(true);
          setNoResults(true);
          setCursor(-1);
        }}
        onBlur={() => {
          setTimeout(() => {
            setSearchText(false);
            setNoResults(false);
            setCursor(-1);
          }, 500);
        }}
        valText={inputValue}
        onChangeText={(value) => onChange(value)}
        placeHolder={placeHolder}
        backgroundColor={backgroundColor}
        noResults={noResults}
        handleKeyDown={handleKeyDown}
        searchText={searchText}
        onSelect={(value) => onSelect(value)}
        cursor={cursor}
      />
    </div>
  );
}
