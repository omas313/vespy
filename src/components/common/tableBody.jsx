import React from "react";
import PropTypes from "prop-types";

class TableBody extends React.Component {
  renderCellContent = (item, column) =>
    column.content ? column.content(item) : column.path(item);

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={columns.indexOf(column)}>
                {this.renderCellContent(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableBody;
