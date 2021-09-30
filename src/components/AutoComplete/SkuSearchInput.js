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

  let timer = setTimeout(() => { }, 1);
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

  return (
    <div style={{ width }}>
      <AutoCompleteComponent
        loading={isLoading}
        data={autoFilledData}
        onFocus={() => {
          setSearchText(true);
          setNoResults(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setSearchText(false);
            setNoResults(false);
          }, 500);
        }}
        onChangeText={(value) => onChange(value)}
        placeHolder={placeHolder}
        backgroundColor={backgroundColor}
        noResults={noResults}
        searchText={searchText}
        onSelect={(value) => onSelect(value)}
      />
    </div>
  );
}
