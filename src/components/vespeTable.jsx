import React from "react";
import Like from "./common/like";

const VespeTable = ({ vespe, onLikeToggle, onDelete, onSort }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() => onSort(v => v.modello.nome)}>Modello</th>
        <th onClick={() => onSort(v => v.modello.cilindrata)}>Cilidrata</th>
        <th onClick={() => onSort(v => v.km)}>Km</th>
        <th onClick={() => onSort(v => v.tariffe)}>Tariffe</th>
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

export default VespeTable;
