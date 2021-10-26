import "./vespe.css";
import { getModelli } from "../services/fakeModelService";
import { getVespe, deleteVespa } from "../services/fakeVespaService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import React from "react";
import VespeTable from "./vespeTable";

class Vespe extends React.Component {
  defaultFilter = { nome: "Tutto" };

  state = {
    vespe: [],
    models: [],
    currentPage: 1,
    itemsPerPage: 3,
    currentModelFilter: this.defaultFilter,
    currentSortColumn: {},
  };

  componentDidMount() {
    const models = [this.defaultFilter, ...getModelli()];

    this.setState({
      vespe: getVespe(),
      models,
    });
  }

  render() {
    const {
      vespe: allVespe,
      currentPage,
      itemsPerPage,
      currentModelFilter,
      models,
      currentSortColumn,
    } = this.state;

    if (allVespe.length === 0 || models.length === 0)
      return this.renderNoVespeMessage();

    const filtered =
      currentModelFilter && currentModelFilter._id
        ? allVespe.filter(v => v.modello._id === currentModelFilter._id)
        : allVespe;

    const isReverseOrder = currentSortColumn.order === "dec";
    const sorted = currentSortColumn.propFunction
      ? filtered.sort((a, b) => {
          const valueA = currentSortColumn.propFunction(a);
          const valueB = currentSortColumn.propFunction(b);
          let returnValue = 0;

          if (valueA < valueB) returnValue = -1;
          else if (valueA > valueB) returnValue = 1;
          else returnValue = 0;

          return isReverseOrder ? (returnValue *= -1) : returnValue;
        })
      : filtered;

    const vespe = paginate(sorted, currentPage, itemsPerPage);

    const count = filtered.length;

    return (
      <section className="vespe">
        <div className="row">
          <div className="column column-20">
            <ListGroup
              items={models}
              selectedItem={currentModelFilter}
              onItemSelected={this.handleModelFilterSelected}
            />
          </div>
          <div className="column">
            {count === 0 ? (
              this.renderNoVespeMessage()
            ) : (
              <React.Fragment>
                <p>
                  Ci sono <strong>{count}</strong> vespe disponibili.
                </p>
                <VespeTable
                  vespe={vespe}
                  onLikeToggle={this.handleLikeToggle}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
                <Pagination
                  currentPage={currentPage}
                  itemCount={count}
                  itemsPerPage={itemsPerPage}
                  onPageSelected={this.handlePageSelected}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    );
  }

  renderNoVespeMessage = () => <p>Non ci sono Vespe disponibili.</p>;

  handleDelete = vespaId => {
    const vespe = this.state.vespe.filter(v => v._id !== vespaId);
    deleteVespa(vespaId);

    this.setState({ vespe });
  };

  handleSort = propFunction => {
    const currentSortColumn = { ...this.state.currentSortColumn };

    if (this.isSameSortProperty(currentSortColumn.propFunction, propFunction))
      currentSortColumn.order =
        currentSortColumn.order === "asc" ? "dec" : "asc";
    else {
      currentSortColumn.propFunction = propFunction;
      currentSortColumn.order = "asc";
    }

    this.setState({ currentSortColumn });
  };

  isSameSortProperty = (current, selected) =>
    current && current.toString() === selected.toString();

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

  handleModelFilterSelected = model => {
    if (this.state.currentModelFilter === model) return;

    this.setState({ currentModelFilter: model, currentPage: 1 });
  };
}

export default Vespe;
