import React from "react";
import Like from "./common/like";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

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
    const { vespe, sortColumn, onSort } = this.props;

    return (
      <table>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={vespe} columns={this.columns} />
      </table>
    );
  }
}

export default VespeTable;
