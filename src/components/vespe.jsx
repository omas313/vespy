import "./vespe.css";
import { getModels } from "../services/modelService";
import { getVespe, deleteVespa } from "../services/vespaService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import React from "react";
import VespeTable from "./vespeTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Vespe extends React.Component {
  defaultFilter = { nome: "Tutto" };

  state = {
    vespe: [],
    models: [],
    currentPage: 1,
    itemsPerPage: 3,
    modelFilter: this.defaultFilter,
    sortColumn: {},
    search: "",
  };

  async componentDidMount() {
    const { data: modelsData } = await getModels();
    const models = [this.defaultFilter, ...modelsData];

    const { data: vespe } = await getVespe();

    this.setState({ vespe, models });
    toast("Loaded");
  }

  render() {
    const {
      vespe: allVespe,
      currentPage,
      itemsPerPage,
      modelFilter,
      models,
      sortColumn,
      search,
    } = this.state;
    const { user } = this.props;

    const hasData = allVespe.length > 0 && models.length > 0;
    const { count, data } = this.getPaginatedData();

    return (
      <section className="vespe">
        <div className="row">
          <div className="column column-20">
            {hasData && (
              <ListGroup
                items={models}
                selectedItem={modelFilter}
                onItemSelected={this.handleModelFilterSelected}
              />
            )}
          </div>
          <div className="column">
            {user && (
              <Link to="/vespe/new">
                <button className="button">New Vespa</button>
              </Link>
            )}
            <SearchBox value={search} onChange={this.handleSearch} />
            {!hasData || count === 0 ? (
              this.renderNoVespeMessage()
            ) : (
              <>
                <p>
                  Ci sono <strong>{count}</strong> vespe disponibili.
                </p>
                <VespeTable
                  data={data}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                  onDelete={this.handleDelete}
                  onLikeToggle={this.handleLikeToggle}
                />
                <Pagination
                  currentPage={currentPage}
                  itemCount={count}
                  itemsPerPage={itemsPerPage}
                  onPageSelected={this.handlePageSelected}
                />
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  renderNoVespeMessage = () => <p>Non ci sono Vespe disponibili.</p>;

  filterByModel = () => {
    const { vespe, modelFilter } = this.state;

    return modelFilter && modelFilter._id
      ? vespe.filter(v => v.modello._id === modelFilter._id)
      : vespe;
  };

  filterBySearch = () => {
    const { vespe, search } = this.state;

    return vespe.filter(v => v.modello.nome.toLowerCase().includes(search));
  };

  getPaginatedData = () => {
    const { currentPage, itemsPerPage, sortColumn, search } = this.state;

    const filtered =
      search !== "" ? this.filterBySearch() : this.filterByModel();

    const isReverseOrder = sortColumn.order === "dec";
    const sorted = sortColumn.path
      ? filtered.sort((a, b) => {
          const valueA = sortColumn.path(a);
          const valueB = sortColumn.path(b);
          let returnValue = 0;

          if (valueA < valueB) returnValue = -1;
          else if (valueA > valueB) returnValue = 1;
          else returnValue = 0;

          return isReverseOrder ? (returnValue *= -1) : returnValue;
        })
      : filtered;

    const vespe = paginate(sorted, currentPage, itemsPerPage);

    const count = filtered.length;

    return { count, data: vespe };
  };

  handleDelete = async vespaId => {
    const oldVespe = this.state.vespe;

    const vespe = this.state.vespe.filter(v => v._id !== vespaId);
    this.setState({ vespe });

    try {
      await deleteVespa(vespaId);
      toast("Deleted Successfully.");
    } catch (ex) {
      // expected errors
      if (ex.response && ex.response.status === 404)
        toast.error("Couldn't find that post.");

      this.setState({ vespe: oldVespe });
    }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
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

  handleModelFilterSelected = model => {
    this.setState({ modelFilter: model, currentPage: 1, search: "" });
  };

  handleSearch = query => {
    this.setState({
      search: query,
      modelFilter: this.defaultFilter,
      currentPage: 1,
    });
  };
}

export default Vespe;
