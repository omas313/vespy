import React from "react";
import PropTypes from "prop-types";

class TableHeader extends React.Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (this.isSameProperty(sortColumn.path, path))
      sortColumn.order = sortColumn.order === "asc" ? "dec" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  isSameProperty = (current, selected) =>
    current && current.toString() === selected.toString();

  renderSortIcon = (column, sortColumn) => {
    if (!column.path || !this.isSameProperty(sortColumn.path, column.path))
      return null;

    let classes = "fa fa-sort-" + (sortColumn.order === "asc" ? "up" : "down");
    return <i className={classes}></i>;
  };

  getCellClass = column => (column.path ? "clickable" : null);

  render() {
    const { columns, sortColumn } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => {
            const onClick = column.path && (() => this.raiseSort(column.path));

            return (
              <th
                key={columns.indexOf(column)}
                onClick={onClick}
                className={this.getCellClass(column)}
              >
                {column.label} {this.renderSortIcon(column, sortColumn)}
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
