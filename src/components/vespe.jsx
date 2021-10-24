import React from "react";
import { getVespe, deleteVespa } from "../services/fakeVespaService";
import Like from "./common/like";
import "./vespe.css";

class Vespe extends React.Component {
  state = {
    vespe: getVespe(), // not the right way to init
  };

  render() {
    return <section className="vespe">{this.renderVespe()}</section>;
  }

  renderVespe() {
    const { length: count } = this.state.vespe;

    if (count === 0) return <p>Non ci sono Vespe disponibili.</p>;

    return (
      <React.Fragment>
        <p>
          Ci sono <strong>{count}</strong> vespe disponibili.
        </p>
        <table>
          <thead>
            <tr>
              <th>Modello</th>
              <th>Cilidrata</th>
              <th>Km</th>
              <th>Tariffe</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderVespeRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  renderVespeRows() {
    return this.state.vespe.map(v => (
      <tr key={v._id}>
        <td>{v.modello.nome}</td>
        <td>{v.modello.cilindrata}</td>
        <td>{v.km}</td>
        <td>{v.tariffe}</td>
        <td>
          <Like isLiked={v.mipiace} onToggle={() => this.handleLikeToggle(v)} />
        </td>
        <td>
          <button className="button" onClick={() => this.handleDelete(v._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  handleDelete = vespaId => {
    const vespe = this.state.vespe.filter(v => v._id !== vespaId);
    deleteVespa(vespaId);

    this.setState({ vespe });
  };

  handleLikeToggle = vespa => {
    const vespe = [...this.state.vespe];
    const index = vespe.indexOf(vespa);

    vespe[index] = { ...vespa };
    vespe[index].mipiace = !vespa.mipiace;

    this.setState({ vespe });
  };
}

export default Vespe;
