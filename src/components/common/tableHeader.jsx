import React from "react";
import PropTypes from "prop-types";

class TableHeader extends React.Component {
  raiseSort = propFunction => {
    const sortColumn = { ...this.props.sortColumn };

    if (this.isSameSortProperty(sortColumn.propFunction, propFunction))
      sortColumn.order = sortColumn.order === "asc" ? "dec" : "asc";
    else {
      sortColumn.propFunction = propFunction;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  isSameSortProperty = (current, selected) =>
    current && current.toString() === selected.toString();

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(c => {
            const onClick = c.propFunction
              ? () => this.raiseSort(c.propFunction)
              : null;

            return (
              <th key={columns.indexOf(c)} onClick={onClick}>
                {c.label}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
