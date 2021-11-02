const handleSave = history => history.push("/vespe");

const VespaForm = ({ match, history }) => {
  return (
    <>
      <h1>Vespa - {match.params.id}</h1>
      <button className="button" onClick={() => handleSave(history)}>
        Save
      </button>
    </>
  );
};

export default VespaForm;
