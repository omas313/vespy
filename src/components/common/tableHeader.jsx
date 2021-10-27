import React from "react";
import PropTypes from "prop-types";

class TableHeader extends React.Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (this.isSameSortProperty(sortColumn.path, path))
      sortColumn.order = sortColumn.order === "asc" ? "dec" : "asc";
    else {
      sortColumn.path = path;
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
          {columns.map(column => {
            const onClick = column.path && (() => this.raiseSort(column.path));

            return (
              <th key={columns.indexOf(column)} onClick={onClick}>
                {column.label}
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
