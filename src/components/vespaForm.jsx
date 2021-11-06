import { useEffect, useState } from "react";
import Form from "./common/form";
import Input from "./common/input";
import Joi from "joi-browser";
import { getModels } from "../services/modelService";
import { getVespa, saveVespa } from "./../services/vespaService";
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
    if (modelli.length !== 0) return;

    (async () => {
      const { data } = await getModels();
      setModelli(data);
    })();
  }, [modelli.length]);

  useEffect(() => {
    let abortUpdate = false;
    if (!match.params.id || abortUpdate) return;

    (async () => {
      try {
        const { data: vespa } = await getVespa(match.params.id);
        setData(mapToViewModel(vespa));
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          history.replace("/not-found");
      }
    })();

    // when we redirect, history is updated ==> this effect is run again
    // while it is running this update, the component is also unmounting ==> react freaks out
    // ==> we abort early to avoid any updating attemps
    // removing history doesn't work...

    return () => (abortUpdate = true); // this is run when component is unmounting
  }, [match.params.id, history]);

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

  const handleSave = async () => {
    await saveVespa(data);

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
        {modelli.length > 0 && (
          <Select
            name="modelloId"
            label="Modello"
            items={modelli}
            getItemValue={v => v._id}
            getItemLabel={v => v.nome}
            error={errors.modelloId}
            value={data.modelloId}
          />
        )}
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
