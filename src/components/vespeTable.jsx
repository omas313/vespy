import React from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class VespeTable extends React.Component {
  columns = [
    { label: "Modello", propFunction: v => v.modello.nome },
    { label: "Cilidrata", propFunction: v => v.modello.cilindrata },
    { label: "Km", propFunction: v => v.km },
    { label: "Tariffe", propFunction: v => v.tariffe },
    {},
    {},
  ];

  render() {
    const { vespe, sortColumn, onLikeToggle, onDelete, onSort } = this.props;

    return (
      <table>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {vespe.map(v => (
            <tr key={v._id}>
              <td>{v.modello.nome}</td>
              <td>{v.modello.cilindrata}</td>
              <td>{v.km}</td>
              <td>{v.tariffe}</td>
              <td>
                <Like isLiked={v.mipiace} onToggle={() => onLikeToggle(v)} />
              </td>
              <td>
                <button className="button" onClick={() => onDelete(v._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default VespeTable;
