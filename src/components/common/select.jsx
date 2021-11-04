const Select = ({
  items,
  getItemValue,
  getItemLabel,
  name,
  label,
  error,
  ...rest
}) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} id={name} {...rest}>
        <option value=""></option>
        {items.map(m => (
          <option key={getItemValue(m)} value={getItemValue(m)}>
            {getItemLabel(m)}
          </option>
        ))}
      </select>
      {error && <p>{error}</p>}
    </>
  );
};

export default Select;
