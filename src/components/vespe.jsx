import React from "react";
import { getModelli } from "../services/fakeModelService";
import { getVespe, deleteVespa } from "../services/fakeVespaService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import "./vespe.css";

class Vespe extends React.Component {
  state = {
    vespe: [],
    models: [],
    currentPage: 1,
    itemsPerPage: 4,
    currentModelFilter: "",
  };

  componentDidMount() {
    const models = [{ _id: -1, nome: "All Models" }, ...getModelli()];

    this.setState({
      vespe: getVespe(),
      models,
      currentModelFilter: models[0].nome,
    });
  }

  render() {
    const { currentModelFilter, models } = this.state;

    return (
      <section className="vespe">
        <div className="row">
          <div className="column column-20">
            <ListGroup
              items={models.map(m => m.nome)}
              currentItem={currentModelFilter}
              onItemSelected={this.handleModelFilterSelected}
            />
          </div>
          <div className="column">{this.renderTable()}</div>
        </div>
      </section>
    );
  }

  renderTable() {
    const { vespe, currentPage, itemsPerPage, currentModelFilter, models } =
      this.state;

    const filtered =
      models.length > 0 && currentModelFilter === models[0].nome
        ? vespe
        : vespe.filter(v => v.modello.nome === currentModelFilter);
    const paginatedVespe = paginate(filtered, currentPage, itemsPerPage);
    const count = filtered.length;

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
          <tbody>{this.renderVespeRows(paginatedVespe)}</tbody>
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

  renderVespeRows(paginatedVespe) {
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

  handleModelFilterSelected = modelName => {
    if (this.state.currentModelFilter === modelName) return;

    this.setState({ currentModelFilter: modelName });
  };
}

export default Vespe;
