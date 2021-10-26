import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  selectedItem,
  onItemSelected,
  textProperty,
  valueProperty,
}) =>
  items.map(i => {
    const text = i[textProperty];
    const value = i[valueProperty];

    let buttonClasses = "button-small";
    if (selectedItem && selectedItem[valueProperty] !== value)
      buttonClasses += " button-outline";

    return (
      <button
        key={value || text}
        className={buttonClasses}
        onClick={() => onItemSelected(i)}
      >
        {text}
      </button>
    );
  });

ListGroup.defaultProps = {
  textProperty: "nome",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.any.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default ListGroup;
