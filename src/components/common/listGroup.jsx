import React from "react";
import PropTypes from "prop-types";

// input: items, currentItem
// output: onItemSelected

const ListGroup = ({ items, currentItem, onItemSelected }) => {
  return items.map(i => {
    let buttonClasses = "button-small";
    if (i !== currentItem) buttonClasses += " button-outline";

    return (
      <button
        key={i}
        className={buttonClasses}
        onClick={() => onItemSelected(i)}
      >
        {i}
      </button>
    );
  });
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  currentItem: PropTypes.any.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default ListGroup;
