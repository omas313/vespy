import { useEffect, useState } from "react";
import Form from "./common/form";
import Input from "./common/input";
import Joi from "joi-browser";
import { getModelli } from "../services/fakeModelService";
import { getVespa, saveVespa } from "./../services/fakeVespaService";
import Select from "./common/select";

const VespaForm = ({ match, history }) => {
  const [data, setData] = useState({
    _id: "",
    modelloId: "",
    km: 0,
    tariffe: 0,
  });
  const [errors, setErrors] = useState({});
  const [modelli, setModelli] = useState([]);

  useEffect(() => {
    if (modelli.length === 0) initModelli();
  }, [modelli.length]);

  useEffect(() => {
    if (!match.params.id) return;

    const vespa = getVespa(match.params.id);
    if (!vespa) return history.replace("/not-found");

    setData(mapToViewModel(vespa));
  }, [match.params.id, history]);

  const initModelli = () => setModelli(getModelli());

  const mapToViewModel = vespa => ({
    _id: vespa._id,
    modelloId: vespa.modello._id,
    km: vespa.km,
    tariffe: vespa.tariffe,
  });

  const schema = {
    _id: Joi.string().allow(""),
    modelloId: Joi.string().required().label("Modello"),
    km: Joi.number().min(0).required().label("KM"),
    tariffe: Joi.number().min(1).required().label("Tariffe"),
  };

  const handleSave = () => {
    saveVespa(data);

    history.push("/vespe");
  };

  return (
    <>
      <h2>Vespa Form</h2>
      <Form
        data={data}
        onDataChange={setData}
        schema={schema}
        errors={errors}
        onErrorsChanged={setErrors}
        onSubmit={handleSave}
        submitButtonLabel="Save"
      >
        <Select
          name="modelloId"
          label="Modello"
          items={modelli}
          getItemValue={v => v._id}
          getItemLabel={v => v.nome}
          error={errors.modelloId}
          value={data.modelloId}
        />
        <Input
          type="number"
          name="km"
          label="KM"
          value={data.km}
          error={errors.km}
        />
        <Input
          type="number"
          name="tariffe"
          label="Tariffe"
          value={data.tariffe}
          error={errors.tariffe}
        />
      </Form>
    </>
  );
};

export default VespaForm;
