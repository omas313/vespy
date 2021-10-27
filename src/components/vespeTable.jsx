import React from "react";
import Like from "./common/like";
import Table from "./common/table";

class VespeTable extends React.Component {
  columns = [
    {
      label: "Modello",
      path: v => v.modello.nome,
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

export default VespeTable;
