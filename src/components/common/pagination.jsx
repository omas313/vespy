import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
  currentPage,
  itemCount,
  itemsPerPage,
  onPageSelected,
}) => {
  const numPages = Math.ceil(itemCount / itemsPerPage);
  let pages = [...Array(numPages + 1).keys()].slice(1);

  if (numPages === 1) return null;

  return (
    <div className="row">
      {pages.map(p => {
        let buttonClass = "button";
        if (currentPage !== p) buttonClass += " button-outline";

        return (
          <div className="column column-10" key={p}>
            <button className={buttonClass} onClick={() => onPageSelected(p)}>
              {p}
            </button>
          </div>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageSelected: PropTypes.func.isRequired,
};

export default Pagination;
