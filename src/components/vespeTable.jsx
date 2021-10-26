import React from "react";
import Like from "./common/like";

class VespeTable extends React.Component {
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
    const { vespe, onLikeToggle, onDelete } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => this.raiseSort(v => v.modello.nome)}>Modello</th>
            <th onClick={() => this.raiseSort(v => v.modello.cilindrata)}>
              Cilidrata
            </th>
            <th onClick={() => this.raiseSort(v => v.km)}>Km</th>
            <th onClick={() => this.raiseSort(v => v.tariffe)}>Tariffe</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
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
