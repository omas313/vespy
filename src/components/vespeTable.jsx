import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class VespeTable extends React.Component {
  columns = [
    {
      label: "Modello",
      content: v => <Link to={`/vespe/${v._id}`}>{v.modello.nome}</Link>,
    },
    {
      label: "Cilidrata",
      path: v => v.modello.cilindrata,
    },
    { label: "Km", path: v => v.km },
    { label: "Tariffe", path: v => v.tariffe },
    {
      content: v => (
        <Like isLiked={v.mipiace} onToggle={() => this.props.onLikeToggle(v)} />
      ),
    },
    {
      content: v => (
        <button className="button" onClick={() => this.props.onDelete(v._id)}>
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { data, sortColumn, onSort } = this.props;

    return (
      <Table
        data={data}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

VespeTable.propTypes = {
  data: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLikeToggle: PropTypes.func.isRequired,
};

export default VespeTable;
