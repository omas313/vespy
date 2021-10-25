import React from "react";
import { getVespe, deleteVespa } from "../services/fakeVespaService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import Pagination from "./common/pagination";
import "./vespe.css";

class Vespe extends React.Component {
  state = {
    vespe: [],
    currentPage: 1,
    itemsPerPage: 4,
  };

  componentDidMount() {
    this.setState({ vespe: getVespe() });
  }

  render() {
    return <section className="vespe">{this.renderVespe()}</section>;
  }

  renderVespe() {
    const { length: count } = this.state.vespe;
    const { currentPage, itemsPerPage } = this.state;

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
        <Pagination
          currentPage={currentPage}
          itemCount={count}
          itemsPerPage={itemsPerPage}
          onPageSelected={this.handlePageSelected}
        />
      </React.Fragment>
    );
  }

  renderVespeRows() {
    const { vespe, currentPage, itemsPerPage } = this.state;
    const paginatedVespe = paginate(vespe, currentPage, itemsPerPage);

    return paginatedVespe.map(v => (
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

  handlePageSelected = number => {
    if (this.state.currentPage === number) return;

    this.setState({ currentPage: number });
  };
}

export default Vespe;
