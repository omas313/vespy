import React from "react";
import Joi from "joi-browser";

const Form = ({
  data,
  onDataChange,
  errors,
  onErrorsChanged,
  schema,
  onSubmit,
  formStyles,
  submitButtonLabel,
  children,
}) => {
  const validateInput = ({ name, value }) => {
    const subObject = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(subObject, subSchema);

    return error ? error.details[0].message : null;
  };

  const validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const newErrors = error.details.reduce((allErrors, currentItem) => {
      const propName = currentItem.path[0];
      const hasProp = Boolean(allErrors[propName]);
      const message = currentItem.message + ".";

      allErrors[propName] = hasProp
        ? `${allErrors[propName]} ${message}`
        : message;
      return allErrors;
    }, {});
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = validateForm();
    onErrorsChanged(newErrors || {});
    if (newErrors && Object.keys(newErrors).length > 0) return;

    onSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };

    const errorMessage = validateInput(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    onDataChange({
      ...data,
      [input.name]: input.value,
    });
    onErrorsChanged(newErrors);
  };

  return (
    <div style={formStyles}>
      <form onSubmit={handleSubmit}>
        {React.Children.map(children, c => {
          if (!React.isValidElement(c)) return c;
          return React.cloneElement(c, { onChange: handleChange });
        })}
        {submitButtonLabel && (
          <button className="button" disabled={validateForm()}>
            {submitButtonLabel}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
