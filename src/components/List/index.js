import React from "react";
import "./style.css";

function ListComponent({
  data,
  cursor,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  onSelect,
}) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div
            className={cursor === index ? "active-select" : "item-hover"}
            key={index + Date.now()}
            tabIndex={index}
            onMouseEnter={onMouseEnterEvent}
            onMouseLeave={onMouseLeaveEvent}
            onClick={() => onSelect(item)}
          >
            {item.sku_name}
          </div>
        );
      })}
    </>
  );
}

export default ListComponent;
